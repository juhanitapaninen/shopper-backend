import { City } from "../entity/City";
import { GraphQLObjectType } from "graphql";
import * as bcrypt from "bcrypt";
import * as jwt from "jsonwebtoken";
import { Item, ItemType, ShoppingListType, ShoppingListItem } from "../entity";
import { ShoppingList } from "../entity/ShoppingList";
import { User } from "../entity/User";
import { authenticate } from "../auth";
import { Int, NonNullInt, String, NonNullString, Date, Boolean, NonNullID } from "./scalars";
import { ItemSchemaType, ItemTypeSchemaType, ShoppingListItemSchemaType, ShoppingListSchemaType, UserSchemaType } from "./types";

const addItem = async (parentValue: any, args: any) =>
  await Item.createNew(args.name, await ItemType.findOrCreate(args.typeName));
const addItemType = async (parentValue: any, args: any) => await ItemType.createNew(args.name);
const deleteItemType = async (parentValue: any, args: any) => await ItemType.delete(args.id);
const addCity = async (parentValue: any, args: any) => await City.createNew(args.name);
const deleteCity = async (parentValue: any, args: any) => await City.delete(args.id);
const addShoppingList = async (parentValue: any, args: any) =>
  await ShoppingList.createNew(
    args.name,
    await City.findOneById(args.cityId),
    await ShoppingListType.findOrCreate(args.typeName),
    args.target
  );
const addShoppingListItem = async (parentValue: any, args: any) =>
  await ShoppingListItem.createNew(
    await ShoppingList.findOneById(args.shoppingListId),
    await Item.findOneById(args.itemId),
    args.comment,
    args.price,
    args.url
  );
const updateShoppingListItem = async (parentValue: any, args: any) => {
  const {id, completed, rejected, comment, price, url} = args;
  const item = await ShoppingListItem.findOneById(id);
  item.completed = !!completed;
  item.rejected = !!rejected;
  item.comment = comment;
  item.price = price;
  item.url = url;
  await item.save();
  return item;
};
const login = async (parentValue: any, args: any, ctx: any) => {
  const {email, password} = args;
  const user = await User.find({where: {email}});
  if (user.length > 0) {
    const res = await bcrypt.compare(password, user[0].password);
    if (res) {
      const {id, email} = user[0];
      const token = jwt.sign({id, email}, process.env.JWT_SECRET);
      ctx.jwt = token;
      ctx.user = user;
      return ({
        ...user[0],
        jwt: token
      });
    }
    return Promise.reject("Incorrect email or password");
  }
  return Promise.reject("Incorrect email or password");
};
const signUp = async (parentValue: any, args: any, ctx: any) => {
  const { username, email, password } = args;
  const user = await User.find({where: {email}});
  if (user.length === 0) {
    const hash = await bcrypt.hash(password, 10);
    const newUser = await User.createNew(username, email, hash);
    const { id } = newUser;
    const token = jwt.sign({ id, email }, process.env.JWT_SECRET, { expiresIn: "1d" });
    ctx.jwt = token;
    ctx.user = newUser;
    return ({
      ...newUser,
      jwt: token
    });
  }
  return Promise.reject("Email already exists");
};

export const mutation = new GraphQLObjectType({
  name: "Mutation",
  fields: {
    addItem: {
      type: ItemSchemaType,
      args: { name: NonNullString, typeName: NonNullString },
      resolve: authenticate(addItem)
    },
    addItemType: {
      type: ItemTypeSchemaType,
      args: {name: NonNullString},
      resolve: authenticate(addItemType)
    },
    deleteItemType: {
      type: ItemTypeSchemaType,
      args: { id: Int },
      resolve: authenticate(deleteItemType)
    },
    addCity: {
      type: ItemTypeSchemaType,
      args: {name: NonNullString},
      resolve: authenticate(addCity)
    },
    deleteCity: {
      type: ItemTypeSchemaType,
      args: { id: Int },
      resolve: authenticate(deleteCity)
    },
    addShoppingList: {
      type: ShoppingListSchemaType,
      args: { name: String, cityId: NonNullInt, typeName: NonNullString, target: Date },
      resolve: authenticate(addShoppingList)
    },
    addShoppingListItem: {
      type: ShoppingListItemSchemaType,
      args: { shoppingListId: NonNullID, itemId: NonNullInt, comment: String, price: Int, url: String },
      resolve: authenticate(addShoppingListItem)
    },
    updateShoppingListItem: {
      type: ShoppingListItemSchemaType,
      args: { id: NonNullID, completed: Boolean, rejected: Boolean, comment: String, price: Int, url: String },
      resolve: authenticate(updateShoppingListItem)
    },
    login: {
      type: UserSchemaType,
      args: { email: NonNullString, password: NonNullString },
      resolve: login
    },
    signUp: {
      type: UserSchemaType,
      args: { username: NonNullString, email: NonNullString, password: NonNullString },
      resolve: signUp
    },
  }
});