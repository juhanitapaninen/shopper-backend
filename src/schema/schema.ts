import {
  GraphQLObjectType, GraphQLBoolean, GraphQLInt, GraphQLString, GraphQLList, GraphQLSchema, GraphQLType
} from "graphql";
import { ShoppingList } from "../entity/ShoppingList";
import { ShoppingListItem } from "../entity/ShoppingListItem";

const Int = { type: GraphQLInt };
const String = { type: GraphQLString };
const Bool = { type: GraphQLBoolean };
const List = (type: GraphQLType) => new GraphQLList(type);

const ShoppingListType: any = new GraphQLObjectType({
  name: "ShoppingList",
  fields: () => ({
    id: Int,
    name: String,
    created: String,
    type: String,
    items: {
      type: List(ShoppingListItemType),
      resolve(parentValue, args) {
        return parentValue.items;
      }
    }
  })
});

const ShoppingListItemType: any = new GraphQLObjectType({
  name: "ShoppingListItem",
  fields: () => ({
    id: Int,
    name: String,
    url: String,
    shoppingList: {
      type: ShoppingListType
    },
    item: {
      type: ItemType,
      async resolve(parentValue, args) {
        const items: ShoppingListItem[] = await ShoppingListItem.find({where: { id: parentValue.id }});
        return items[0].item;
      }
    }
  })
});

const ItemType: any = new GraphQLObjectType({
   name: "Item",
   fields: () => ({
     id: Int,
     name: String,
     type: String,
     shoppingListItems: {
       type: List(ShoppingListItemType),
       async resolve(parentValue, args) {
         return await ShoppingListItem.find({where: { item: parentValue.id }});
       }
     }
   })
});

const RootQuery = new GraphQLObjectType({
  name: "RootQueryType",
  fields: () => ({
    shoppingList: {
      type: List(ShoppingListType),
      args: { id: Int, name: String, created: String, type: String, all: Bool },
      async resolve(parentValue, args) {
        if (args.all) {
          return await ShoppingList.find();
        }
        return await ShoppingList.find({ where: {...args} });
      }
    }
  })
});

export default new GraphQLSchema({
  query: RootQuery
});