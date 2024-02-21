import { useMutation } from "@apollo/client";
import { UpdateProfileResult } from "../graphql/profile/profile.types";
import { UpdateProfileInput } from "cv-graphql";
import { UPDATE_PROFILE } from "../graphql/profile/profile";
import { USER, USER_FULL_NAME } from "../graphql/users/users";

export const useUpdateProfile = () => {
  return useMutation<UpdateProfileResult, { profile: UpdateProfileInput }>(
    UPDATE_PROFILE,
    { refetchQueries: [USER, USER_FULL_NAME] }
  );
};
