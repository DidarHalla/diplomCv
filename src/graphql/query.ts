import { gql } from "@apollo/client";

export const LOGIN = gql`
  query Login($email: String!, $password: String!) {
    login(auth: { email: $email, password: $password }) {
      access_token
      user {
        id
        email
        is_verified
        profile {
          id
          first_name
          last_name
          full_name
          avatar
        }
      }
    }
  }
`;

export const USER = gql`
  query User($userId: ID!) {
    user(userId: $userId) {
      id
      created_at
      email
      profile {
        id
        first_name
        last_name
        full_name
        avatar
      }
      department {
        id
        name
      }
      position {
        id
        name
      }
    }
  }
`;
