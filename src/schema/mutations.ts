import { City } from "../entity/City";
import { GraphQLNonNull, GraphQLObjectType, GraphQLString, GraphQLInt } from "graphql";
import { Item, ItemType, ShoppingListType } from "../entity";
import { ShoppingList } from "../entity/ShoppingList";
import { Int, NonNullInt, String, NonNullString, Date } from "./scalars";
import { ItemSchemaType, ItemTypeSchemaType, ShoppingListSchemaType } from "./types";

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
    }
  }
});