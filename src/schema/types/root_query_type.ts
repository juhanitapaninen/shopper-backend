import { Int, List, String } from "../scalars";
import { ShoppingList } from "../../entity/ShoppingList";
import { Item, ItemType, City } from "../../entity";
import { CitySchemaType, ShoppingListSchemaType, ItemSchemaType, ItemTypeSchemaType } from "../types";
import { GraphQLObjectType } from "graphql";

export const RootQuery = new GraphQLObjectType({
  name: "RootQueryType",
  fields: () => ({
    shoppingList: {
      type: List(ShoppingListSchemaType),
      args: {
        id: Int, name: String, created: String, target: String, completed: String, type: String
      },
      resolve: async (parentValue, args) =>
        await ShoppingList.find(args && { where: {...args} })
    },
    itemTypes: {
      type: List(ItemTypeSchemaType),
      resolve: async () => await ItemType.find()
    },
    cities: {
      type: List(CitySchemaType),
      resolve: async () => await City.find()
    },
    items: {
      type: List(ItemSchemaType),
      resolve: async () => await Item.find()
    }
  })
});