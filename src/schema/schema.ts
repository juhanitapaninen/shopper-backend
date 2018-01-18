import {
  GraphQLObjectType, GraphQLBoolean, GraphQLInt, GraphQLString, GraphQLList, GraphQLSchema, GraphQLType, GraphQLNonNull
} from "graphql";
import * as S from "sanctuary";
import { ShoppingList } from "../entity/ShoppingList";
import { ShoppingListItem } from "../entity/ShoppingListItem";
import { Item } from "../entity/Item";
import { ItemType } from "../entity/ItemType";
import { City } from "../entity/City";

const Int = { type: GraphQLInt };
const String = { type: GraphQLString };
const List = (type: GraphQLType) => new GraphQLList(type);

const ShoppingListSchemaType: any = new GraphQLObjectType({
  name: "ShoppingList",
  fields: () => ({
    id: Int,
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

const ShoppingListItemSchemaType: any = new GraphQLObjectType({
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

const ItemSchemaType: any = new GraphQLObjectType({
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

const ItemTypeSchemaType: any = new GraphQLObjectType({
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

const CitySchemaType: any = new GraphQLObjectType({
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

const RootQuery = new GraphQLObjectType({
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
      resolve: async () => await Item.find()
    }
  })
});

const addValue = (item: ItemType | City | Item, values: object) => (key: string) =>
  (item as any)[key] = (values as any)[key];

const addValues = (item: ItemType | City | Item, values: object) =>
  S.pipe([S.keys, addValue(item, values)])(values);

const mutation = new GraphQLObjectType({
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
      resolve: async (parentValue, { id }) =>  await City.delete(id)
    }
  }
});

export default new GraphQLSchema({
  query: RootQuery,
  mutation
});