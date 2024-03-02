import { FC, useCallback, useRef } from "react";
import { DialogOptions, IDialog } from "./form.types.helper";
import { makeVar } from "@apollo/client";

export const dialogs = makeVar<IDialog[]>([]);
let id = 0;

const addDialog = (Component: FC, options: DialogOptions) => {
  const dialog = dialogs();
  const idDialog = (id += 1);
  dialogs([...dialog, { id, Component, options }]);
  return idDialog;
};

export const dialogHelpers = <T>(
  Component: (props: T) => FC,
  dialogProps: DialogOptions
) => {
  return function useDialog() {
    const ref = useRef<number>();

    const closeDialog = useCallback(() => {
      const dialog = dialogs();
      if (ref.current) {
        dialogs(
          dialog.filter((dialog) => {
            dialog.id !== id;
          })
        );
      }
    }, []);

    const openDialog = useCallback((props?: Omit<T, "closeDialog">) => {
      ref.current = addDialog(
        Component({ ...props, closeDialog } as T),
        dialogProps
      );
    }, []);

    return [openDialog, closeDialog];
  };
};
