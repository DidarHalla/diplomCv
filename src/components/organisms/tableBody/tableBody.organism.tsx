import { TableBody, TableCell, TableRow } from "@mui/material";
import { useMemo } from "react";
import { stableSort, getComparator } from '../../helpers/table-sort.helper';
import { TableRowsMolecule } from "../../molecules/tableRows/tableRows.molecule";
import { TableBodyProps } from "./tableBody.types";
import { matchSorter } from "match-sorter";
import { Data } from "../../pages/users/users.types";



export const TableBodyOrganism = (props: TableBodyProps) => {

    const { selected, setSelected, page, rows, rowsPerPage, order, orderBy,search,setAnchorPos } = props
   
    // Avoid a layout jump when reaching the last page with empty rows.
    const emptyRows =
        page > 0 ? Math.max(0, (1 + page) * rowsPerPage - rows.length) : 0;

        const filteredRows:Data[]=useMemo(
            ()=>{
                let filter= rows.map((row)=>row.data.concat(row.id))
                filter=matchSorter(filter,search,{keys:Object.keys(filter)});
              const  filtered=filter.map(row=>{
                   return {
                        id:row[row.length-1] as string,
                        data:row.slice(0,row.length-1)
                    }
                })
                
                
                return filtered
            },
              [order, orderBy, page, rowsPerPage,search]
        )

    const sortedRows = useMemo(
        () =>
            stableSort(filteredRows, getComparator(order, orderBy)).slice(
                page * rowsPerPage,
                page * rowsPerPage + rowsPerPage,
            ),
        [order, orderBy, page, rowsPerPage,search]
    );
   

    return (
        <TableBody>
            {sortedRows.map((row) => {
               
                return (
                    <TableRowsMolecule setAnchorPos={setAnchorPos} setSelected={setSelected} row={row} selected={selected} >
                        {row.data.map((cell, ind) => {
                            return <TableCell key={ind} align="right" >{cell}</TableCell>
                        })}
                   </ TableRowsMolecule >
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
    )
}