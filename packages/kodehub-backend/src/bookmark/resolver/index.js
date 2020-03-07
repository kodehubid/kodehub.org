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
    totalCount: (parent, args, { models }) => {
      return models.Bookmark.countDocuments();
    }
  },
  Bookmark: {
    id: parent => {
      return parent._id.toString();
    },
    createdBy: async (parent, args, { models }) => {
      const isObjectId = utils.objectIdValid.test(parent.createdBy);
      return isObjectId
        ? await models.User.findById(parent.createdBy)
        : parent.createdBy;
    }
  }
};

export default bookmarkResolvers;
