import { Visibility, VisibilityOff } from "@mui/icons-material";
import { Box, Button, IconButton, TextField } from "@mui/material";
import { routes } from "../../../constants/routes";
import { useNavigate } from "react-router-dom";
import { useCallback, useState } from "react";
import { AuthUsers } from "../auth/pages.types";
import { useForm } from "react-hook-form";
import { useMutation } from "@apollo/client";
import { SIGN_NUP } from "../../../graphql/auth/mutation";
import { authReactive } from "../../../graphql/authReactive/authReactive";

export const Signup: React.FC = () => {
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
  const [vision, setVision] = useState(true);
  const passwordVision = useCallback(() => {
    setVision((prev) => !prev);
  }, []);

  const navigation = useNavigate();
  const [signup] = useMutation(SIGN_NUP);
  const submit = async ({ email, password }: AuthUsers) => {
    const { data } = await signup({
      variables: {
        email,
        password,
      },
    });
    if (data) {
      const { user, access_token } = data.signup;
      authReactive.setAuth(access_token, user);
      navigation(routes.root);
    }
  };
  return (
    <>
      <Box
        onSubmit={handleSubmit(submit)}
        component={"form"}
        sx={{
          marginTop: "10rem",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          width: "30vw",
          gap: "1rem",
        }}
      >
        <h1 style={{ fontFamily: "Verdana" }}>Register Now</h1>
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
          helperText={errors.email?.message}
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
          helperText={errors.password?.message}
        />
        <Button type="submit" variant="contained">
          Sign in
        </Button>
        <Button
          type="button"
          sx={{ mt: 2 }}
          onClick={() => navigation(routes.auth.login)}
        >
          I have an account
        </Button>
      </Box>
    </>
  );
};
