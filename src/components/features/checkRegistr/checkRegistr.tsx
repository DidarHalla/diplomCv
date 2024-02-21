import { useReactiveVar } from "@apollo/client";
import { Navigate, Outlet } from "react-router-dom";
import { authResult } from "../../../apollo client/client";

export const CheckRegistr: React.FC = () => {
  const authToken = useReactiveVar(authResult);

  if (authToken) {
    return <Outlet />;
  }

  return <Navigate to="/auth/login" />;
};
