import { useState } from "react";
import { TableUI } from "../../templates/table/table.template";
import { useDepartaments } from "../../../hooks/use-departaments";
import { createHederTable } from "../../helpers/createHederTable.helper";
import { DepartmentsTableDdialogButton } from "../../atoms/departmentsTableDdialog-button/departmentsTableDdialog-button";
import { headCellsDepartments } from "../../../constants/headCells";




export const Departments=()=>{
    const [search, setSearch] = useState("");
    const { departments, loading } = useDepartaments();
    const rows =departments?.departments?.map((department) => {
      return createHederTable(
        department.id,
        department.name,
      )
    }) ?? [];

    return (
        <TableUI 
        TableDdialogButton={DepartmentsTableDdialogButton}
        data={departments?.departments ??  [] }
        headCells={headCellsDepartments}
        loading={loading}
        rows={rows}
        search={search}
        setSearch={setSearch}
        
        />
    )

}