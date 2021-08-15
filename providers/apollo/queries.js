import { gql } from "@apollo/client";
export const currentUser = gql`
  query currentUser {
    currentUser @client {
      _id
      username
    }
  }
`;
export const getUser = gql`
  query getUser {
    user {
      _id
      username
      email
      photo
    }
  }
`;
export const getDebates = gql`
  query getDebates {
    debates {
      title
      id
      photo
      ArguesCount
      createdAt
    }
  }
`;
