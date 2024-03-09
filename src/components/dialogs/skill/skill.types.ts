import { Mastery, SkillMastery } from "cv-graphql";
import { DialogProps } from "../../../helpers/form/form.types.helper";

export type SkillFormValues = {
  name: string;
  category: string;
  mastery: Mastery;
};

export type SkillMasteryProps = DialogProps & {
  title: string;
  YourSkills: string[];
  skill?: SkillMastery;
  disableSkillSelect?: boolean;
  userId?: string;
  onConfirm(values: SkillFormValues): Promise<unknown>;
};
