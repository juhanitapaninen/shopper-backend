import { City } from "../entity/City";
import { GraphQLNonNull, GraphQLObjectType, GraphQLString, GraphQLInt } from "graphql";
import { Item, ItemType, ShoppingListType, ShoppingListItem } from "../entity";
import { ShoppingList } from "../entity/ShoppingList";
import { Int, NonNullInt, String, NonNullString, Date, Boolean } from "./scalars";
import { ItemSchemaType, ItemTypeSchemaType, ShoppingListItemSchemaType, ShoppingListSchemaType } from "./types";

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
    },
    addShoppingListItem: {
      type: ShoppingListItemSchemaType,
      args: { shoppingListId: NonNullInt, itemId: NonNullInt, comment: String, price: Int, url: String },
      resolve: async (parentValue, args) =>
        await ShoppingListItem.createNew(
          await ShoppingList.findOneById(args.shoppingListId),
          await Item.findOneById(args.itemId),
          args.comment,
          args.price,
          args.url
        )
    },
    updateShoppingListItem: {
      type: ShoppingListItemSchemaType,
      args: { id: NonNullInt, completed: Boolean, rejected: Boolean, comment: String, price: Int, url: String },
      resolve: async (parentValue, {id, completed, rejected, name, comment, price, url}) =>
        await ShoppingListItem.updateById(id, {
          completed, rejected, comment, price, url
        })
    }
  }
});