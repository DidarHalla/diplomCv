import "./UserProfilePage.css";
import CloseIcon from "@mui/icons-material/Close";
import VerifiedIcon from "@mui/icons-material/Verified";
import TextField from "@mui/material/TextField";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import { InputLabel } from "@mui/material";
import { DeleteAvatarInput, UploadAvatarInput, User } from "cv-graphql";
import { USER_AVATAR_DELETED } from "../../../graphql/profile";
import { UPLOAD_AVATAR } from "../../../graphql/profile";
import { useMutation } from "@apollo/client";
import { useParams } from "react-router-dom";
import { FileUploadOutlined } from "@mui/icons-material";
import { fileToBase64 } from "./file-to-base64.helper";
import { useAvatarUploaded } from "./hooks.use.avatar";

export const UserProfilePage = (props: { user: User } | undefined) => {
  const { userId } = useParams();
  const [uploadAvatar, { loading: isLoading }] = useAvatarUploaded();

  const { user } = props;

  const [useAvatarDelete] = useMutation<null, { avatar: DeleteAvatarInput }>(
    USER_AVATAR_DELETED
  );
  const useAvatarDeleted = () => {
    useAvatarDelete({ variables: { avatar: { userId: userId ?? "" } } });
  };

  const handleUpload = (file: File) => {
    fileToBase64(file).then((avatar) =>
      uploadAvatar({ variables: { avatar: { userId: user.id, ...avatar } } })
    );
  };

  console.log(user?.user.profile.avatar);
  return (
    <>
      <div className="User-Profile-Page">
        <div className="wrapper-user-image">
          <div>
            {user?.user.profile.avatar ? (
              <img
                src={user?.user.profile.avatar}
                alt="userImage"
                className="user-image"
              />
            ) : (
              <img
                alt={user?.user.profile.first_name[0]}
                className="user-image-without-image"
              />
            )}
            {user?.user.profile.avatar ? (
              <CloseIcon onClick={useAvatarDeleted} className="close-icon" />
            ) : (
              <svg></svg>
            )}
          </div>
          <div>
            <div>
              <label>
                <FileUploadOutlined
                  fontSize="large"
                  sx={{ mr: 2 }}
                  className="upload-icon"
                  onChange={() => handleUpload}
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
            {" "}
            <span className="user-name">{user?.user.profile.full_name}</span>
          </div>
          <div>
            {" "}
            <span className="user-email">{user?.user.email}</span>
            <VerifiedIcon className="verified-icon" />
          </div>
          <div>
            {" "}
            <span className="member-since">
              A member since{" "}
              {new Date(+user?.user.profile.created_at).toDateString()}
            </span>
          </div>{" "}
        </div>
        <div className="user-info-inputs">
          <div>
            <div>
              <TextField
                required
                label="First Name"
                className="first-name"
                defaultValue={user?.user.profile.first_name}
              />
            </div>
            <div className="text-field text-field_floating-2">
              <FormControl className="department">
                <InputLabel id="demo-select-small-label">Department</InputLabel>
                <Select
                  labelId="demo-select-small-label"
                  id="demo-select-small"
                  label="Department"
                  style={{ color: "white" }}
                  defaultValue={user?.user.department_name}
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
            </div>
          </div>
          <div>
            <div>
              <TextField
                required
                label="Last Name"
                className="last-name"
                defaultValue={user?.user.profile.last_name}
              />
            </div>
            <div className="text-field text-field_floating-2">
              <FormControl className="position">
                <InputLabel id="demo-select-small-label">Position</InputLabel>
                <Select
                  labelId="demo-select-small-label"
                  id="demo-select-small"
                  style={{ color: "white" }}
                  defaultValue={user?.user.position_name}
                  label="Position"
                >
                  <MenuItem>No position</MenuItem>
                  <MenuItem value="Software Engineer">
                    Software Engineer
                  </MenuItem>
                  <MenuItem value="Systems Analyst">Systems Analyst</MenuItem>
                  <MenuItem value="Network Engineer">Network Engineer</MenuItem>
                  <MenuItem value="userbase Administrator">
                    userbase Administrator
                  </MenuItem>
                  <MenuItem value="UX Designer">UX Designer</MenuItem>
                  <MenuItem value="Support Specialist">
                    Support Specialist
                  </MenuItem>
                  <MenuItem value="user Analyst">user Analyst</MenuItem>
                  <MenuItem value="user Architect">user Architect</MenuItem>
                  <MenuItem value="DevOps Engineer">DevOps Engineer</MenuItem>
                  <MenuItem value="QA Engineer">QA Engineer</MenuItem>
                  <MenuItem value="Cloud Engineer">Cloud Engineer</MenuItem>
                  <MenuItem value="Project Manager">Project Manager</MenuItem>
                  <MenuItem value="AQA Engineer">AQA Engineer</MenuItem>
                </Select>
              </FormControl>
            </div>
            <div>
              <button className="profile-update">UPDATE</button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
