import "./UserProfilePage.css";
import CloseIcon from "@mui/icons-material/Close";
import VerifiedIcon from "@mui/icons-material/Verified";
import TextField from "@mui/material/TextField";
import { DeleteAvatarInput } from "cv-graphql";
import { USER_AVATAR_DELETED } from "../../../graphql/profile";
import { useMutation } from "@apollo/client";
import { useParams } from "react-router-dom";
import { FileUploadOutlined } from "@mui/icons-material";
import { fileToBase64 } from "./file-to-base64.helper";
import {
  useAvatarUploaded,
  useUpdateProfile,
} from "../../../hooks/use-profile";
import * as Styled from "../../../graphql/profile/profile-form.styles";
import { ChangeEvent, useEffect } from "react";
import Button from "@mui/material/Button";
import Stack from "@mui/material/Stack";
import { useUpdateUser } from "../../../hooks/use-users";
import { FormProvider, useForm } from "react-hook-form";
import { DepartamentSelect } from "../../molecules/department-select/department-select";
import { PositionSelect } from "../../molecules/position-select/position-select";
import {
  EmployeeProfileFormProps,
  UserProfileFormValues,
} from "../../../graphql/profile/profile.types";
import { USER } from "../../../graphql/auth/query";

export const UserProfilePage = (props: EmployeeProfileFormProps) => {
  const { userId = " " } = useParams();
  const { user } = props;
  const [uploadAvatar, { loading: isLoading }] = useAvatarUploaded();
  const userAdmin: boolean = true;
  const [updateProfile] = useUpdateProfile();
  const [updateUser, { loading }] = useUpdateUser();

  const [useAvatarDelete] = useMutation<null, { avatar: DeleteAvatarInput }>(
    USER_AVATAR_DELETED,
    { refetchQueries: [USER] }
  );
  const useAvatarDeleted = () => {
    useAvatarDelete({ variables: { avatar: { userId: userId ?? "" } } });
  };

  const handleUpload = (file: File) => {
    fileToBase64(file).then((avatar) =>
      uploadAvatar({ variables: { avatar: { userId: userId, ...avatar } } })
    );
  };

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { files } = event.target;
    if (files) {
      handleUpload(files[0]);
    }
  };

  const methods = useForm<UserProfileFormValues>({
    defaultValues: {
      profile: {
        first_name: user?.profile.first_name || "",
        last_name: user?.profile.last_name || "",
      },
      department: user?.department?.id || "",
      position: user?.position?.id || "",
    },
  });
  const { formState, register, handleSubmit, reset, setValue } = methods;
  useEffect(() => {
    setValue("profile", {
      first_name: user?.profile.first_name || "",
      last_name: user?.profile.last_name || "",
    });
    setValue("department", user?.department?.id || "");
    setValue("position", user?.position?.id || "");
  }, [!!user]);
  const onSubmit = ({
    profile,
    position,
    department,
  }: UserProfileFormValues) => {
    Promise.all([
      updateProfile({
        variables: {
          profile: {
            userId: user?.id ?? "",
            first_name: profile.first_name,
            last_name: profile.last_name,
          },
        },
      }),
      updateUser({
        variables: {
          user: {
            userId: user?.id ?? "",
            departmentId: department,
            positionId: position,
          },
        },
      }),
    ]).then(() => reset({ profile, position, department }));

    return;
  };

  return (
    <>
      <div className="User-Profile-Page">
        <div className="wrapper-user-image">
          <div>
            {user?.profile.avatar ? (
              <img
                src={user?.profile.avatar}
                alt="userImage"
                className="user-image"
              />
            ) : (
              <img
                alt={
                  user?.profile.first_name
                    ? user?.profile.first_name[0]
                    : user?.email[0].toUpperCase()
                }
                className="user-image-without-image"
              />
            )}
            {user?.profile.avatar ? (
              <CloseIcon onClick={useAvatarDeleted} className="close-icon" />
            ) : (
              <svg className="svg-unavailable"></svg>
            )}
          </div>
          <div>
            <div>
              <label>
                <FileUploadOutlined
                  fontSize="large"
                  sx={{ mr: 2 }}
                  className="upload-icon"
                />
                <Styled.Input
                  type="file"
                  accept=".png, .jpg, .jpeg, .gif"
                  size={500}
                  disabled={isLoading}
                  onChange={handleChange}
                />
              </label>
              <span>Upload avatar image</span>
            </div>
            <div>
              <span className="bottom-text-upload">
                png, jpg or gif no more than 0.5MB
              </span>
            </div>
          </div>
        </div>
        <div className="user-info">
          <div>
            <span className="user-name">{user?.profile.full_name}</span>
          </div>
          <div>
            <span className="user-email">{user?.email}</span>
            {userAdmin ? (
              <VerifiedIcon className="verified-icon" />
            ) : (
              <svg className="svg-unavailable"></svg>
            )}
          </div>
          <div>
            <span className="member-since">
              A member since
              {new Date(+(user?.profile.created_at ?? "")).toDateString()}
            </span>
          </div>
        </div>
        <div className="user-info-inputs">
          <div>
            <div className="text-field text-field_floating-2">
              <FormProvider {...methods}>
                <Stack
                  onSubmit={handleSubmit(onSubmit)}
                  component="form"
                  spacing={2}
                  direction="column"
                >
                  <TextField
                    required
                    {...register("profile.first_name")}
                    label={user ? "" : "First Name"}
                    className="first-name"
                  />
                  <DepartamentSelect name="department" />
                  <TextField
                    required
                    {...register("profile.last_name")}
                    label={user ? "" : "Last Name"}
                    className="last-name"
                  />
                  <PositionSelect name="position" />
                  <Button
                    type="submit"
                    disabled={!formState.isDirty || loading}
                    variant="contained"
                  >
                    Contained
                  </Button>
                </Stack>
              </FormProvider>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
