import { TableUI } from "../../templates/table/table.template";
import { headCellsUsers } from "../../../constants/headCells"; 
import Avatar from "@mui/material/Avatar";
import Stack from "@mui/material/Stack";
import { useState } from "react";
import { createHederTable } from "../../helpers/createHederTable.helper";
import { useUsers } from "../../../hooks/use-users";
import { UsersTableDdialogButton } from "../../atoms/usersTableDdialog-button/UsersTableDdialog-button";

export function Users() {
  const [search, setSearch] = useState("");
  const { users, loading } = useUsers();

  const rows =
    users?.users?.map((user) => {
      return createHederTable(
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

  if (loading) {
    return <>загрузка</>;
  }

  return (
    <>
      <TableUI

        TableDdialogButton={UsersTableDdialogButton}
        search={search}
        setSearch={setSearch}
        rows={rows}
        data={users?.users ??  [] }
        loading={loading}
        headCells={headCellsUsers}
        
      />
    </>
  );
}
