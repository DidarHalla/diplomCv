import { useState } from "react";
import { useCVs } from "../../../hooks/use-cvs"
import { TableUI } from "../../templates/table/table.template"
import { headCellsCvs } from "../../../constants/headCells"; 
import { createHederTable } from "../../helpers/createHederTable.helper";
import { CvsTableDdialogButton } from "../../atoms/cvsTableDdialog-button/cvsTableDdialog-button";

export const Cvs=()=>{
    const [search, setSearch] = useState("");
    const { cvs, loading } = useCVs();
    const rows =cvs?.cvs?.map((cv) => {
      return createHederTable(
        cv.id,
        cv.name,
        cv.description.slice(0,100),
        cv.user?.email ?? ""
      )
    }) ?? [];

    return (
        <TableUI 
        TableDdialogButton={CvsTableDdialogButton}
        data={cvs?.cvs ??  [] }
        headCells={headCellsCvs}
        loading={loading}
        rows={rows}
        search={search}
        setSearch={setSearch}
        
        />
    )

}