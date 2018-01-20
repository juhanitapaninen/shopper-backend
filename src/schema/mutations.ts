import { City } from "../entity/City";
import { GraphQLNonNull, GraphQLObjectType, GraphQLString } from "graphql";
import { Item } from "../entity/Item";
import { ItemType } from "../entity/ItemType";
import { Int } from "./scalars";
import { ItemSchemaType, ItemTypeSchemaType } from "./types";

export const mutation = new GraphQLObjectType({
  name: "Mutation",
  fields: {
    addItem: {
      type: ItemSchemaType,
      args: {
        name: { type: new GraphQLNonNull(GraphQLString) },
        typeName: { type: new GraphQLNonNull(GraphQLString) }
      },
      resolve: async (parentValue, {name, typeName}) =>
        await Item.createNew(name, await ItemType.findOrCreate(typeName))
    },
    addItemType: {
      type: ItemTypeSchemaType,
      args: {name: { type: new GraphQLNonNull(GraphQLString) }},
      resolve: async (parentValue, {name}) => await ItemType.createNew(name)
    },
    deleteItemType: {
      type: ItemTypeSchemaType,
      args: { id: Int },
      resolve: async (parentValue, { id }) => await ItemType.delete(id)
    },
    addCity: {
      type: ItemTypeSchemaType,
      args: {name: { type: new GraphQLNonNull(GraphQLString) }},
      resolve: async (parentValue, { name }) => await City.createNew(name)
    },
    deleteCity: {
      type: ItemTypeSchemaType,
      args: { id: Int },
      resolve: async (parentValue, { id }) => await City.delete(id)
    }
  }
});