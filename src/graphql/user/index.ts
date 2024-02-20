import { gql } from "@apollo/client";

export const USER = gql`
    query User($userId: ID!) {
      user(userId: $userId) {
        email
        department_name
        position_name
        profile {
          created_at
          avatar
          full_name
          first_name
          last_name
        }
      }
    }
  `;