import { gql } from "@apollo/client";

export const LOGIN = gql`
  query Login($email: String!, $password: String!) {
    login(auth: { email: $email, password: $password }) {
      access_token
      user {
        id
        email
        profile {
          id
          full_name
          avatar
        }
        role
        is_verified
      }
    }
  }
`;
