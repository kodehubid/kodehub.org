'use strict';

import { ForbiddenError } from 'apollo-server';
import { skip } from 'graphql-resolvers';

export const isAdmin = (parent, args, { user: { role } }) => {
  return role === 'ADMIN'
    ? skip
    : new ForbiddenError('Not authorized as admin.');
};

export const isAuthenticated = (parent, args, { user }) => {
  return user ? skip : new ForbiddenError('Not authenticated as user.');
};

export const isOwner = (parent, args, { user }) => {
  return user._id === args.createdBy
    ? skip
    : new ForbiddenError('Not authenticated as the owner.');
};

export const isOwnerOrAdmin = (parent, args, { user }) => {
  const isAllowed = user._id === args.createdBy || user.role === 'ADMIN';
  return isAllowed
    ? skip
    : new ForbiddenError('Not authenticated as the owner.');
};
