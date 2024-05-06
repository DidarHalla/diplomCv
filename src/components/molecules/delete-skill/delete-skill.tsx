import { Button } from "@mui/material";
import { Delete } from "@mui/icons-material";
import {
  entityNameVar,
  resetEntityName,
} from "../../features/isEntity/isEntityName";
import { useReactiveVar } from "@apollo/client";
import { Typography } from "@mui/material";
import { useProfileSkillDelete } from "../../../hooks/use-profile";

type DeleteSkillProps = {
  closeDialog: () => void;
  id: string | undefined;
};

export const DeleteSkills = ({ id, closeDialog }: DeleteSkillProps) => {
  const nameSkills = useReactiveVar(entityNameVar);
  const [DeleteSkill] = useProfileSkillDelete();

  const delete_skill = (entityName: string[]) => {
    return DeleteSkill({
      variables: {
        skill: {
          userId: id || "",
          name: entityName,
        },
      },
    });
  };

  const handleDelete = () => {
    delete_skill(nameSkills).then(() => {
      resetEntityName();
      closeDialog();
    });
  };

  return (
    <>
      <Button
        onClick={handleDelete}
        style={{ marginLeft: "15px", color: "red" }}
      >
        <Delete color="error" /> <Typography>delete</Typography>
      </Button>
    </>
  );
};
