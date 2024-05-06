import { LanguageProficiency, Proficiency } from "cv-graphql";
import { DialogProps } from "../../../helpers/form/form.types.helper";

export type LanguageProficiencyFormValues = {
  name: string;
  proficiency: Proficiency;
};

export type LanguageProficiencyProps = DialogProps & {
  title: string;
  ownLanguages: string[];
  language?: LanguageProficiency;
  disableLanguageSelect?: boolean;
  userId: string | undefined;
  onConfirm(values: LanguageProficiencyFormValues): Promise<unknown>;
};
