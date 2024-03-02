import { gql } from "@apollo/client";

export const USER_AVATAR_DELETED = gql`
  mutation DeleteAvatar($avatar: DeleteAvatarInput!) {
    deleteAvatar(avatar: $avatar)
  }
`;

export const UPLOAD_AVATAR = gql`
  mutation UploadAvatar($avatar: UploadAvatarInput!) {
    uploadAvatar(avatar: $avatar)
  }
`;

export const UPDATE_USER = gql`
  mutation updateUser($userId: String!, $departmentId: ID, $positionId: ID) {
    updateUser(
      user: {
        userId: $userId
        departmentId: $departmentId
        positionId: $positionId
      }
    ) {
      department {
        id
        name
      }
      position {
        name
        id
      }
      department_name
    }
  }
`;

export const UPDATE_PROFILE = gql`
  mutation UpdateProfile($profile: UpdateProfileInput!) {
    updateProfile(profile: $profile) {
      id
      first_name
      last_name
    }
  }
`;