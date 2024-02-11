import { Visibility, VisibilityOff } from "@mui/icons-material";
import { Box, Button, IconButton, TextField } from "@mui/material";
import { routes } from "../../../constants/routes";
import { useNavigate } from "react-router-dom";
import { useCallback, useState } from "react";
import { AuthUsers } from "../pages.types";
import { useSignup } from "../../../apollo client/authHooks/auth.hooks";
import { useForm } from "react-hook-form";

export const Signup = () => {
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

  const navigation = useNavigate();
  const [signup, { error, loading, data }] = useSignup();
  const submit = async ({ email, password }: AuthUsers) => {
    const { data } = await signup({
      variables: {
        auth: {
          email,
          password,
        },
      },
    });
    if (data) {
      //   const { user, access_token } = data.signup;
      // здесь мы должны сохранить пользвателя и токен
      navigation(routes.root);
    }
  };
  return (
    <>
      <Box
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
          Register Now
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
        />
        <Button type="submit" variant="contained">
          Sign in
        </Button>
        <Button
          type="button"
          sx={{ mt: 2 }}
          onClick={() => navigation(routes.auth.login)}
        >
          {"I have an account"}
        </Button>
      </Box>
    </>
  );
};
