import { Int, List, String } from "../scalars";
import { ShoppingListItem } from "../../entity";
import { GraphQLObjectType } from "graphql";
import { ShoppingListItemSchemaType, ItemTypeSchemaType } from "../types";

export const ItemSchemaType: any = new GraphQLObjectType({
  name: "Item",
  fields: () => ({
    id: Int,
    name: String,
    type: {
      type: ItemTypeSchemaType,
      resolve: async (parentValue, args) => parentValue.type
    },
    shoppingListItems: {
      type: List(ShoppingListItemSchemaType),
      resolve: async (parentValue, args) =>
        await ShoppingListItem.find({where: { item: parentValue.id }})
    }
  })
});
