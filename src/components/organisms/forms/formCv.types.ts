import { DialogProps } from "../../../helpers/form/form.types.helper";

export type CvFormValues = {
  cvId?: string;
  name: string;
  education: string;
  description: string;
  projectsIds: string[];
  userId?: string;
};

export type CvProps = DialogProps & {
  userId: string;
};
