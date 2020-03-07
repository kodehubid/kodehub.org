'use strict';
import depthLimit from 'graphql-depth-limit';
import allDataLoader from './dataloaders';
import { getUserByToken } from '../shared/utils/jwt';
import { gql } from 'apollo-server-express';
import models from './models';
import {
  EmailAddressResolver,
  EmailAddressTypeDefinition,
  DateTimeResolver,
  DateTimeTypeDefinition
} from 'graphql-scalars';

import appSchemas from './schemas';
import appResolvers from './resolvers';

const dev = process.env.NODE_ENV === 'development';

// Introspection information at the GraphQL Playground (UI)
const introspection = dev ? true : false;

const customResolverScalars = [
  { EmailAddress: EmailAddressResolver },
  { DateTime: DateTimeResolver }
];
const customTypeDefScalars = [
  EmailAddressTypeDefinition,
  DateTimeTypeDefinition
];

/**
 * modularize the GraphQL schema by domains
 * the linkSchema defines all types shared within the schemas
 * so application can runs with a stitched schema instead of one global schema
 */
const linkSchema = gql`
  type Query {
    _: Boolean
  }
  type Mutation {
    _: Boolean
  }
  type Subscription {
    _: Boolean
  }
`;

const typeDefs = [linkSchema, ...customTypeDefScalars, ...appSchemas];

const resolvers = [...customResolverScalars, ...appResolvers];

const apolloServerConfig = () => {
  return {
    typeDefs,
    resolvers,
    introspection: introspection || process.env.GRAPHQL_INSTROPECTION,
    playground: process.env.GRAPHQL_PLAYGROUND || false,
    context: createContext,
    validationRules: [depthLimit(process.env.GRAPHQL_DEPTH_LIMIT || 7)]
  };
};

// context for the resolver function
async function createContext({ req, connection }) {
  // create context for Subscription
  if (connection) {
    return { models };
  }
  // create context for general graphql query & mutation
  if (req) {
    const user = await getUserByToken(req.headers);
    return {
      models,
      user,
      secret: process.env.SECRET,
      loaders: allDataLoader(models)
    };
  }
}

export default apolloServerConfig;
