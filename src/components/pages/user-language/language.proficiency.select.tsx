import { MenuItem, TextField } from "@mui/material";
import { useController, useFormContext } from "react-hook-form";
import { LanguageProficiencyFormValues } from "./language.proficiency.select.types";

enum Proficiency {
  A1 = "A1",
  A2 = "A2",
  B1 = "B1",
  B2 = "B2",
  C1 = "C1",
  C2 = "C2",
  Native = "Native",
}

export const LanguageProficiencySelect = () => {
  const { watch } = useFormContext<LanguageProficiencyFormValues>();
  const { field } = useController<LanguageProficiencyFormValues>({
    name: "proficiency",
  });
  const languageName = watch("name");

  return (
    <TextField
      {...field}
      sx={{ width: "100%" }}
      select
      disabled={!languageName}
      label={"Language proficiency"}
    >
      {Object.keys(Proficiency).map((proficiency) => (
        <MenuItem key={proficiency} value={proficiency}>
          {proficiency}
        </MenuItem>
      ))}
    </TextField>
  );
};
