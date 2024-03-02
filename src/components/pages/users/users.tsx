import { TableUI } from "../../templates/table/table.template";
import { headCellsUsers } from "../../../constants/tableHead.constant";
import Avatar from "@mui/material/Avatar";
import Stack from "@mui/material/Stack";
import { useState } from "react";
import { createHederUsers } from "../../helpers/createHederUsers.helper";
import { useUsers } from "../../../hooks/use-users";

export function Users() {
  const [search, setSearch] = useState("");
  const { users, loading } = useUsers();

  const rows =
    users?.users?.map((user) => {
      return createHederUsers(
        user.id,
        <Stack direction="row" spacing={2}>
          <Avatar src={user.profile.avatar ?? ""}></Avatar>
        </Stack>,
        user.profile.first_name ?? "",
        user.profile.last_name ?? "",
        user.email,
        user.department_name ?? "",
        user.position_name ?? ""
      );
    }) ?? [];
  const userId: string = JSON.parse(localStorage.getItem("user") ?? "null").id;

  if (loading) {
    return <>загрузка</>;
  }

  return (
    <>
      <TableUI
        search={search}
        setSearch={setSearch}
        rows={rows}
        data={users ?? { users: [] }}
        loading={loading}
        userId={userId}
        headCells={headCellsUsers}
      />
    </>
  );
}
