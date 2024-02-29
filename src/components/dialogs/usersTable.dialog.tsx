import { Button, Popover } from "@mui/material";
import { useNavigate } from "react-router-dom";

import { useUserDialog } from "../organisms/forms/forms"; 
import { useUser } from "../../hooks/use-users"; 

type UsersTableProps ={
    setSelected:React.Dispatch<React.SetStateAction<number | null>>

    selected:number | null
    anchorPos:{
        top: number;
        left: number;
    }

}

export const UsersTable = (props:UsersTableProps) => {
  const {selected,setSelected,anchorPos}=  props
  const [openUserDialog] = useUserDialog();

 

  const navigate = useNavigate();

  const open = Boolean(selected);

  const userId: string = JSON.parse(localStorage.getItem("user") ?? "null").id;

  const { user } = useUser(userId);
  const is_verified = +userId === selected;
  const id = open ? "simple-popover" : undefined;
  
  const handleUpdate = () => {
    openUserDialog({ user });
  };
  const handleClose = () => {
    setSelected(null);
  };
  return (
    <Popover
      id={id}
      open={open}
      onClose={handleClose}
      anchorReference="anchorPosition"
      anchorPosition={anchorPos}
      anchorOrigin={{
        vertical: "top",
        horizontal: "left",
      }}
      transformOrigin={{
        vertical: "top",
        horizontal: "left",
      }}
    >
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
    </Popover>
  );
};
