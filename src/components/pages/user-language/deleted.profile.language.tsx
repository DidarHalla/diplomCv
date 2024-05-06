import { useReactiveVar } from "@apollo/client";
import { Button, Typography } from "@mui/material";
import { Delete } from "@mui/icons-material";
import { useProfileLanguageDelete } from "../../../hooks/use-profile-languages";
import {
  entityNameVar,
  resetEntityName,
} from "../../features/isEntity/isEntityName";

type DeleteLanguagesProps = {
  closeDialog: () => void;
  id: string | undefined;
};

export const DeleteLanguages = ({ closeDialog, id }: DeleteLanguagesProps) => {
  const nameLanguages = useReactiveVar(entityNameVar);
  const [deleteProfileLanguage] = useProfileLanguageDelete();

  const delete_languages = (entityNameLanguages: string[]) => {
    return deleteProfileLanguage({
      variables: {
        language: {
          userId: id || "",
          name: entityNameLanguages,
        },
      },
    });
  };

  const handleDelete = () => {
    delete_languages(nameLanguages).then(() => {
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
