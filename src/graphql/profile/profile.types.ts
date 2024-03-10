import { Profile, User } from "cv-graphql";

export type ProfileResult = {
  profile: Profile
}

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
  owner: boolean;
};

export type AddProfileLanguageResult = {
  addProfileLanguage: Profile
}

export type UpdateProfileLanguageResult = {
  updateProfileLanguage: Profile
}

export type DeleteProfileLanguageResult = {
  deleteProfileLanguage: Profile
}
