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
      _id
      photo
      arguesCount
      createdAt
      slug
    }
  }
`;
export const getDebate = gql`
  query debate($slug: String!) {
    debate(slug: $slug) {
      title
      createdAt
      photo
      slug
      _id
      argues {
        _id
        content
        argueType
        parent
        createdAt
        votes {
          number
          amount
        }
      }
    }
  }
`;
