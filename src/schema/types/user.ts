import { Int, List, String } from "../scalars";
import { GraphQLObjectType } from "graphql";

export const UserSchemaType: any = new GraphQLObjectType({
  name: "User",
  fields: () => ({
    id: Int,
    username: String,
    email: String,
    password: String,
    jwt: String
  })
});