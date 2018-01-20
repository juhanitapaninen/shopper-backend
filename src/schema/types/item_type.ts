import { Int, List, String } from "../scalars";
import { Item } from "../../entity";
import { GraphQLObjectType } from "graphql";
import { ItemSchemaType } from "../types";

export const ItemTypeSchemaType = new GraphQLObjectType({
  name: "ItemType",
  fields: () => ({
    id: Int,
    name: String,
    items: {
      type: List(ItemSchemaType),
      resolve: async (parentValue, args) =>
        await Item.find({where: { type: parentValue.id }})
    }
  })
});