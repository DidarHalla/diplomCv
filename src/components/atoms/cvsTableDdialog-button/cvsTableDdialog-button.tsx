import { Button } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { routes } from "../../../constants/routes";

interface UsersTableDdialogButton {
  selected: number | null;
}

export const CvsTableDdialogButton = (props: UsersTableDdialogButton) => {
  const { selected } = props;

  const navigate = useNavigate();

  return (
    <>
      <Button
        variant="contained"
        onClick={() => {
          navigate(routes.cvs.root+"/" + selected);
        }}
        sx={{ display: "block", width: 100 + "%" }}
      >
        Подробности
      </Button>
      <Button
        disabled={true}
        variant="contained"
        sx={{ display: "block", width: 100 + "%" }}
      >
        Удалить резюме
      </Button>
    </>
  );
};
