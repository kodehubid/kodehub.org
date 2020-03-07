'use strict';

import { gql } from 'apollo-server-express';

export default gql`
  extend type Query {
    getBookmarks(
      limit: Int!
      cursor: String
      orderBy: String
      createdBy: String!
    ): BookmarkConnection!
    getBookmark(id: ID!): Bookmark!
  }
  extend type Mutation {
    createBookmark(input: BookmarkCreateInput!): Bookmark!
    deleteBookmark(id: ID!): BookmarkDeletePayload!
    updateBookmark(id: String!, updates: BookmarkCreateInput!): Bookmark!
  }

  input BookmarkCreateInput {
    bookmarkCategory: BookmarkInputCategory!
    bookmarkTitle: String!
    bookmarkSlug: String!
    bookmarkDescription: String
  }

  type BookmarkDeletePayload {
    id: ID!
    status: Boolean!
  }

  type Post {
    id: ID!
    bookmarkCategory: String!
    bookmarkTitle: String!
    bookmarkSlug: String!
    bookmarkDescription: String
    createdBy: User!
    createdAt: DateTime!
    updatedAt: DateTime!
  }

  type BookmarkConnection {
    edges: [Bookmark!]!
    pageInfo: PageInfo!
    totalCount: Int!
  }

  enum BookmarkInputCategory {
    POST
  }
`;
