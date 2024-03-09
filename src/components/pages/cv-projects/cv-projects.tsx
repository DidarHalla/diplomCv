import { useState } from "react";
import { useProject } from "../../../hooks/use-projects";
import { createHederTable } from "../../helpers/createHederTable.helper";
import { ProjectsTableDdialogButton } from "../../atoms/projectsTableDdialog-button/projectsTableDdialog-button.atom";
import { TableUI } from "../../templates/table/table.template";
import { headCellsCvProjects } from "../../../constants/headCells";
import { useParams } from "react-router-dom";

export const CvProjects=()=>{
    const {cvId}= useParams()
    const [search, setSearch] = useState("");
    const { projects, loading } = useProject(cvId??"");
    const rows =projects?.map((project) => {
      return createHederTable(
        project.id,
      project.name,
      project.internal_name,
      project.domain,
      project.start_date,
      project.end_date??""
      )
    }) ?? [];

    return (
        <TableUI 
        TableDdialogButton={ProjectsTableDdialogButton}
        data={projects ??  [] }
        headCells={headCellsCvProjects}
        loading={loading}
        rows={rows}
        search={search}
        setSearch={setSearch}
        
        />
    )

}