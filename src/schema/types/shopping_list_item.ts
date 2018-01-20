import { Int, String } from "../scalars";
import { ItemSchemaType, ShoppingListSchemaType } from "../types";
import { ShoppingListItem } from "../../entity";
import { GraphQLObjectType } from "graphql";

export const ShoppingListItemSchemaType: any = new GraphQLObjectType({
  name: "ShoppingListItem",
  fields: () => ({
    id: Int,
    name: String,
    url: String,
    shoppingList: {
      type: ShoppingListSchemaType
    },
    item: {
      type: ItemSchemaType,
      resolve: async (parentValue, args) => {
        const items: ShoppingListItem[] = await ShoppingListItem.find({where: { id: parentValue.id }});
        return items[0].item;
      }
    }
  })
});