import { City } from "../entity/City";
import { GraphQLNonNull, GraphQLObjectType, GraphQLString, GraphQLInt } from "graphql";
import * as bcrypt from "bcrypt";
import * as jwt from "jsonwebtoken";
import { Item, ItemType, ShoppingListType, ShoppingListItem } from "../entity";
import { ShoppingList } from "../entity/ShoppingList";
import { User } from "../entity/User";
import { Int, NonNullInt, String, NonNullString, Date, Boolean, NonNullID } from "./scalars";
import { ItemSchemaType, ItemTypeSchemaType, ShoppingListItemSchemaType, ShoppingListSchemaType, UserSchemaType } from "./types";

export const mutation = new GraphQLObjectType({
  name: "Mutation",
  fields: {
    addItem: {
      type: ItemSchemaType,
      args: { name: NonNullString, typeName: NonNullString },
      resolve: async (parentValue, {name, typeName}) =>
        await Item.createNew(name, await ItemType.findOrCreate(typeName))
    },
    addItemType: {
      type: ItemTypeSchemaType,
      args: {name: NonNullString},
      resolve: async (parentValue, {name}) => await ItemType.createNew(name)
    },
    deleteItemType: {
      type: ItemTypeSchemaType,
      args: { id: Int },
      resolve: async (parentValue, { id }) => await ItemType.delete(id)
    },
    addCity: {
      type: ItemTypeSchemaType,
      args: {name: NonNullString},
      resolve: async (parentValue, { name }) => await City.createNew(name)
    },
    deleteCity: {
      type: ItemTypeSchemaType,
      args: { id: Int },
      resolve: async (parentValue, { id }) => await City.delete(id)
    },
    addShoppingList: {
      type: ShoppingListSchemaType,
      args: { name: String, cityId: NonNullInt, typeName: NonNullString, target: Date },
      resolve: async (parentValue, { name, cityId, typeName, target }) =>
        await ShoppingList.createNew(
          name,
          await City.findOneById(cityId),
          await ShoppingListType.findOrCreate(typeName),
          target
        )
    },
    addShoppingListItem: {
      type: ShoppingListItemSchemaType,
      args: { shoppingListId: NonNullID, itemId: NonNullInt, comment: String, price: Int, url: String },
      resolve: async (parentValue, args) =>
        await ShoppingListItem.createNew(
          await ShoppingList.findOneById(args.shoppingListId),
          await Item.findOneById(args.itemId),
          args.comment,
          args.price,
          args.url
        )
    },
    updateShoppingListItem: {
      type: ShoppingListItemSchemaType,
      args: { id: NonNullID, completed: Boolean, rejected: Boolean, comment: String, price: Int, url: String },
      resolve: async (parentValue, {id, completed, rejected, comment, price, url}) => {
        const item = await ShoppingListItem.findOneById(id);
        item.completed = !!completed;
        item.rejected = !!rejected;
        item.comment = comment;
        item.price = price;
        item.url = url;
        await item.save();
        return item;
      }
    },
    login: {
      type: UserSchemaType,
      args: { email: NonNullString, password: NonNullString },
      resolve: async (parentValue, { email, password }, ctx) => {
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
      }
    },
    signUp: {
      type: UserSchemaType,
      args: { username: NonNullString, email: NonNullString, password: NonNullString },
      resolve: async (parentValue, { username, email, password }, ctx) => {
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
      }
    },
  }
});