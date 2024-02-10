import { gql, useQuery } from "@apollo/client";
import { Spa } from "@mui/icons-material";
import { User } from "cv-graphql"
import { Link } from "react-router-dom";

const USERS = gql`
  query Users {
    users {
      id
      
      email
  
    }
  }
`;

export const Users = () => {
    const { loading, data } = useQuery<{ users: [User] }>(USERS);
    console.log(data);
    

    if(loading){
    return (<h1>...Загрузка</h1>)
    }

    return (
        <>
            <span>Users</span>
            {
data?.users.map(user=>{
    return (
        <>
    <br />
    <Link to={user.id} key={user.id}>{user.email}</Link>
    </>)
})

            }
        </>
    );
};
