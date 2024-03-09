import { useState } from "react";
import { createHederTable } from "../../helpers/createHederTable.helper";
import { TableUI } from "../../templates/table/table.template";
import { useSkills } from "../../../hooks/use-skills";
import { headCellsSkills } from "../../../constants/headCells";
import { SkillsTableDdialogButton } from "../../atoms/skillsTableDdialog-button/skillsTableDdialog-button";




export const Skills=()=>{
    const [search, setSearch] = useState("");
    const { skills, loading } = useSkills();
    const rows =skills?.skills?.map((skill) => {
      return createHederTable(
        skill.id,
        skill.name,
      )
    }) ?? [];

    return (
        <TableUI
        TableDdialogButton={SkillsTableDdialogButton}
        data={skills?.skills ??  [] }
        headCells={headCellsSkills}
        loading={loading}
        rows={rows}
        search={search}
        setSearch={setSearch}
        
        />
    )

}