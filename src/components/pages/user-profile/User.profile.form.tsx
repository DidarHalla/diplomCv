// import TextField from "@mui/material/TextField";
// import Select from "@mui/material/Select";
// import MenuItem from "@mui/material/MenuItem";
// import FormControl from "@mui/material/FormControl";
// import { InputLabel } from "@mui/material";
// import Button from "@mui/material/Button";
// import Stack from "@mui/material/Stack";
// import { useForm } from "react-hook-form";
// import { useProfileUpdate } from "../../../hooks/use-profile";
// import { useUpdateUser } from "../../../hooks/use-users";
// import { User } from "cv-graphql";

// type EmployeeProfileFormProps = {
//   user: User
// }

// type UserProfileFormValues = {
//   profile: {
//     first_name: string;
//     last_name: string;
//   };
//   department: string;
//   position: string;
// };

// export const UserProfileForm = (user: EmployeeProfileFormProps) => {
//   const [updateProfile] = useProfileUpdate();
//   const [updateUser, { loading }] = useUpdateUser()

//   const methods = useForm<UserProfileFormValues>({
//     defaultValues: {
//       profile: {
//         first_name: user.profile.first_name || "",
//         last_name: user.profile.last_name || "",
//       },
//       department: user.department?.id || "",
//       position: user.position?.id || "",
//     },
//   });
//   const { formState, register, handleSubmit, reset } = methods;

//   const onSubmit = ({
//     profile,
//     position,
//     department,
//   }: UserProfileFormValues) => {
//     Promise.all([
//       updateProfile({
//         variables: {
//           profile: {
//             userId: user.id,
//             first_name: profile.first_name,
//             last_name: profile.last_name,
//           },
//         },
//       }),
//       updateUser({
//         variables: {
//           user: {
//             userId: user.id,
//             departmentId: department,
//             positionId: position,
//             role: user.role,
//           },
//         },
//       }),
//     ]).then(() => reset({ profile, position, department }));
//   };

//   return (
//     <div className="text-field text-field_floating-2">
//       <Stack
//         onSubmit={handleSubmit(onSubmit)}
//         component="form"
//         spacing={2}
//         direction="column"
//       >
//         <TextField
//           required
//           {...register("profile.first_name")}
//           label="First Name"
//           className="first-name"
//           defaultValue={user?.user.profile.first_name}
//         />
//         <FormControl>
//           <InputLabel htmlFor="department">Department</InputLabel>
//           <Select
//             name="department"
//             labelId="department"
//             id="department"
//             label="Department"
//             defaultValue={user?.user.department_name}
//           >
//             <MenuItem>No department</MenuItem>
//             <MenuItem value="React">React</MenuItem>
//             <MenuItem value="Angular">Angular</MenuItem>
//             <MenuItem value="Node">Node</MenuItem>
//             <MenuItem value="Python">Python</MenuItem>
//             <MenuItem value="DevOps">DevOps</MenuItem>
//             <MenuItem value="Global">Global</MenuItem>
//             <MenuItem value="Quality Assurance">Quality Assurance</MenuItem>
//           </Select>
//         </FormControl>
//         <TextField
//           required
//           {...register("profile.last_name")}
//           label="Last Name"
//           className="last-name"
//           defaultValue={user?.user.profile.last_name}
//         />
//         <FormControl>
//           <InputLabel id="demo-select-small-label">Position</InputLabel>
//           <Select
//             labelId="demo-select-small-label"
//             id="demo-select-small"
//             name="position"
//             defaultValue={user?.user.position_name}
//             label="Position"
//           >
//             <MenuItem>No position</MenuItem>
//             <MenuItem value="Software Engineer">Software Engineer</MenuItem>
//             <MenuItem value="Systems Analyst">Systems Analyst</MenuItem>
//             <MenuItem value="Network Engineer">Network Engineer</MenuItem>
//             <MenuItem value="userbase Administrator">
//               userBase Administrator
//             </MenuItem>
//             <MenuItem value="UX Designer">UX Designer</MenuItem>
//             <MenuItem value="Support Specialist">Support Specialist</MenuItem>
//             <MenuItem value="user Analyst">user Analyst</MenuItem>
//             <MenuItem value="user Architect">user Architect</MenuItem>
//             <MenuItem value="DevOps Engineer">DevOps Engineer</MenuItem>
//             <MenuItem value="QA Engineer">QA Engineer</MenuItem>
//             <MenuItem value="Cloud Engineer">Cloud Engineer</MenuItem>
//             <MenuItem value="Project Manager">Project Manager</MenuItem>
//             <MenuItem value="AQA Engineer">AQA Engineer</MenuItem>
//           </Select>
//         </FormControl>
//         <Button
//           type="submit"
//           disabled={!formState.isDirty || loading}
//           variant="contained"
//         >
//           Contained
//         </Button>
//       </Stack>
//     </div>
//   );
// };
