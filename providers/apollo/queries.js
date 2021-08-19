import { gql } from '@apollo/client';
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
      followed
      notifications {
        text
        debate {
          title
          photo
          slug
        }
        argue
      }
      debates {
        title
        photo
        createdAt
        argueCount
        argueVotes
        participants
        slug
        tags {
          title
        }
        views
        _id
      }
      otherDebates {
        _id
        title
        photo
        createdAt
        argueCount
        argueVotes
        participants
        slug
        tags {
          title
        }
        views
      }
      votesCount
      arguesCount
    }
  }
`;
export const getDebates = gql`
  query getDebates(
    $debatesTag: String
    $debatesAmount: Int
    $debatesStart: Int
    $debatesOrder: String
    $debatesKeyword: String
  ) {
    debates(
      tag: $debatesTag
      amount: $debatesAmount
      start: $debatesStart
      order: $debatesOrder
      keyword: $debatesKeyword
    ) {
      _id
      title
      photo
      views
      tags {
        title
        photo
        _id
      }
      slug
      participants
      argueVotes
      argueCount
      createdAt
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
export const getTags = gql`
  query getTags {
    tags {
      _id
      title
      photo
    }
  }
`;
