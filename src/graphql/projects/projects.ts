import { gql } from "@apollo/client";

export const PROJECTS = gql`
  query Projects {
    projects {
       id
       name
       internal_name
       domain
       start_date
       end_date
       team_size
    }
  }
`;
export const PROJECT=gql`
query Project($userId: ID!) {
  project (id: $id) {
    id
    name
    internal_name
    domain
    start_date
    end_date
  }`