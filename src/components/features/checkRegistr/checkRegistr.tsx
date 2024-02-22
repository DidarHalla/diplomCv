import { makeVar, useReactiveVar } from "@apollo/client";
import { Navigate, Outlet } from "react-router-dom";

export const tokenVar = makeVar("");

export const CheckRegistr: React.FC = () => {
  const token = localStorage.getItem("token");

  tokenVar(token ?? "");

  const authToken = useReactiveVar(tokenVar);

  if (authToken) {
    return <Outlet />;
  }

  return <Navigate to="/auth/login" />;
};
