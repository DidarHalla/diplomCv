import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import { routes } from "../../constants/routes";
import { Auth } from "../pages/auth/auth";
import { Login } from "../pages/login/login";
import { Signup } from "../pages/signup/signup";
import { Layout } from "./layout";
import { Users } from "../pages/users/users";

export const Router: React.FC = () => {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path={routes.auth.root} element={<Auth />}>
            <Route path={routes.auth.login} element={<Login />} />
            <Route path={routes.auth.signup} element={<Signup />} />
          </Route>
          <Route element={<Layout />}>
            <Route path={routes.users.root} element={<Users />} />
          </Route>
          <Route path="*" element={<Navigate to={routes.users.root} />} />
        </Routes>
      </BrowserRouter>
    </>
  );
};
