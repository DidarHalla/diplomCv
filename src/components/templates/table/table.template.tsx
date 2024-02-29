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
import { Button, Popover } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useUserDialog } from "../../organisms/forms/formUser";

type Order = "asc" | "desc";

export function TableUI(props: TableProps) {
  const { loading, headCells, rows, search, setSearch, userId } = props;

  const [order, setOrder] = useState<Order>("asc");
  const [orderBy, setOrderBy] = useState(1);
  const [selected, setSelected] = useState<number | null>(null);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);

  const [anchorPos, setAnchorPos] = useState({ top: 0, left: 0 });

  const navigate = useNavigate();

  const handleClose = () => {
    setSelected(null);
  };
  const [openUserDialog] = useUserDialog();
  const open = Boolean(selected);

  const id = open ? "simple-popover" : undefined;

  const is_verified = +userId === selected;

  if (loading) {
    return <>Загрузка</>;
  }

  const handleUpdate = () => {
    openUserDialog({ userId });
  };

  return (
    <Box sx={{ width: "100%", mt: "20px" }}>
      <Paper sx={{ width: "100%", mb: 2 }}>
        <SearchTable setSearch={setSearch} search={search} />

        <TableContainer>
          <Popover
            id={id}
            open={open}
            onClose={handleClose}
            anchorReference="anchorPosition"
            anchorPosition={anchorPos}
            anchorOrigin={{
              vertical: "top",
              horizontal: "left",
            }}
            transformOrigin={{
              vertical: "top",
              horizontal: "left",
            }}
          >
            <Button
              variant="contained"
              onClick={() => {
                navigate("" + selected);
              }}
              sx={{ display: "block", width: 100 + "%" }}
            >
              Профиль
            </Button>
            <Button
              disabled={!is_verified}
              variant="contained"
              sx={{ display: "block", width: 100 + "%" }}
              onClick={handleUpdate}
            >
              Обновить пользователя
            </Button>{" "}
            <Button
              disabled={true}
              variant="contained"
              sx={{ display: "block", width: 100 + "%" }}
            >
              Удалить пользователя
            </Button>
          </Popover>

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
