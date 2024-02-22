import { FormProvider, useForm } from "react-hook-form";
import { UserFormValues, UserProps } from "./forms.types";
import { useUpdateUser } from "../../../../hooks/use-users";
import { useUpdateProfile } from "../../../../hooks/use-profile";
import {
  Button,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
} from "@mui/material";
import { DepartamentSelect } from "../../../molecules/department-select/department-select";
import { PositionSelect } from "../../../molecules/position-select/position-select";
import { dialogHelpers } from "../../../../helpers/form/form.helper";

export const Form = ({
  text = "Update user",
  textBtn = "Update",
  user,
  closeDialog,
}: UserProps) => {
  const properties = useForm<UserFormValues>({
    defaultValues: {
      auth: {
        email: user?.email || "",
        password: user ? "**********" : "",
      },
      profile: {
        first_name: user?.profile.first_name || "",
        last_name: user?.profile.last_name || "",
      },
      departmentId: user?.department?.id || "",
      positionId: user?.position?.id || "",
    },
  });

  const {
    formState: { errors, isDirty },
    register,
    handleSubmit,
  } = properties;

  const [updateUser, { loading: updating }] = useUpdateUser();
  const [updateProfile] = useUpdateProfile();

  const submit = ({ profile, departmentId, positionId }: UserFormValues) => {
    if (user) {
      Promise.all([
        updateUser({
          variables: { user: { userId: user.id, departmentId, positionId } },
        }),
        updateProfile({
          variables: {
            profile: {
              userId: user.id,
              first_name: profile.first_name,
              last_name: profile.last_name,
            },
          },
        }),
      ]).then(closeDialog);
      //   return
    }
  };

  return (
    <FormProvider {...properties}>
      <form onSubmit={handleSubmit(submit)}>
        <DialogTitle>{text}</DialogTitle>
        <DialogContent>
          <TextField
            {...register("auth.email", {
              validate: (val: string) => {
                if (!val) {
                  return "Required field";
                }
              },
            })}
            label="Email"
            disabled
            error={!!errors.auth?.email}
            helperText={errors.auth?.email?.message}
          />
          <TextField
            {...register("auth.password", {
              validate: (val: string) => {
                if (!val) {
                  return "Required field";
                }
              },
            })}
            label="Password"
            disabled
            error={!!errors.auth?.password}
            helperText={errors.auth?.password?.message}
          />
          <TextField {...register("profile.first_name")} label={"First Name"} />
          <TextField {...register("profile.last_name")} label={"Last Name"} />
          <DepartamentSelect name="departmentId" />
          <PositionSelect name="positionId" />
        </DialogContent>
        <DialogActions>
          <Button variant="outlined" color="secondary" onClick={closeDialog}>
            {"Cancel"}
          </Button>
          <Button
            variant="contained"
            color="primary"
            type="submit"
            disabled={updating || !isDirty}
          >
            {textBtn}
          </Button>
        </DialogActions>
      </form>
    </FormProvider>
  );
};

export const useFormDialog = dialogHelpers<UserProps>(
  (props) => () => <Form {...props} />,
  { maxWidth: "md", fullWidth: true }
);
