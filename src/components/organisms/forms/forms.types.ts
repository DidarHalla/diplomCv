import { DialogProps } from "@mui/material";
import { User } from "cv-graphql";

export type UserFormValues = {
  auth: {
    email: string;
    password: string;
  };
  profile: {
    first_name: string;
    last_name: string;
  };
  departmentId: string;
  positionId: string;
  // role: UserRole
};

export type UserProps = DialogProps & {
  text?: string;
  textBtn?: string;
  user?: User;
};
