import { BrowserRouter, Route, Routes } from "react-router-dom";
import { routes } from "../../constants/routes";
import { Auth } from "../pages/auth/auth";
import { Login } from "../pages/login/login";
import { Signup } from "../pages/signup/signup";

export const Router = () => {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path={routes.auth.root} element={<Auth />}></Route>
          <Route path={routes.auth.login} element={<Login />}></Route>
          <Route path={routes.auth.signup} element={<Signup />}></Route>
        </Routes>
      </BrowserRouter>
    </>
  );
};
