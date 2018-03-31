import { Int, List, String } from "../scalars";
import { CitySchemaType, ShoppingListSchemaType, ItemSchemaType, ItemTypeSchemaType } from "../types";
import * as queries from "../queries";
import { authenticate } from "../../auth";
import { GraphQLObjectType } from "graphql";

export const RootQuery = new GraphQLObjectType({
  name: "RootQueryType",
  fields: () => ({
    shoppingList: {
      type: List(ShoppingListSchemaType),
      args: { id: Int, name: String, created: String, target: String, completed: String, type: String },
      resolve: authenticate(queries.getShoppingList)
    },
    nextShoppingList: {
      type: ShoppingListSchemaType,
      resolve: authenticate(queries.getNextShoppingList)
    },
    itemTypes: {
      type: List(ItemTypeSchemaType),
      resolve: authenticate(queries.getItemTypes)
    },
    cities: {
      type: List(CitySchemaType),
      resolve: authenticate(queries.getCities)
    },
    items: {
      type: List(ItemSchemaType),
      resolve: authenticate(queries.getItems)
    }
  })
});