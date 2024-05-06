import { useReactiveVar } from "@apollo/client";
import { dialogs } from "../../../helpers/form/form.helper";
import { Dialog, IconButton } from "@mui/material";
import { Close } from "@mui/icons-material";
import { resetEntityName } from "../isEntity/isEntityName";
export const Dialogs = () => {
  const dialog = useReactiveVar(dialogs);

  return (
    <>
      {dialog.map(({ id, Component, options }) => {
        const closeForm = () => {
          dialogs(dialog.filter((d) => d.id !== id));
          resetEntityName();
        };
        return (
          <Dialog key={id} open {...options} onClose={closeForm}>
            <IconButton
              onClick={closeForm}
              sx={{ position: "absolute", top: 12, right: 12 }}
            >
              <Close />
            </IconButton>
            <Component />
          </Dialog>
        );
      })}
    </>
  );
};
