import { gql } from "@apollo/client";

export const QUERY_BOOKS = gql`
  query allBooks {
    books {
      _id
      title
    }
  }
`;
