import {  useReactiveVar } from "@apollo/client";
import { Navigate, Outlet } from "react-router-dom";
import { authReactive } from "../../../graphql/authReactive/authReactive";


export const CheckRegistr: React.FC = () => {
 

    

  const authToken = useReactiveVar(authReactive.getAuth().token$);

  if (authToken) {
    return <Outlet />;
  }

  return <Navigate to="/auth/login" />;
};
