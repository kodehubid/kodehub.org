'use strict';

import { gql } from 'apollo-server';

export default gql`
  type PageInfo {
    """
    end cursor is reffered to createdAt (date) with hash base64
    """
    endCursor: String!
    hasNextPage: Boolean!
  }
`;
