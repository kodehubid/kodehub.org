## Usage

- Install all dependencies on the packages use `npx lerna bootstrap`
- Start development use `yarn dev`
- Start local production use `yarn start`
- Testing use `yarn test`

## kodehub-backend

### Configs

File configs is located on `packages/kodehub-backend/src/app/configs.js`

- default port: 8080
- grphql server path: http://localhost:8080/graphql

### Express

```js
const express = require('express');
const { ApolloServer, gql } = require('apollo-server-express');

// Construct a schema, using GraphQL schema language
const typeDefs = gql`
  type Query {
    hello: String
  }
`;

// Provide resolver functions for your schema fields
const resolvers = {
  Query: {
    hello: () => 'Hello world!'
  }
};

const server = new ApolloServer({ typeDefs, resolvers });

const app = express();
server.applyMiddleware({ app });

app.listen({ port: 4000 }, () =>
  console.log(`🚀 Server ready at http://localhost:4000${server.graphqlPath}`)
);
```

## kodehub-frontend

- default port: 3000
