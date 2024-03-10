import { useMutation, useQuery } from "@apollo/client";
import { USER_FULL_NAME } from "../graphql/users/users";
import { useParams } from "react-router-dom";
import {
  ADD_PROFILE_SKILL,
  DELETE_PROFILE_SKILL,
  PROFILE_SKILLS,
  UPDATE_PROFILE,
  UPDATE_PROFILE_SKILL,
  UPLOAD_AVATAR,
} from "../graphql/profile";
import {
  AddProfileSkillInput,
  DeleteProfileSkillInput,
  SkillMastery,
  UpdateProfileInput,
  UpdateProfileSkillInput,
  UploadAvatarInput,
} from "cv-graphql";
import { USER } from "../graphql/query";
import {
  AddProfileSkillResult,
  DeleteProfileSkillResult,
  ProfileResult,
  UpdateProfileResult,
  UpdateProfileSkillResult,
  UploadAvatarResult,
} from "../graphql/profile/profile.types";
import { useMemo } from "react";

export const useAvatarUploaded = () => {
  const { userId } = useParams();
  return useMutation<UploadAvatarResult, { avatar: UploadAvatarInput }>(
    UPLOAD_AVATAR,
    {
      refetchQueries: [{ query: USER, variables: { userId } }],
    }
  );
};

export const useUpdateProfile = () => {
  return useMutation<UpdateProfileResult, { profile: UpdateProfileInput }>(
    UPDATE_PROFILE,
    {
      refetchQueries: [USER, USER_FULL_NAME],
    }
  );
};

export const useProfileSkills = (userId: string) => {
  const skillsQuery = useQuery<ProfileResult>(PROFILE_SKILLS, {
    variables: { userId },
  });
  const skills = skillsQuery.data?.profile.skills || [];

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

export const useSkillAdd = () => {
  return useMutation<AddProfileSkillResult, { skill: AddProfileSkillInput }>(
    ADD_PROFILE_SKILL
  );
};

export const useProfileSkillUpdate = () => {
  return useMutation<
    UpdateProfileSkillResult,
    { skill: UpdateProfileSkillInput }
  >(UPDATE_PROFILE_SKILL);
};

export const useProfileSkillDelete = () => {
  return useMutation<
    DeleteProfileSkillResult,
    { skill: DeleteProfileSkillInput }
  >(DELETE_PROFILE_SKILL);
};
