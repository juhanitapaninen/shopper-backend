import { GraphQLFieldResolver } from "graphql";

const authenticate = (fn: GraphQLFieldResolver<any, any>) => (parent: any, args: any, context: any, info: any) => {
  if (!context.user) throw new Error("User is not authenticated");
  return fn(parent, args, context, info);
};

export {
  authenticate
};