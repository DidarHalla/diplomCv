import { FormProvider, useForm } from "react-hook-form";
import { UserFormValues, UserProps } from "./formUser.types";
import { useUpdateUser, useUser } from "../../../hooks/use-users";
import { useUpdateProfile } from "../../../hooks/use-profile";
import {
  Button,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
} from "@mui/material";
import { DepartamentSelect } from "../../molecules/department-select/department-select";
import { PositionSelect } from "../../molecules/position-select/position-select";
import { dialogHelpers } from "../../../helpers/form/form.helper";
import { useEffect } from "react";

export const User = ({
  text = "Update user",
  textBtn = "Update",
  userId,
  closeDialog,
}: UserProps) => {
  const { user, loading } = useUser(userId);

  const properties = useForm<UserFormValues>({
    defaultValues: {
      auth: {
        email: user?.email || "",
        password: user ? "*****" : "",
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
    setValue,
  } = properties;

  useEffect(() => {
    setValue("auth", {
      email: user?.email || "",
      password: user ? "*****" : "",
    });
    setValue("profile", {
      first_name: user?.profile.first_name || "",
      last_name: user?.profile.last_name || "",
    });
    setValue("departmentId", user?.department?.id || "");
    setValue("positionId", user?.position?.id || "");
  }, [loading]);

  const [updateUser, { loading: load }] = useUpdateUser();
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
      return;
    }
  };

  return (
    <FormProvider {...properties}>
      <form onSubmit={handleSubmit(submit)}>
        <DialogTitle>{text}</DialogTitle>
        <DialogContent
          sx={{
            overflowY: "auto",
            paddingRight: "24px",
            paddingBottom: "20px",
            paddingLeft: "24px",
            display: "grid",
            gridTemplateColumns: "1fr" + " 1fr",
            gap: "32px",
            paddingTop: "16px" + " !important",
          }}
        >
          <TextField
            {...register("auth.email", {
              validate: (val: string) => {
                if (!val) {
                  return "Required field";
                }
              },
            })}
            label={loading ? "Email" : ""}
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
            label={loading ? "Password" : ""}
            disabled
            error={!!errors.auth?.password}
            helperText={errors.auth?.password?.message}
          />
          <TextField
            {...register("profile.first_name")}
            label={loading ? "First Name" : ""}
          />
          <TextField
            {...register("profile.last_name")}
            label={loading ? "Last Name" : ""}
          />
          <DepartamentSelect name="departmentId" />
          <PositionSelect name="positionId" />
        </DialogContent>
        <DialogActions>
          <Button variant="outlined" color="primary" onClick={closeDialog}>
            Cancel
          </Button>
          <Button
            variant="contained"
            color="primary"
            type="submit"
            disabled={load || !isDirty}
          >
            {textBtn}
          </Button>
        </DialogActions>
      </form>
    </FormProvider>
  );
};

export const useUserDialog = dialogHelpers<UserProps>(
  (props) => () => <User {...props} />,
  { maxWidth: "md", fullWidth: true }
);
