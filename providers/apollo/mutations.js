import { gql } from "@apollo/client";

export const USER_LOGIN = gql`
  mutation signin($username: String!, $password: String!) {
    signin(username: $username, password: $password) {
      user {
        _id
        username
        photo
        email
      }
      token
    }
  }
`;
export const USER_SIGNUP = gql`
  mutation signup($username: String!, $password: String!, $email: String!) {
    signup(user: { username: $username, password: $password, email: $email }) {
      user {
        _id
        username
        photo
        email
      }
      token
    }
  }
`;
export const USER_UPDATE = gql`
  mutation UpdateUserMutation($username: String, $photo: String) {
    updateUser(user: { username: $username, photo: $photo }) {
      username
      photo
    }
  }
`;
export const CREATE_DEBATE = gql`
  mutation CreateDebateMutation(
    $title: String!
    $photo: String!
    $argue: String!
  ) {
    createDebate(debate: { title: $title, photo: $photo, argue: $argue }) {
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

export const CREATE_ARGUE = gql`
  mutation CreateArgueMutation($argue: ArgueCreateInput!) {
    createArgue(argue: $argue) {
      _id
      argueType
      content
      parent
      createdAt
      votes {
        number
        amount
      }
    }
  }
`;
export const VOTE_ARGUE = gql`
  mutation VoteMutation($argue: String, $value: Int) {
    vote(argue: $argue, value: $value) {
      _id
      argueType
      content
      createdAt
      parent
      votes {
        number
        amount
      }
    }
  }
`;
