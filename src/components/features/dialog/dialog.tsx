import { useReactiveVar } from "@apollo/client";
import { dialogs } from "../../../helpers/form/form.helper";

export const Dialog = () => {
  const dialog = useReactiveVar(dialogs);

  return;
};
