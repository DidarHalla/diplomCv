import { useParams } from "react-router-dom";
import { UserProfilePage } from "./UserProfilePage";
import { useUser } from "../../../hooks/use-users";



export const UserUi = () => {
  const { userId } = useParams();
  const { user } = useUser(userId)
  
  return (
    <>
      <UserProfilePage user={user} />
    </>
  );
};
