import { gql } from "@apollo/client";
export const currentUser = gql`
  query currentUser {
    currentUser @client {
      _id
      username
      photo
      email
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
      _id
      title
      photo
      createdAt
      argueCount
      participants
      argueVotes
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
