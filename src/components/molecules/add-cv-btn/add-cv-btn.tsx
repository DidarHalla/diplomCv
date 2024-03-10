import { Add } from "@mui/icons-material";
import { Button, Typography } from "@mui/material";

type AddCvProps = {
  onClick(): void;
};

export const AddCv = ({ onClick }: AddCvProps) => {
  return (
    <Button onClick={onClick} sx={{ mt: "30px", color: "green" }}>
      <Add /> <Typography>add Cv</Typography>
    </Button>
  );
};
