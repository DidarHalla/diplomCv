import { BrowserRouter, Route, Routes } from "react-router-dom";
import { routes } from "../../constants/routes";
import { Auth } from "../pages/auth/auth";
import { Login } from "../pages/login/login";

export const Router = () => {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path={routes.auth.root} element={<Auth />}></Route>
          <Route path={routes.auth.login} element={<Login />}></Route>
        </Routes>
      </BrowserRouter>
    </>
  );
};
