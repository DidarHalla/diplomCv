import { Visibility, VisibilityOff } from "@mui/icons-material";
import { Box, Button, IconButton, TextField } from "@mui/material";
import { useCallback, useState } from "react";
import { routes } from "../../../constants/routes";
import { useNavigate } from "react-router-dom";
import { AuthUsers } from "../auth/pages.types";
import { useForm } from "react-hook-form";
import { useLazyQuery } from "@apollo/client";

import { LOGIN } from "../../../graphql/auth/query";
import { authReactive } from "../../../graphql/authReactive/authReactive";

export const Login: React.FC = () => {
  const [vision, setVision] = useState(true);
  const passwordVision = useCallback(() => {
    setVision((prev) => !prev);
  }, []);

  const {
    formState: { errors },
    register,
    handleSubmit,
  } = useForm({
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const [login] = useLazyQuery(LOGIN);

  const navigation = useNavigate();

  const submit = async ({ email, password }: AuthUsers) => {
    const { data } = await login({
      variables: {
        email,
        password,
      },
    });

    if (data) {
      const { user, access_token } = data.login;
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
        <h1 style={{ fontFamily: "Verdana" }}>Hello!</h1>
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
            validate: (val) => {
              if (!val) {
                return "Enter password";
              }
            },
          })}
          error={!!errors.password}
          helperText={errors.password?.message}
        />
        <Button type="submit" variant="contained">
          Login
        </Button>
        <Button
          type="button"
          sx={{ mt: 2 }}
          onClick={() => navigation(routes.auth.signup)}
        >
          I don't have an account
        </Button>
      </Box>
    </>
  );
};
