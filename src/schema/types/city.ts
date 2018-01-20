import { Int, List, String } from "../scalars";
import { ShoppingListSchemaType } from "../types";
import { ShoppingList } from "../../entity";
import { GraphQLObjectType } from "graphql";

export const CitySchemaType: any = new GraphQLObjectType({
  name: "City",
  fields: () => ({
    id: Int,
    name: String,
    shoppingLists: {
      type: List(ShoppingListSchemaType),
      resolve: async (parentValue, args) =>
        await ShoppingList.find({where: { city: parentValue.id }})
    }
  })
});