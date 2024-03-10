import { Add } from "@mui/icons-material";
import { Button, Typography } from "@mui/material";

type AddSkillProps = {
  onClick?(): void;
};

export const AddSkiil = ({ onClick }: AddSkillProps) => {
  return (
    <Button onClick={onClick} sx={{ mt: "30px", color: "green" }}>
      <Add /> <Typography>add skill</Typography>
    </Button>
  );
};
