import { useState } from "react";
import { useProjects } from "../../../hooks/use-projects";
import { createHederTable } from "../../helpers/createHederTable.helper";
import { ProjectsTableDdialogButton } from "../../atoms/projectsTableDdialog-button/projectsTableDdialog-button.atom";
import { TableUI } from "../../templates/table/table.template";
import { headCellsProjects } from "../../../constants/headCells";

export const Projects=()=>{
    const [search, setSearch] = useState("");
    const { projects, loading } = useProjects();
    const rows =projects?.projects?.map((project) => {
      return createHederTable(
        project.id,
      project.name,
      project.internal_name,
      project.domain,
      project.start_date,
      project.end_date??"",
      project.team_size
      )
    }) ?? [];

    return (
        <TableUI 
        TableDdialogButton={ProjectsTableDdialogButton}
        data={projects?.projects ??  [] }
        headCells={headCellsProjects}
        loading={loading}
        rows={rows}
        search={search}
        setSearch={setSearch}
        
        />
    )

}