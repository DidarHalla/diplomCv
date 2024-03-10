import { gql } from "@apollo/client";

export const CVS = gql`
  query Cvs {
    cvs {
        id
        name
        description
        user{
            id
            email
        }

    }
  }
`;
export const CV=gql`
query Cv($cvId: ID!) {
  cv (cvId: $cvId) {
    id
    projects{
      id
      name
      internal_name
      domain
      start_date
      end_date
    }
  }
}
`