import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import { routes } from "../../constants/routes";
import { Auth } from "../pages/auth/auth";
import { Login } from "../pages/login/login";
import { Signup } from "../pages/signup/signup";
import { Users } from "../pages/users/users";
import { UserUi } from "../pages/user-profile/UserUi";
import { MenuDescription } from "../pages/user/user";
import { MenuAppBar } from "../pages/menuAppBar/menuAppBar";
import { CheckRegistr } from "../pages/checkRegistr/checkRegistr";
import { NavPanel } from "../pages/NavPanel/NavPanel";
import { Cvs } from "../pages/cvs/cvs";
import { Projects } from "../pages/projects/projects";
import { Departments } from "../pages/departments/departments";
import { Positions } from "../pages/positions/positions";
import { Skills } from "../pages/skills/skills";
import { Languages } from "../pages/languages/languages";
import { UserCvs } from "../pages/user-cvs/user-cvs";

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
                <Route path={routes.users.user} element={<MenuDescription tabsNavigates={[
                  {value:"profile",label:"Профиль"},
                  {value:"skills",label:"Навыки"} ,
                  {value:"languages",label:"Языки"},
                  {value:"cvs",label:"Резюме"}
                ]} />} >

                  <Route path={routes.users.profile} element={<UserUi />} />
                  <Route path={routes.users.skills} element={<h1>Навыки</h1>} />
                  <Route path={routes.users.languages} element={<h1>Языки</h1>} />
                  <Route path={routes.users.cvs} element={<UserCvs/>} />

                </Route>
                <Route path={routes.projects.root} element={<Projects/>} />
                <Route path={routes.projects.project} element={<h1>Подробнее</h1>} />

                <Route path={routes.cvs.root} element={<Cvs />} />
                <Route path={routes.cvs.cv} element={<MenuDescription tabsNavigates={[
                  {value:"details",label:"Подробности"},
                  {value:"skills",label:"Навыки"} ,
                  {value:"projects",label:"Проекты"},
                  {value:"preview",label:"Просмотр"}
                ]} />} >

                  <Route path={routes.cvs.details} element={<h1>Подробности</h1>} />
                  <Route path={routes.cvs.skills} element={<h1>Навыки</h1>} />
                  <Route path={routes.cvs.projects} element={<h1>g</h1>} />
                  <Route path={routes.cvs.preview} element={<h1>Просмотр</h1>} />

                </Route>

                <Route path={routes.departments} element={<Departments/>} />
                <Route path={routes.positions} element={<Positions/>} />
                <Route path={routes.skills} element={<Skills/>} />
                <Route path={routes.languages} element={<Languages />} />
              </Route >
              <Route path="*" element={<Navigate to={routes.users.root} />} />
            </Route>
          </Route>
        </Routes>
      </BrowserRouter>
    </>
  );
};
