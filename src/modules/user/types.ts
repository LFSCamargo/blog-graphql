import { gql } from "apollo-server-koa";

export default gql`
  enum Role {
    USER
    WRITER
    ADMIN
  }

  type User {
    id: ID!
    _id: ID
    name: String
    role: Role
    email: String
    active: Boolean
  }

  type AuthOutput {
    token: String
    user: User
  }

  type UserEdge {
    node: User!
    cursor: String!
  }

  type UserConnection {
    count: Int!
    totalCount: Int!
    startCursorOffset: Int!
    endCursorOffset: Int!
    pageInfo: PageInfoExtended!
    users: [UserEdge]!
  }
`;
