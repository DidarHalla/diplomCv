import { gql,useQuery } from "@apollo/client";
import { useParams } from "react-router-dom";

export const User=()=>{
    const {userId}=useParams()
    console.log(userId);
    
    const USER = gql`
    query User($userId:ID!){
        user(userId:$userId){
          email
          profile{
            avatar  
          }
        }
      }
`;
const { loading, data } = useQuery(USER,{variables:{userId:userId}});

console.log(data);

    return (
        <>
        <span>user</span>
        </>
    )
}