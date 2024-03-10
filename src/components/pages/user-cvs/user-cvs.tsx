import { useState } from "react";
import { TableUI } from "../../templates/table/table.template";
import { headCellsUserCvs } from "../../../constants/headCells";
import { createHederTable } from "../../helpers/createHederTable.helper";
import { CvsTableDdialogButton } from "../../atoms/cvsTableDdialog-button/cvsTableDdialog-button";
import { useUser } from "../../../hooks/use-users";
import { useParams } from "react-router-dom";
import { AddCv } from "../../molecules/add-cv-btn/add-cv-btn";
import { useCvDialog } from "../../organisms/forms/formCv";

export const UserCvs = () => {
  const { userId = "" } = useParams();
  const [search, setSearch] = useState("");
  const { user, loading } = useUser(userId);
  const cvs = user?.cvs;
  const rows =
    cvs?.map((cv) => {
      return createHederTable(cv.id, cv.name, cv.description.slice(0, 100));
    }) ?? [];

  const [OpenCvDialog] = useCvDialog();
  const add_cv = () => {
    OpenCvDialog({
      userId,
    });
  };

  return (
    <>
      {" "}
      <AddCv onClick={add_cv} />
      <TableUI
        TableDdialogButton={CvsTableDdialogButton}
        data={cvs ?? []}
        headCells={headCellsUserCvs}
        loading={loading}
        rows={rows}
        search={search}
        setSearch={setSearch}
      />
    </>
  );
};
