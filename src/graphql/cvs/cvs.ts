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
    created_at
    name
    education
    description
    user{
      id
      email
      profile{
        id
        first_name
        last_name
        full_name
      }
      department_name
      position_name
    }
    languages{
      name
      proficiency
    }
    skills{
      name
      category
      mastery
    }
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