import { Popover } from "@mui/material";
type UsersTableProps = {
  setSelected: React.Dispatch<React.SetStateAction<number | null>>;

  selected: number | null;
  anchorPos: {
    top: number;
    left: number;
  };
  TableDdialogButton:(props:{selected:number | null})=>JSX.Element
};

export const UsersTableDdialog = (props: UsersTableProps) => {
  const { selected, setSelected, anchorPos,TableDdialogButton } = props;

  const open = Boolean(selected);

  const id = open ? "simple-popover" : undefined;

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
      <TableDdialogButton selected={selected} />
    </Popover>
  );
};
