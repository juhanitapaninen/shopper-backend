import {
  GraphQLObjectType, GraphQLInt, GraphQLString, GraphQLList, GraphQLSchema
} from "graphql";
import { ShoppingList } from "../entity/ShoppingList";

const Int = { type: GraphQLInt };
const String = { type: GraphQLString };
const List = (type: string) => new GraphQLList(type);

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
    }
  })
});

const RootQuery = new GraphQLObjectType({
  name: "RootQueryType",
  fields: () => ({
    shoppingList: {
      type: List(ShoppingListType),
      args: { id: Int, name: String, created: String, type: String },
      async resolve(parentValue, args) {
        return await ShoppingList.find({ where: {...args} });
      }
    }
  })
});

export default new GraphQLSchema({
  query: RootQuery
});