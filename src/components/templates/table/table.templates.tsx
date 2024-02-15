import { TableProps } from './table.types';
import { useMemo, useState } from 'react';


import Box from '@mui/material/Box';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { TableHeadUI } from "../../organisms/tableHead/tableHead.organisms";
import { TablePaginations } from "../../organisms/TablePaginations/tablePaginations.organisms";

import { Data } from "../../pages/users/users.types";





function descendingComparator<T extends Data>(a: T, b: T, orderBy: number) {
    if (b.data[orderBy] < a.data[orderBy]) {
        return -1;
    }
    if (b.data[orderBy] > a.data[orderBy]) {
        return 1;
    }
    return 0;
}

type Order = 'asc' | 'desc';

function getComparator<Key extends number >(
    order: Order,
    orderBy: Key,
): (
    a: Data,
    b: Data,
) => number {
    return order === 'desc'
        ? (a, b) => descendingComparator(a, b, orderBy)
        : (a, b) => -descendingComparator(a, b, orderBy);
}

// Since 2020 all major browsers ensure sort stability with Array.prototype.sort().
// stableSort() brings sort stability to non-modern browsers (notably IE11). If you
// only support modern browsers you can replace stableSort(exampleArray, exampleComparator)
// with exampleArray.slice().sort(exampleComparator)
function stableSort<T extends Data>(array: readonly T[], comparator: (a: T, b: T) => number) {
    console.log(array);
    
    const stabilizedThis = array.map((el, index) => [el, index] as [T, number]);
    stabilizedThis.sort((a, b) => {
        const order = comparator(a[0], b[0]);
        if (order !== 0) {
            return order;
        }
        return a[1] - b[1];
    });

    return stabilizedThis.map((el) => el[0]);
    
}







export function TableUI(props: TableProps) {
    const {  loading, headCells, rows } = props





    const [order, setOrder] = useState<Order>('asc');
    const [orderBy, setOrderBy] = useState(1);
    const [selected, setSelected] = useState<readonly number[]>([]);
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(5);





    const handleClick = (event: React.MouseEvent<unknown>, id: number) => {
        const selectedIndex = selected.indexOf(id);
        let newSelected: readonly number[] = [];

        if (selectedIndex === -1) {
            newSelected = newSelected.concat(selected, id);
        } else if (selectedIndex === 0) {
            newSelected = newSelected.concat(selected.slice(1));
        } else if (selectedIndex === selected.length - 1) {
            newSelected = newSelected.concat(selected.slice(0, -1));
        } else if (selectedIndex > 0) {
            newSelected = newSelected.concat(
                selected.slice(0, selectedIndex),
                selected.slice(selectedIndex + 1),
            );
        }

        setSelected(newSelected);
    };







    const isSelected = (id: number) => selected.indexOf(id) !== -1;

    // Avoid a layout jump when reaching the last page with empty rows.
    const emptyRows =
        page > 0 ? Math.max(0, (1 + page) * rowsPerPage - rows.length) : 0;

    const visibleRows = useMemo(
        () =>
            stableSort(rows, getComparator(order, orderBy)).slice(
                page * rowsPerPage,
                page * rowsPerPage + rowsPerPage,
            ),
        [order, orderBy, page, rowsPerPage],
    );

    if (loading) { return <>Загрузка</> }


    return (
        <Box sx={{ width: '100%' }}>
            <Paper sx={{ width: '100%', mb: 2 }}>

                <TableContainer>
                    <Table
                    stickyHeader 
                        sx={{ minWidth: 750 ,tableLayout:"fixed"}}
                        aria-labelledby="sticky table"
                        size={'medium'}
                    >
                        <TableHeadUI
                            headCells={headCells}
                            order={order}
                            orderBy={orderBy}
                            setOrderBy={setOrderBy}
                            setOrder={setOrder}


                        />
                        <TableBody>
                            {visibleRows.map((row) => {
                                const isItemSelected = isSelected(+row.id);

                                return (
                                    <TableRow
                                        hover
                                        onClick={(event) => {

                                            return handleClick(event, +row.id)
                                        }}
                                        role="checkbox"
                                        aria-checked={isItemSelected}
                                        tabIndex={-1}
                                        key={row.id}
                                        selected={isItemSelected}
                                        sx={{ cursor: 'pointer' }}
                                    >

                                      {row.data.map(v=>{
                                        return  <TableCell align="right" >{v}</TableCell>
                                      })}
                                      
                                       
                                    </TableRow>
                                );
                            })}
                            {emptyRows > 0 && (
                                <TableRow
                                    style={{
                                        height: (53) * emptyRows,
                                    }}
                                >
                                    <TableCell colSpan={6} />
                                </TableRow>
                            )}
                        </TableBody>
                    </Table>
                </TableContainer>
                <TablePaginations
                    page={page}
                    rows={rows}
                    rowsPerPage={rowsPerPage}
                    setPage={setPage}
                    setRowsPerPage={setRowsPerPage} />

            </Paper>

        </Box>
    );
}