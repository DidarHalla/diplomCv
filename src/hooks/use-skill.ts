import { useMutation, useQuery } from "@apollo/client";
import { SKILLS, SKILL_CATEGORIES } from "../graphql/skill/skill";
import {
  SkillCategoriesResult,
  SkillsResult,
} from "../graphql/skill/skill.types";
import { ADD_PROFILE_SKILL } from "../graphql/profile";
import { AddProfileSkillInput } from "cv-graphql";
import { AddProfileSkillResult } from "../graphql/profile/profile.types";

export const useSkills = () => {
  const query = useQuery<SkillsResult>(SKILLS);
  return { skills: query.data?.skills || [], ...query };
};

export const useSkillCategories = () => {
  const query = useQuery<SkillCategoriesResult>(SKILL_CATEGORIES);
  return { categories: query.data?.skillCategories || [], ...query };
};

export const useProfileSkillAdd = () => {
  return useMutation<AddProfileSkillResult, { skill: AddProfileSkillInput }>(
    ADD_PROFILE_SKILL
  );
};
