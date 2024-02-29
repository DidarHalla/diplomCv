import { useParams } from "react-router-dom";
import { UserProfilePage } from "./UserProfilePage";
import { useUser } from "../../../hooks/use-users";



export const UserUi = () => {
  const { userId } = useParams();
  const { user, loading } = useUser(userId)

  if (loading || !user) {
    return <div>Загрузка...</div>;
  }
  
  return (
    <>
      <UserProfilePage user={user} />
    </>
  );
};
