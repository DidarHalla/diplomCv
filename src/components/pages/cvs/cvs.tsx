import { useState } from "react";
import { useCVs } from "../../../hooks/use-cvs";
import { TableUI } from "../../templates/table/table.template";
import { headCellsCvs } from "../../../constants/headCells";
import { createHederTable } from "../../helpers/createHederTable.helper";
import { CvsTableDdialogButton } from "../../atoms/cvsTableDdialog-button/cvsTableDdialog-button";
import { AddCv } from "../../molecules/add-cv-btn/add-cv-btn";
import { useCvDialog } from "../../organisms/forms/formCv";
import { authReactive } from "../../../graphql/authReactive/authReactive";

export const Cvs = () => {
  const [search, setSearch] = useState("");
  const { cvs, loading } = useCVs();
  const rows =
    cvs?.cvs?.map((cv) => {
      return createHederTable(
        cv.id,
        cv.name,
        cv.description.slice(0, 100),
        cv.user?.email ?? ""
      );
    }) ?? [];

  const userId = authReactive.getAuth().user$()?.id || "";

  const [OpenCvDialog] = useCvDialog();
  const add_cv = () => {
    OpenCvDialog({
      userId,
    });
  };

  return (
    <>
      <AddCv onClick={add_cv} />
      <TableUI
        TableDdialogButton={CvsTableDdialogButton}
        data={cvs?.cvs ?? []}
        headCells={headCellsCvs}
        loading={loading}
        rows={rows}
        search={search}
        setSearch={setSearch}
      />
    </>
  );
};
