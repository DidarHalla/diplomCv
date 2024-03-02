import { Profile, User } from "cv-graphql";

export type UpdateProfileResult = {
  updateProfile: Profile;
};

export type UploadAvatarResult = {
  uploadAvatar: string;
};

export type UserProfileFormValues = {
  profile: {
    first_name: string;
    last_name: string;
  };
  department: string;
  position: string;
};

export type EmployeeProfileFormProps = {
  user: User | undefined;
};
