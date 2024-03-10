import { Button } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { routes } from "../../../constants/routes";
import { useDeleteCv } from "../../../hooks/use-cv";

interface UsersTableDdialogButton {
  selected: number | null;
}

export const CvsTableDdialogButton = (props: UsersTableDdialogButton) => {
  const { selected } = props;

  const navigate = useNavigate();
  const [deleteCv]=useDeleteCv()

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
        variant="contained"
        onClick={()=>{deleteCv({variables:{
          cv:{cvId:selected?String(selected):""}
        }
      })}}
        sx={{ display: "block", width: 100 + "%" }}

      >
        Удалить резюме
      </Button>
    </>
  );
};
