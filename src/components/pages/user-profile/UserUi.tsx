import { useParams } from "react-router-dom";
import { UserProfilePage } from "./UserProfilePage";
import { useUser } from "../../../hooks/use-users";
import { authReactive } from "../../../graphql/authReactive/authReactive";

export const UserUi = () => {
  const { userId } = useParams();
  const { user } = useUser(userId);
  const isOwner = authReactive.getAuth().user$()?.id === user?.id;

  return (
    <>
      <UserProfilePage user={user} owner={isOwner} />
    </>
  );
};
