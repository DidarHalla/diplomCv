import { useQuery } from "@apollo/client";
import { DepartmentsResult } from "../graphql/departaments/departaments.type";
import { DEPARTMENTS } from "../graphql/departaments/departaments";

export const useDepartaments = () => {
  return useQuery<DepartmentsResult>(DEPARTMENTS);
};
