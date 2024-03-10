import { gql } from "@apollo/client";

export const SKILLS = gql`
  query Skills {
    skills {
      id
      name
    }
  }
`;
