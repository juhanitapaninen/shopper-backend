import { Int, List, String, ID } from "../scalars";
import { ShoppingListItemSchemaType, CitySchemaType, ItemSchemaType } from "../types";
import { GraphQLObjectType } from "graphql";

export const ShoppingListSchemaType: any = new GraphQLObjectType({
  name: "ShoppingList",
  fields: () => ({
    id: ID,
    name: String,
    created: String,
    target: String,
    completed: String,
    city: {
      type: CitySchemaType,
      resolve: (parentValue) => parentValue.city
    },
    type: {
      type: ItemSchemaType,
      resolve: (parentValue) => parentValue.type
    },
    items: {
      type: List(ShoppingListItemSchemaType),
      resolve: (parentValue) => parentValue.items
    }
  })
});