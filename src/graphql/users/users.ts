import { gql } from "@apollo/client";

export const USER_FULL_NAME = gql`
  query UserFullName($userId: ID!) {
    user(userId: $userId) {
      id
      email
      profile {
        id
        full_name
      }
    }
  }
`;

export const USERS = gql`
  query Users {
    users {
      id
      email
      department_name
      position_name
      profile {
        avatar
        first_name
        last_name
      }
    }
  }
`;
