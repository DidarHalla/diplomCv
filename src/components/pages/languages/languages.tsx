import { useState } from "react";
import { createHederTable } from "../../helpers/createHederTable.helper";
import { TableUI } from "../../templates/table/table.template";
import { LanguagesTableDdialogButton } from "../../atoms/languagesTableDdialog-button/languagesTableDdialog-button";
import { headCellsLanguages } from "../../../constants/headCells";
import { useLanguages } from "../../../hooks/use-languages";




export const Languages=()=>{
    const [search, setSearch] = useState("");
    const { languages, loading } = useLanguages();
    const rows =languages?.languages?.map((language) => {
      return createHederTable(
        language.id,
        language.name,
      )
    }) ?? [];

    return (
        <TableUI
        TableDdialogButton={LanguagesTableDdialogButton}
        data={languages?.languages ??  [] }
        headCells={headCellsLanguages}
        loading={loading}
        rows={rows}
        search={search}
        setSearch={setSearch}
        
        />
    )

}