'use strict';
import { combineResolvers } from 'graphql-resolvers';
import { getUsersResolver, myProfileResolver, getUserResolver } from './query';
import {
  signUpResolver,
  signInResolver,
  updateUserResolver,
  deleteUserResolver
} from './mutation';
import { isAuthenticated, isAdmin } from '../../shared/resolvers/authorization';

const userResolvers = {
  Query: {
    getUsers: combineResolvers(isAuthenticated, getUsersResolver),
    getUser: combineResolvers(isAuthenticated, getUserResolver),
    myProfile: combineResolvers(isAuthenticated, myProfileResolver)
  },
  Mutation: {
    signUp: signUpResolver,
    signIn: signInResolver,
    updateUser: combineResolvers(isAuthenticated, updateUserResolver),
    deleteUser: combineResolvers(isAuthenticated, isAdmin, deleteUserResolver)
  },
  User: {
    id: user => {
      return user._id.toString();
    },
    activities: user => {
      return user;
    }
  },
  UserActivities: {
    bookmarks: async (user, args, { loaders }) => {
      return (await loaders.userBookmarks.load(user._id)) || [];
    }
  }
};

export default userResolvers;
