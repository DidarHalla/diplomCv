import { MenuItem, TextField } from "@mui/material";
import { useLanguages } from "../../../hooks/use-languages.hook";
import { LanguageProficiencyFormValues } from "./language.proficiency.select.types";
import { useController } from "react-hook-form";

type LanguageSelectProps = {
  ownLanguages: string[];
  disabled?: boolean;
};

export const LanguageSelect = ({
  ownLanguages,
  disabled,
}: LanguageSelectProps) => {
  const { languages, loading } = useLanguages();
  const { field } = useController<LanguageProficiencyFormValues>({
    name: "name",
  });
  return (
    <TextField
      {...field}
      sx={{ width: "100%" }}
      select
      disabled={disabled || loading}
      label="Language"
    >
      {languages
        .filter(({ name }) => disabled || !ownLanguages.includes(name))
        .map(({ id, name }) => (
          <MenuItem key={id} value={name}>
            {name}
          </MenuItem>
        ))}
    </TextField>
  );
};
