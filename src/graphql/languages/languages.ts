import { gql } from "@apollo/client";

export const LANGUAGES = gql`
  query Languages {
    languages {
      id
      name
    }
  }
`;
