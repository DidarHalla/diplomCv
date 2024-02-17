import { Visibility, VisibilityOff } from "@mui/icons-material";
import { Box, Button, IconButton, TextField } from "@mui/material";
import { useCallback, useEffect, useState } from "react";
import { routes } from "../../../constants/routes";
import { useNavigate } from "react-router-dom";
import { AuthUsers } from "../pages.types";
import { useForm } from "react-hook-form";
import { useLazyQuery } from "@apollo/client";

import { LOGIN } from "../../../apollo client/query";
import { authResult } from "../../../apollo client/client";

export const Login: React.FC = () => {
  const [vision, setVision] = useState(true);
  const passwordVision = useCallback(() => {
    setVision((prev) => !prev);
  }, []);

  const {
    formState: { errors }, // state errors forms
    register,
    handleSubmit,
    // setError,
  } = useForm({
    defaultValues: {
      email: "",
      password: "",
    },
  });

  // useEffect(() => {
  //   setError("email", { type: "validate" });
  //   setError("password", { type: "validate" });
  // }, [setError]);

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
      authResult({ access_token, user }); // здесь сохраняем пользвателя и токен
      localStorage.setItem("token", access_token);
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

        {/* {errors.email && <span>{errors.email.message}</span>} */}
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
        {/* {errors.password && <span>{errors.password.message}</span>} */}
        <Button type="submit" variant="contained">
          Login
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
