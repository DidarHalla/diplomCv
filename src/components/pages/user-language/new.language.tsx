import { Add } from "@mui/icons-material";
import { Typography } from "@mui/material";
import { Button } from "@mui/material";

type NewLanguageCardProps = {
  onClick?(): void;
};

export const NewLanguage = ({ onClick }: NewLanguageCardProps) => {
  return (
    <>
      <Button color="secondary" onClick={onClick}>
        <Add /> <Typography>{"Add language"}</Typography>
      </Button>
    </>
  );
};
