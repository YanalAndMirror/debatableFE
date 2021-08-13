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
