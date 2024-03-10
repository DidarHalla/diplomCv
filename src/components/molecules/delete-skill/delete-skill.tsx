import { Button } from "@mui/material";
import { Delete } from "@mui/icons-material";
import {
  entityNameVar,
  resetEntityName,
} from "../../features/isEntity/isEntityName";
import { useReactiveVar } from "@apollo/client";
import { Typography } from "@mui/material";

type DeleteSkillProps = {
  onDelete(entityIds: string[]): Promise<unknown>;
};

export const DeleteSkills = ({ onDelete }: DeleteSkillProps) => {
  const nameSkills = useReactiveVar(entityNameVar);

  const handleDelete = () => {
    onDelete(nameSkills).then(() => {
      resetEntityName();
    });
  };

  const cancelDeleteSkill = () => {
    resetEntityName();
  };

  return (
    <>
      {" "}
      {!!nameSkills.length && (
        <>
          {" "}
          <Button
            onClick={handleDelete}
            style={{ marginTop: "30px", marginLeft: "15px" }}
          >
            <Delete color="primary" /> <Typography>delete</Typography>
          </Button>
          <Button
            color="secondary"
            onClick={cancelDeleteSkill}
            sx={{ mt: "30px", marginLeft: "15px" }}
          >
            <Typography>cancel</Typography>
          </Button>
        </>
      )}
    </>
  );
};
