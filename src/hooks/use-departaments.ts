import { useQuery } from "@apollo/client";
import { DepartmentsResult } from "../graphql/departaments/departaments.type";
import { DEPARTMENTS } from "../graphql/departaments/departaments";

export const useDepartaments = () => {
  const data= useQuery<DepartmentsResult>(DEPARTMENTS);
  return { departments: data.data, ...data };
};
