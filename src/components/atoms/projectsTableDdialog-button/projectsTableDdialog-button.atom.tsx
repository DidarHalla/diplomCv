import { Button } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { routes } from "../../../constants/routes";

interface UsersTableDdialogButton {
  selected: number | null;
}

export const ProjectsTableDdialogButton = (props: UsersTableDdialogButton) => {
  const { selected } = props;

  const navigate = useNavigate();

  return (
    <>
      <Button
        variant="contained"
        onClick={() => {
          navigate(routes.projects.project+"/" + selected);
        }}
        sx={{ display: "block", width: 100 + "%" }}
      >
        Проект
      </Button>
      <Button
        disabled={true}
        variant="contained"
        sx={{ display: "block", width: 100 + "%" }}
      >
        Обновить проект
      </Button>
      <Button
        disabled={true}
        variant="contained"
        sx={{ display: "block", width: 100 + "%" }}
      >
        Удалить проект
      </Button>
    </>
  );
};
