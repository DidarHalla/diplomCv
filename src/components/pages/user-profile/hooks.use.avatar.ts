import { useMutation } from "@apollo/client";
import { useParams } from "react-router-dom";
import { USER } from "../../../graphql/user";
import { UploadAvatarInput } from "cv-graphql";
import { UPLOAD_AVATAR } from "../../../graphql/profile";

type UploadAvatarResult = {
  uploadAvatar: string;
};

export const useAvatarUploaded = () => {
  const { userId } = useParams();
  return useMutation<UploadAvatarResult, { avatar: UploadAvatarInput }>(
    UPLOAD_AVATAR,
    {
      refetchQueries: [{ query: USER, variables: { userId } }],
    }
  );
};
