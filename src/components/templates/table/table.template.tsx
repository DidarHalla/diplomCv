import { TableProps } from "./table.types";
import { useState } from "react";

import Box from "@mui/material/Box";
import Table from "@mui/material/Table";
import TableContainer from "@mui/material/TableContainer";
import Paper from "@mui/material/Paper";
import { TableHeadUI } from "../../organisms/tableHead/tableHead.organism";
import { TablePaginations } from "../../molecules/TablePaginations/tablePaginations.molecule";
import { TableBodyOrganism } from "../../organisms/tableBody/tableBody.organism";
import { SearchTable } from "../../atoms/searchTable/searchTable.atom";
import { UsersTableDdialog } from "../../dialogs/usersTable.dialog";


type Order = "asc" | "desc";

export function TableUI(props: TableProps) {
  const { loading, headCells, rows, search, setSearch, data,TableDdialogButton } = props;
  
  const [order, setOrder] = useState<Order>("asc");
  const [orderBy, setOrderBy] = useState(1);
  const [selected, setSelected] = useState<number | null>(null);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);

  const [anchorPos, setAnchorPos] = useState({ top: 0, left: 0 });

  if (loading) {
    return <>Загрузка</>;
  }

  return (
    <Box sx={{ width: "100%", mt: "20px" }}>
      <Paper sx={{ width: "100%", mb: 2 }}>
        <SearchTable setSearch={setSearch} search={search} />

        <TableContainer>
          <UsersTableDdialog
            anchorPos={anchorPos}
            selected={selected}
            setSelected={setSelected}
            TableDdialogButton={TableDdialogButton}
          />

          <Table
            stickyHeader
            sx={{ minWidth: 750, tableLayout: "fixed" }}
            aria-labelledby="sticky table"
            size={"medium"}
          >
            <TableHeadUI
              headCells={headCells}
              order={order}
              orderBy={orderBy}
              setOrderBy={setOrderBy}
              setOrder={setOrder}
            />

            <TableBodyOrganism
              selected={selected}
              setSelected={setSelected}
              page={page}
              rows={rows}
              rowsPerPage={rowsPerPage}
              order={order}
              orderBy={orderBy}
              search={search}
              setAnchorPos={setAnchorPos}
              data={data}
            />
          </Table>
        </TableContainer>
        <TablePaginations
          page={page}
          rows={rows}
          rowsPerPage={rowsPerPage}
          setPage={setPage}
          setRowsPerPage={setRowsPerPage}
        />
      </Paper>
    </Box>
  );
}
