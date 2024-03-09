import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import { routes } from "../../constants/routes";
import { Auth } from "../pages/auth/auth";
import { Login } from "../pages/login/login";
import { Signup } from "../pages/signup/signup";
import { Users } from "../pages/users/users";
import { UserUi } from "../pages/user-profile/UserUi";
import { User } from "../pages/user/user";
import { MenuAppBar } from "../pages/menuAppBar/menuAppBar";
import { CheckRegistr } from "../pages/checkRegistr/checkRegistr";
import { NavPanel } from "../pages/NavPanel/NavPanel";
import { UserSkills } from "../pages/user-skills/user-skills";

export const Router: React.FC = () => {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path={routes.auth.root} element={<Auth />}>
            <Route path={routes.auth.login} element={<Login />} />
            <Route path={routes.auth.signup} element={<Signup />} />
          </Route>
          <Route element={<CheckRegistr />}>
            <Route element={<MenuAppBar />}>
              <Route element={<NavPanel />}>
                <Route path={routes.settings} element={<h2>Настройки</h2>} />
                <Route path={routes.users.root} element={<Users />} />
                <Route path={routes.users.user} element={<User />}>
                  <Route path={routes.users.profile} element={<UserUi />} />
                  <Route path={routes.users.skills} element={<UserSkills />} />
                  <Route
                    path={routes.users.languages}
                    element={<h1>Языки</h1>}
                  />
                  <Route path={routes.users.cvs} element={<h1>Резюме</h1>} />
                </Route>
                <Route path={routes.projects.root} element={<h2>Проекты</h2>} />
                <Route path={routes.cvs.root} element={<h2>Резюме</h2>} />
                <Route path={routes.departments} element={<h2>Отделы</h2>} />
                <Route path={routes.positions} element={<h2>Должности</h2>} />
                <Route path={routes.skills} element={<h2>Навыки</h2>} />
                <Route path={routes.languages} element={<h2>Языки</h2>} />
              </Route>
              <Route path="*" element={<Navigate to={routes.users.root} />} />
            </Route>
          </Route>
        </Routes>
      </BrowserRouter>
    </>
  );
};
