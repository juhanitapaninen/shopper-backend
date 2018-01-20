import { GraphQLSchema } from "graphql";
import { RootQuery } from "./types";
import { mutation } from "./mutations";

export default new GraphQLSchema({
  query: RootQuery,
  mutation
});