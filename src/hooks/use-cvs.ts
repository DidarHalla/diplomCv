import { useQuery } from "@apollo/client";
import { Cv } from "cv-graphql";
import { CVS } from "../graphql/cvs/cvs";

export const useCVs = () => {
    const data = useQuery<{ cvs: Cv[] }>(CVS);
    return { cvs: data.data, ...data };
  };