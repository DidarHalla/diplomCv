import { gql } from "@apollo/client";

export const SIGN_NUP = gql`
  mutation Signup($email: String!, $password: String!) {
    signup(auth: { email: $email, password: $password }) {
      access_token
    }
  }
`;
