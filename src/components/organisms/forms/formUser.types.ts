import { DialogProps } from "../../../helpers/form/form.types.helper";

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
};

export type UserProps = DialogProps & {
  text?: string;
  textBtn?: string;
  ownerId?: string;
};
