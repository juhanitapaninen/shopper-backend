import { GraphQLInt, GraphQLList, GraphQLNonNull, GraphQLString, GraphQLBoolean, GraphQLType, GraphQLID } from "graphql";
const {GraphQLDate} = require("graphql-iso-date");

const Int = { type: GraphQLInt };
const NonNullInt = { type: new GraphQLNonNull(GraphQLInt) };
const String = { type: GraphQLString };
const NonNullString = { type: new GraphQLNonNull(GraphQLString) };
const List = (type: GraphQLType) => new GraphQLList(type);
const Date = { type: GraphQLDate };
const Boolean = { type: GraphQLBoolean };
const ID = { type: GraphQLID };
const NonNullID = { type: new GraphQLNonNull(GraphQLID) };

export {Int, NonNullInt, String, NonNullString, List, Date, Boolean, ID, NonNullID};
