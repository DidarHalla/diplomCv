import { useMutation } from "@apollo/client";
import { USER, USER_FULL_NAME } from "../graphql/users/users";
import { useParams } from "react-router-dom";
import { UPDATE_PROFILE, UPLOAD_AVATAR } from "../graphql/profile";
import { Profile, UpdateProfileInput, UploadAvatarInput } from "cv-graphql";

type UploadAvatarResult = {
  uploadAvatar: string;
};

type UpdateProfileResult = {
  UpdateProfile: Profile;
}

export const useAvatarUploaded = () => {
  const { userId } = useParams();
  return useMutation<UploadAvatarResult, { avatar: UploadAvatarInput }>(
    UPLOAD_AVATAR,
    {
      refetchQueries: [{ query: USER, variables: { userId } }],
    }
  );
};

export const useProfileUpdate = () => {
  return useMutation<UpdateProfileResult, { profile: UpdateProfileInput }>(UPDATE_PROFILE, {
    refetchQueries: [USER, USER_FULL_NAME]
  })
};
