import { GraphQLInt, GraphQLList, GraphQLString, GraphQLType } from "graphql";

const Int = { type: GraphQLInt };
const String = { type: GraphQLString };
const List = (type: GraphQLType) => new GraphQLList(type);

export {Int, String, List};