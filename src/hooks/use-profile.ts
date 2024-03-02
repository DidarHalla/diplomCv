import { useMutation } from "@apollo/client";
import { USER_FULL_NAME } from "../graphql/users/users";
import { useParams } from "react-router-dom";
import { UPDATE_PROFILE, UPLOAD_AVATAR } from "../graphql/profile";
import { UpdateProfileInput, UploadAvatarInput } from "cv-graphql";
import { USER } from "../graphql/query";
import { UpdateProfileResult, UploadAvatarResult } from "../graphql/profile/profile.types";


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
  return useMutation<UpdateProfileResult, { profile: UpdateProfileInput }>(UPDATE_PROFILE, {
    refetchQueries: [USER, USER_FULL_NAME]
  })
};

