import { Visibility, VisibilityOff } from "@mui/icons-material";
import { Box, Button, IconButton, TextField } from "@mui/material";
import { useCallback, useState } from "react";
import { routes } from "../../../constants/routes";
import { useNavigate } from "react-router-dom";
import { useLogin } from "../../../apollo client/authHooks/auth.hooks";
import { AuthUsers } from "../pages.types";
import { useForm } from "react-hook-form";

export const Login = () => {
  const [vision, setVision] = useState(true);
  const passwordVision = useCallback(() => {
    setVision((prev) => !prev);
  }, []);

  const {
    formState: { errors }, // state errors forms
    register,
    handleSubmit,
  } = useForm({
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const [login] = useLogin();

  const navigation = useNavigate();

  const submit = async ({ email, password }: AuthUsers) => {
    const { data } = await login({
      variables: {
        auth: {
          email,
          password,
        },
      },
      onCompleted(data) {
        console.log(data);
      },
    });

    if (data) {
      const { user, access_token } = data.login;
      console.log(user, access_token);
      // здесь мы должны сохранить пользвателя и токен
      // navigation(routes.root);
    }
  };

  return (
    <>
      <Box
        onSubmit={handleSubmit(submit)}
        component={"form"}
        sx={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          width: "30vw",
          gap: "1rem",
        }}
      >
        <h1 style={{ fontFamily: "Roboto, Helvetica, Arial, sans-serif" }}>
          Hello!
        </h1>
        <TextField
          label={"Email"}
          autoFocus
          {...register("email", {
            validate: (val: string) => {
              if (!val) {
                return "Enter email";
              }
            },
          })}
          error={!!errors.email}
          helperText={errors.email?.message || ""}
        />
        <TextField
          label={"Password"}
          type={vision ? "password" : "text"}
          InputProps={{
            endAdornment: (
              <IconButton onClick={passwordVision}>
                {vision ? <Visibility /> : <VisibilityOff />}
              </IconButton>
            ),
          }}
          {...register("password", {
            validate: (val: string) => {
              if (!val) {
                return "Enter password";
              }
            },
          })}
          error={!!errors.password}
          helperText={errors.password?.message || ""}
        />
        <Button type="submit" variant="contained">
          Sign in
        </Button>
        <Button
          type="button"
          sx={{ mt: 2 }}
          onClick={() => navigation(routes.auth.signup)}
        >
          {"I don't have an account"}
        </Button>
      </Box>
    </>
  );
};
