import { Button } from "@mui/material";

interface TableDdialogButton {
  selected: number | null;
}

export const SkillsTableDdialogButton = (props: TableDdialogButton) => {
  const { selected } = props;



  return (
    <>
      <Button
        disabled={true}
        variant="contained"
        sx={{ display: "block", width: 100 + "%" }}
        onClick={()=>console.log(selected)}
      >
        Обновить навык
      </Button>
      <Button
        disabled={true}
        variant="contained"
        sx={{ display: "block", width: 100 + "%" }}
      >
        Удалить навык
      </Button>
    </>
  );
};
