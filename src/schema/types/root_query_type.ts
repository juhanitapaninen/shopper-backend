import { Int, List, String } from "../scalars";
import { ShoppingList } from "../../entity/ShoppingList";
import { Item, ItemType, City } from "../../entity";
import { CitySchemaType, ShoppingListSchemaType, ItemSchemaType, ItemTypeSchemaType } from "../types";
import { GraphQLObjectType } from "graphql";
import * as S from "sanctuary";

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
    nextShoppingList: {
      type: ShoppingListSchemaType,
      resolve: async () => {
        const shoppingList = S.pipe([
          S.head,
          S.fromMaybe({})
        ])(await ShoppingList.find({order: {"target": "ASC"}}));

        console.log(shoppingList);
        return shoppingList;
      }
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
      resolve: async (parentValue, args, ctx) => {
        const user = await ctx.user;
        return await Item.find();
      }
    }
  })
});