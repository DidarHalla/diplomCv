import { useMutation, useQuery } from "@apollo/client";
import {
  AddCvSkillInput,
  Cv,
  DeleteCvSkillInput,
  SkillMastery,
  UpdateCvSkillInput,
} from "cv-graphql";
import {
  ADD_CV_SKILL,
  CV,
  CVS,
  CV_SKILLS,
  DELETE_CV_SKILL,
  UPDATE_CV,
  UPDATE_CV_SKILL,
} from "../graphql/cvs/cvs";
import { useMemo } from "react";
import {
  AddCvSkillResult,
  CvResult,
  DeleteCvSkillResult,
  UpdateCvResult,
  UpdateCvSkillResult,
} from "../graphql/cv/cv.types";
import { CvFormValues } from "../components/organisms/forms/formCv.types";

export const useCVs = () => {
  const data = useQuery<{ cvs: Cv[] }>(CVS);
  return { cvs: data.data, ...data };
};

export const useCv = (cvId: string) => {
  const query = useQuery<CvResult>(CV, { variables: { cvId } });
  return { cv: query.data?.cv, ...query };
};

export const useCvSkills = (cvId: string) => {
  const skillsQuery = useQuery<CvResult>(CV_SKILLS, { variables: { cvId } });
  const skills = skillsQuery.data?.cv.skills || [];

  const classes = useMemo(() => {
    return skills.reduce<Record<string, SkillMastery[]>>(
      (accumulator, currentValue) => {
        const category = currentValue.category || "Other value";

        if (!accumulator[category]) {
          accumulator[category] = [];
        }

        accumulator[category].push(currentValue);
        return accumulator;
      },
      {}
    );
  }, [skills]);

  return { skills, classes, ...skillsQuery };
};

export const useAddCvSkill = () => {
  return useMutation<AddCvSkillResult, { skill: AddCvSkillInput }>(
    ADD_CV_SKILL
  );
};

export const useDeleteCvSkill = () => {
  return useMutation<DeleteCvSkillResult, { skill: DeleteCvSkillInput }>(
    DELETE_CV_SKILL
  );
};

export const useUpdateCvSkill = () => {
  return useMutation<UpdateCvSkillResult, { skill: UpdateCvSkillInput }>(
    UPDATE_CV_SKILL
  );
};

export const useUpdateCv = () => {
  return useMutation<UpdateCvResult, { cv: CvFormValues }>(UPDATE_CV);
};
