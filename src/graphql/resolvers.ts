import { ResolverType } from "@types";
import modules from "~/modules";

export default {
  User: modules.user.resolver.User,
  Post: modules.blog.resolver.Post,
  Query: {
    ...modules.blog.resolver.Query,
    ...modules.user.resolver.Query,
  },
  Mutation: {
    ...modules.blog.resolver.Mutation,
    ...modules.user.resolver.Mutation,
  },
} as ResolverType;
