import { gql } from "apollo-server-koa";

export default gql`
  type Post {
    id: ID!
    _id: ID
    image: String
    topic: String
    title: String
    description: String
    body: String
    user: User
    active: Boolean
  }

  type PostMutation {
    message: String
    post: Post
  }

  type PostEdge {
    node: Post!
    cursor: String!
  }

  type PostConnection {
    count: Int!
    totalCount: Int!
    startCursorOffset: Int!
    endCursorOffset: Int!
    pageInfo: PageInfoExtended!
    users: [PostEdge]!
  }
`;
