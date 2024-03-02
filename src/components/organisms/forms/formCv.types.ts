import { DialogProps } from "../../../helpers/form/form.types.helper";

export type CvFormValues = {
  name: string;
  education: string;
  description: string;
};

export type CvProps = DialogProps & {
  userId: string;
};
