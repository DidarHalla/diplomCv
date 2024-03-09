import { Button } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useUserDialog } from "../../organisms/forms/formUser"; 
import { authReactive } from "../../../graphql/authReactive/authReactive";

interface UsersTableDdialogButton{
    selected: number | null;
}

export const UsersTableDdialogButton=(props:UsersTableDdialogButton)=>{
    const {selected} =props
    const [openUserDialog] = useUserDialog();
  const ownerId =  authReactive.getAuth().user$()?.id

    const navigate = useNavigate();
  const is_verified = +(ownerId ?? -1) === selected;

  const handleUpdate = () => {
    openUserDialog({ ownerId });
  };

    return(
        <>
          <Button
        variant="contained"
        onClick={() => {
          navigate("" + selected);
        }}
        sx={{ display: "block", width: 100 + "%" }}
      >
        Профиль
      </Button>
      <Button
        disabled={!is_verified}
        variant="contained"
        sx={{ display: "block", width: 100 + "%" }}
        onClick={handleUpdate}
      >
        Обновить пользователя
      </Button>
      <Button
        disabled={true}
        variant="contained"
        sx={{ display: "block", width: 100 + "%" }}
      >
        Удалить пользователя
      </Button>
        </>
    )
}