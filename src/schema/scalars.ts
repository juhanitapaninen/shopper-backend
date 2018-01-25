import { GraphQLInt, GraphQLList, GraphQLNonNull, GraphQLString, GraphQLBoolean, GraphQLType } from "graphql";
const {GraphQLDate} = require("graphql-iso-date");

const Int = { type: GraphQLInt };
const NonNullInt = { type: new GraphQLNonNull(GraphQLInt) };
const String = { type: GraphQLString };
const NonNullString = { type: new GraphQLNonNull(GraphQLString) };
const List = (type: GraphQLType) => new GraphQLList(type);
const Date = { type: GraphQLDate };
const Boolean = { type: GraphQLBoolean };

export {Int, NonNullInt, String, NonNullString, List, Date, Boolean};
