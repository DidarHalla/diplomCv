import { LanguageSelect } from "./language-select";
import { LanguageProficiencySelect } from "./language.proficiency.select";
import {
  Button,
  DialogActions,
  DialogContent,
  DialogTitle,
} from "@mui/material";
import { LanguageProficiencyFormValues } from "./language.proficiency.select.types";
import { useState } from "react";
import { FormProvider, useForm } from "react-hook-form";
import { LanguageProficiencyProps } from "./language-proficiency.types";
import { dialogHelpers } from "../../../helpers/form/form.helper";

enum Proficiency {
  A1 = "A1",
  A2 = "A2",
  B1 = "B1",
  B2 = "B2",
  C1 = "C1",
  C2 = "C2",
  Native = "Native",
}

const LanguageProficiencyDialog = ({
  title,
  ownLanguages,
  language,
  disableLanguageSelect,
  onConfirm,
  closeDialog,
}: LanguageProficiencyProps) => {
  const [isLoading, setIsLoading] = useState(false);
  const methods = useForm<LanguageProficiencyFormValues>({
    defaultValues: {
      name: language?.name || "",
      proficiency: language?.proficiency || Proficiency.A1,
    },
  });
  const { formState, handleSubmit } = methods;

  const onSubmit = (values: LanguageProficiencyFormValues) => {
    setIsLoading(true);
    onConfirm(values)
      .then(closeDialog)
      .catch(() => setIsLoading(false));
  };

  return (
    <FormProvider {...methods}>
      <form onSubmit={handleSubmit(onSubmit)}>
        <DialogTitle>{title}</DialogTitle>
        <DialogContent
          sx={{ display: "flex", flexDirection: "column", gap: 4 }}
        >
          <LanguageSelect
            ownLanguages={ownLanguages}
            disabled={disableLanguageSelect}
          />
          <LanguageProficiencySelect />
        </DialogContent>
        <DialogActions>
          <Button variant="outlined" color="secondary" onClick={closeDialog}>
            {"Cancel"}
          </Button>
          <Button
            variant="contained"
            type="submit"
            disabled={isLoading || !formState.isDirty}
            sx={{
              margin: "0",
            }}
          >
            {"Confirm"}
          </Button>
        </DialogActions>
      </form>
    </FormProvider>
  );
};

export const useLanguageProficiencyDialog =
  dialogHelpers<LanguageProficiencyProps>(
    (props) => () => <LanguageProficiencyDialog {...props} />,
    { maxWidth: "sm", fullWidth: true }
  );
