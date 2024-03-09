import { useQuery } from "@apollo/client";
import { SKILLS } from "../graphql/skills/skills";
import { Skill } from "cv-graphql";

export const useSkills = () => {
  const skill = useQuery<{ skills: Skill[] }>(SKILLS);
  return { skills: skill.data, ...skill };
};
