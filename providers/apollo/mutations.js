import { gql } from '@apollo/client';

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
  mutation CreateUserMutation(
    $username: String!
    $password: String!
    $email: String!
  ) {
    createUser(
      user: { username: $username, password: $password, email: $email }
    ) {
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

export const CREATE_DEBATE = gql`
  mutation CreateDebateMutation(
    $title: String!
    $photo: String!
    $argue: String!
  ) {
    createDebate(debate: { title: $title, photo: $photo, argue: $argue }) {
      title
    }
  }
`;

export const CREATE_ARGUE = gql`
  mutation CreateArgueMutation($content: String!) {
    createArgue(argue: { content: $content }) {
      content
      id
    }
  }
`;
