import { gql, useQuery } from "@apollo/client";
import { User } from "cv-graphql";


import { TableUI } from "../../templates/table/table.templates";
import { Data, HeadCell } from "./users.types";
import Avatar from '@mui/material/Avatar';
import Stack from '@mui/material/Stack';





const USERS = gql`
  query Users {
    users {
      id
      
      email
      department_name
      position_name
      profile{
        avatar  
        first_name
        last_name
        
      }
  
    }
  }
`;






export function Users() {

  const { loading, data } = useQuery<{ users: [User] }>(USERS)

  const headCells: readonly HeadCell[] = [
    {
      id: '0',
      numeric: false,
      disablePadding: false,
      label: '',
    },
    {
      id: '1',
      numeric: true,
      disablePadding: false,
      label: 'First Name',
    },
    {
      id: '2',
      numeric: true,
      disablePadding: false,
      label: 'Last Name',
    },
    {
      id: '3',
      numeric: true,
      disablePadding: false,
      label: 'Email',
    },
    {
      id: '4',
      numeric: true,
      disablePadding: false,
      label: 'Department',
    },
    {
      id: '5',
      numeric: true,
      disablePadding: false,
      label: 'Position',
    },
  ];
  function createData(
    id: string,
    avatar: JSX.Element,
    first_name: string,
    last_name: string,
    email: string,
    department_name:string,
    position_name:string
    
  ): Data {
    return {id:id,data:[
      avatar,
      first_name,
      last_name,
      email,
      department_name,
      position_name
    ]};
  }

  const rows = data?.users?.map(user => {
    return createData( user.id,  
    <Stack direction="row" spacing={2}>
    <Avatar src={user.profile.avatar??""}></Avatar>

  </Stack>, user.profile.first_name??"", user.profile.last_name??"", user.email,user.department_name??"",user.position_name??"")
}) ?? []

  if (loading) { return <>загрузка</> }

  return <TableUI
  
    rows={rows}
    data={data ?? { users: [] }}
    loading={loading}
    headCells={headCells} />

}