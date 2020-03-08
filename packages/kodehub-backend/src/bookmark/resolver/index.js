// @flow
'use strict';
import { combineResolvers } from 'graphql-resolvers';
import { bookmarksResolver, bookmarkResolver } from './query';
import {
  createBookmarkResolver,
  deleteBookmarkResolver,
  updateBookmarkResolver
} from './mutation';
import { isAuthenticated, isOwner } from '../../shared/resolvers/authorization';
import utils from '../../shared/utils';

const bookmarkResolvers = {
  Query: {
    getBookmarks: combineResolvers(isAuthenticated, bookmarksResolver),
    getBookmark: combineResolvers(isAuthenticated, bookmarkResolver)
  },
  Mutation: {
    createBookmark: combineResolvers(isAuthenticated, createBookmarkResolver),
    deleteBookmark: combineResolvers(
      isAuthenticated,
      isOwner,
      deleteBookmarkResolver
    ),
    updateBookmark: combineResolvers(
      isAuthenticated,
      isOwner,
      updateBookmarkResolver
    )
  },
  BookmarkConnection: {
    totalCount: (parent?: Object, args?: Object, ctx: { models: Object }) => {
      return ctx.models.Bookmark.countDocuments();
    }
  },
  Bookmark: {
    id: (parent: Object) => {
      return parent._id.toString();
    },
    createdBy: async (
      parent: { createdBy: string | Object },
      args?: Object,
      ctx: { models: Object }
    ) => {
      const isObjectId = utils.objectIdValid.test(parent.createdBy);
      return isObjectId
        ? await ctx.models.User.findById(parent.createdBy)
        : parent.createdBy;
    }
  }
};

export default bookmarkResolvers;
