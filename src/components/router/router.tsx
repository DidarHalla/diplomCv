import { BrowserRouter, Route, Routes } from "react-router-dom";
import { routes } from "../../constants/routes";
import { Auth } from "../pages/auth/auth";
import { Login } from "../pages/login/login";
import { Users } from "../pages/users/users";
import { UserUi } from "../pages/user/UserUi";
export const Router = () => {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path={routes.auth.root} element={<Auth />}>

            <Route path={routes.auth.login} element={<Login />}/>
          
          </Route>

          <Route path={routes.users.root} element={<Users />}/>

          <Route path={routes.users.user} element= {<UserUi />}/> 
            

       
         
     
        </Routes>
      </BrowserRouter>
    </>
  );
};
