import "./UserProfilePage.css";
import CloseIcon from "@mui/icons-material/Close";
import VerifiedIcon from "@mui/icons-material/Verified";
import TextField from "@mui/material/TextField";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import { InputLabel } from "@mui/material";
import { DeleteAvatarInput, User } from "cv-graphql";
import { USER_AVATAR_DELETED } from "../../../graphql/profile";
import { useMutation } from "@apollo/client";
import { useParams } from "react-router-dom";
import { FileUploadOutlined } from "@mui/icons-material";
import { fileToBase64 } from "./file-to-base64.helper";
import {
  useAvatarUploaded,
  useProfileUpdate,
} from "../../../hooks/use-profile";
import * as Styled from "../../../graphql/profile/profile-form.styles";
import { ChangeEvent } from "react";
import Button from "@mui/material/Button";
import Stack from "@mui/material/Stack";
import { useUpdateUser } from "../../../hooks/use-users";
import { FormProvider, useForm } from "react-hook-form";

type UserProfileFormValues = {
  profile: {
    first_name: string;
    last_name: string;
  };
  department: string;
  position: string;
};

type EmployeeProfileFormProps = {
  user: User;
};

export const UserProfilePage = (props: EmployeeProfileFormProps) => {
  const { userId = " " } = useParams();

  const { user } = props;
  const [uploadAvatar, { loading: isLoading }] = useAvatarUploaded();
  const userAdmin: boolean = true;
  const [updateProfile] = useProfileUpdate();
  const [updateUser, { loading }] = useUpdateUser();

  const [useAvatarDelete] = useMutation<null, { avatar: DeleteAvatarInput }>(
    USER_AVATAR_DELETED
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
      department: user?.department_name || "",
      position: user?.position_name || "",
    },
  });
  const { formState, register, handleSubmit, reset } = methods;
  console.log(user);

  const onSubmit = ({
    profile,
    position,
    department,
  }: UserProfileFormValues) => {
    Promise.all([
      updateProfile({
        variables: {
          profile: {
            userId: userId,
            first_name: profile.first_name,
            last_name: profile.last_name,
          },
        },
      }),
      updateUser({
        variables: {
          user: {
            userId: userId,
            departmentId: department,
            positionId: position,
          },
        },
      }),
    ]).then(() => reset({ profile, position, department }));
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
              {new Date(+user?.profile.created_at).toDateString()}
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
                    label="First Name"
                    className="first-name"
                  />
                  <FormControl>
                    <InputLabel htmlFor="department">Department</InputLabel>
                    <Select
                      name="department"
                      labelId="department"
                      id="department"
                      label="Department"
                    >
                      <MenuItem>No department</MenuItem>
                      <MenuItem value="React">React</MenuItem>
                      <MenuItem value="Angular">Angular</MenuItem>
                      <MenuItem value="Node">Node</MenuItem>
                      <MenuItem value="Python">Python</MenuItem>
                      <MenuItem value="DevOps">DevOps</MenuItem>
                      <MenuItem value="Global">Global</MenuItem>
                      <MenuItem value="Quality Assurance">
                        Quality Assurance
                      </MenuItem>
                    </Select>
                  </FormControl>
                  <TextField
                    required
                    {...register("profile.last_name")}
                    label="Last Name"
                    className="last-name"
                  />
                  <FormControl>
                    <InputLabel id="demo-select-small-label">
                      Position
                    </InputLabel>
                    <Select
                      labelId="demo-select-small-label"
                      id="demo-select-small"
                      name="position"
                      label="Position"
                    >
                      <MenuItem>No position</MenuItem>
                      <MenuItem value="Software Engineer">
                        Software Engineer
                      </MenuItem>
                      <MenuItem value="Systems Analyst">
                        Systems Analyst
                      </MenuItem>
                      <MenuItem value="Network Engineer">
                        Network Engineer
                      </MenuItem>
                      <MenuItem value="userbase Administrator">
                        userBase Administrator
                      </MenuItem>
                      <MenuItem value="UX Designer">UX Designer</MenuItem>
                      <MenuItem value="Support Specialist">
                        Support Specialist
                      </MenuItem>
                      <MenuItem value="user Analyst">user Analyst</MenuItem>
                      <MenuItem value="user Architect">user Architect</MenuItem>
                      <MenuItem value="DevOps Engineer">
                        DevOps Engineer
                      </MenuItem>
                      <MenuItem value="QA Engineer">QA Engineer</MenuItem>
                      <MenuItem value="Cloud Engineer">Cloud Engineer</MenuItem>
                      <MenuItem value="Project Manager">
                        Project Manager
                      </MenuItem>
                      <MenuItem value="AQA Engineer">AQA Engineer</MenuItem>
                    </Select>
                  </FormControl>
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
