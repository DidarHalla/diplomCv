import { useReactiveVar } from "@apollo/client";
import { Button, Container } from "@mui/material";
import { ReactNode } from "react";
import {
  entityNameVar,
  resetEntityName,
} from "../../features/isEntity/isEntity";
type BulkDeletionProps = {
  children?: ReactNode;
  onDelete(entityIds: string[]): Promise<unknown>;
};

export const DeletedProfileLanguage = ({
  children,
  onDelete,
}: BulkDeletionProps) => {
  const entityNameLanguage = useReactiveVar(entityNameVar);

  const handleCancel = () => {
    resetEntityName();
  }

  const handleDeleteCards = () => {
    onDelete(entityNameLanguage).then(() => {
      resetEntityName();
    });
  };

  return (
    <>
      {children}
      {!!entityNameLanguage.length && (
        <Container>
          <Button color="secondary" variant="outlined" onClick={handleCancel}>
            {"Cancel"}
          </Button>
          <Button
            variant="contained"
            onClick={handleDeleteCards}
            sx={{
              margin: "0 0 0 10px",
            }}
          >
            {"Delete"}{" "}
          </Button>
        </Container>
      )}
    </>
  );
};
