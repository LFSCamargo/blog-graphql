import { gql } from "apollo-server-koa";
import { DocumentNode } from "graphql";
import modules from "~/modules";

const rootTypes = gql`
  type PageInfoExtended {
    hasNextPage: Boolean!
    hasPreviousPage: Boolean!
    startCursor: String
    endCursor: String
  }

  type Query {
    # User
    me: User
    # Blog
    post(_id: String!): Post
    posts(
      first: Int
      after: String
      before: String
      last: Int
      search: String
    ): PostConnection
  }

  type Mutation {
    # User
    signIn(email: String, password: String): AuthOutput
    signUp(email: String, password: String, name: String): AuthOutput
    # Blog
    createPost(
      title: String!
      body: String!
      description: String!
    ): PostMutation
    editPost(
      _id: String!
      title: String
      body: String
      description: String
    ): PostMutation
    deletePost(_id: String!): PostMutation
  }
`;

export default [
  rootTypes,
  modules.user.type,
  modules.blog.type,
] as DocumentNode[];
