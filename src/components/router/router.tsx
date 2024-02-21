import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import { routes } from "../../constants/routes";
import { Auth } from "../pages/auth/auth";
import { Login } from "../pages/login/login";
import { Signup } from "../pages/signup/signup";
import { Layout } from "./layout";
import { Users } from "../pages/users/users";
import { UserUi } from "../pages/user-profile/UserUi";
import { User } from "../pages/user/user";
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



            <Route path={routes.users.user} element={<User />} >
              <Route path={routes.users.profile} element={<UserUi />} />
              <Route path={routes.users.skills} element={<h1>Навыки</h1>} />
              <Route path={routes.users.languages} element={<h1>Языки</h1>} />
              <Route path={routes.users.cvs} element={<h1>Резюме</h1>} />

            </Route>

          </Route>
          <Route path="*" element={<Navigate to={routes.users.root} />} />
        </Routes>
      </BrowserRouter>
    </>
  );
};
