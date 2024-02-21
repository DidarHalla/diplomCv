import { FC } from "react";
import { DialogProps as MuiDialogProps } from "@mui/material";

export type DialogOptions = Omit<MuiDialogProps, "open">;
export interface IDialog {
  id: number;
  Component: FC;
  options: DialogOptions;
}

export type DialogProps = {
  closeDialog: () => void;
};
