import { Int, List, String } from "../scalars";
import { ShoppingList } from "../../entity/ShoppingList";
import { Item, ItemType, City } from "../../entity";
import { CitySchemaType, ShoppingListSchemaType, ItemSchemaType, ItemTypeSchemaType } from "../types";
import { GraphQLObjectType, GraphQLFieldResolver } from "graphql";
import * as S from "sanctuary";

const authenticate = (fn: GraphQLFieldResolver<any, any>) => (parent: any, args: any, context: any, info: any) => {
  if (!context.user) throw new Error("User is not authenticated");
  return fn(parent, args, context, info);
};

const getShoppingList = async (parent: any, args: any) =>
  await ShoppingList.find(args && { where: {...args} });
const getNextShoppingList = async () => S.pipe([
    S.head,
    S.fromMaybe({})
  ])(await ShoppingList.find({order: {"target": "ASC"}}));
const getItemTypes = async () => await ItemType.find();
const getCities = async () => await City.find();
const getItems = async () => await Item.find();

export const RootQuery = new GraphQLObjectType({
  name: "RootQueryType",
  fields: () => ({
    shoppingList: {
      type: List(ShoppingListSchemaType),
      args: { id: Int, name: String, created: String, target: String, completed: String, type: String },
      resolve: authenticate(getShoppingList)
    },
    nextShoppingList: {
      type: ShoppingListSchemaType,
      resolve: authenticate(getNextShoppingList)
    },
    itemTypes: {
      type: List(ItemTypeSchemaType),
      resolve: authenticate(getItemTypes)
    },
    cities: {
      type: List(CitySchemaType),
      resolve: authenticate(getCities)
    },
    items: {
      type: List(ItemSchemaType),
      resolve: authenticate(getItems)
    }
  })
});