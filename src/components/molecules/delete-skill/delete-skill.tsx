import { Button } from "@mui/material";
import { Delete } from "@mui/icons-material";
import {
  nameSkillVar,
  resetNameSkills,
} from "../../features/isEntity/isEntityName";
import { useReactiveVar } from "@apollo/client";
import { Typography } from "@mui/material";

type DeleteSkillProps = {
  onDelete(entityIds: string[]): Promise<unknown>;
};

export const DeleteSkills = ({ onDelete }: DeleteSkillProps) => {
  const nameSkills = useReactiveVar(nameSkillVar);

  const handleDelete = () => {
    onDelete(nameSkills).then(() => {
      resetNameSkills();
    });
  };

  return (
    <>
      {" "}
      {!!nameSkills.length && (
        <Button
          onClick={handleDelete}
          style={{ marginTop: "30px", marginLeft: "15px" }}
        >
          <Delete color="primary" /> <Typography>delete</Typography>
        </Button>
      )}
    </>
  );
};
