import { useQuery } from "@apollo/client";
import { LANGUAGES } from "../graphql/languages/languages";
import { Language } from "cv-graphql";

export const useLanguages = () => {
  const data= useQuery<{ languages: Language[] }>(LANGUAGES);
  return { languages: data.data, ...data };
};
