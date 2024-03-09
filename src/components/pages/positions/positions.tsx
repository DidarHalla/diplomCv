import { useState } from "react";
import { TableUI } from "../../templates/table/table.template";
import { usePositions } from "../../../hooks/use-position";
import { createHederTable } from "../../helpers/createHederTable.helper";
import { headCellsPositions } from "../../../constants/headCells"; 
import { PositionsTableDdialogButton } from "../../atoms/positionsTableDdialog-button/positionsTableDdialog-button";



export const Positions=()=>{
    const [search, setSearch] = useState("");
    const { positions, loading } = usePositions();
    const rows =positions?.positions?.map((position) => {
      return createHederTable(
        position.id,
        position.name,
      
      )
    }) ?? [];

    return (
        <TableUI 
        TableDdialogButton={PositionsTableDdialogButton}
        data={positions?.positions ??  [] }
        headCells={headCellsPositions}
        loading={loading}
        rows={rows}
        search={search}
        setSearch={setSearch}
        
        />
    )

}