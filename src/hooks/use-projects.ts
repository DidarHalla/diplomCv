import { useQuery } from "@apollo/client";
import { Project,Cv } from "cv-graphql";
import {  PROJECTS } from "../graphql/projects/projects";
import { CV } from "../graphql/cvs/cvs";

export const useProjects = () => {
    const data = useQuery<{ projects: Project[] }>(PROJECTS);
    return { projects: data.data, ...data };
  };
  export const useProject = (cvId: string) => {
    const query = useQuery<{cv:Cv}>(CV, { variables: { cvId } });
    return { projects: query.data?.cv.projects, ...query };
  };