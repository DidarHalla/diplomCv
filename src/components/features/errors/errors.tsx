import { useCallback } from "react";
import { errorMessage } from "../../../apollo client/authHooks/auth.hooks";
import { useReactiveVar } from "@apollo/client";
import { Alert } from "@mui/material";

export const AlertError = () => {
  const errors = useReactiveVar(errorMessage);
  const handleClose = useCallback((id: number) => {
    return () => errors.filter((err) => err.id !== id);
  }, []);

  return (
    <>
      {errors.map(({ id, type, message }) => (
        <Alert
          key={id}
          sx={{
            position: "fixed",
            zIndex: 1500,
            top: 50,
            left: "auto",
            width: 520,
          }}
          severity={type}
          onClose={handleClose(id)}
        >
          {message}
        </Alert>
      ))}
    </>
  );
};
