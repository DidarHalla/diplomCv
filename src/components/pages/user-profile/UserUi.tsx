import { useQuery } from "@apollo/client";
import { useParams } from "react-router-dom";
import { UserProfilePage } from "./UserProfilePage";
import { User } from "cv-graphql";
import { USER } from "../../../graphql/user";

export const UserUi = () => {
  const { userId } = useParams();

  
  const { loading, data } = useQuery<{ user: User }>(USER, {
    variables: { userId: userId },
  });

  if (loading) {
    return <div>zagruzka...</div>;
  }
  return (
    <>
      <UserProfilePage user={data} />
      <span>user</span>
    </>
  );
};
