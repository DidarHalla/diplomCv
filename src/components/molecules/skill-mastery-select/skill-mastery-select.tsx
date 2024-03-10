import { useController, useFormContext } from "react-hook-form";
import { SkillFormValues } from "../../dialogs/skill/skill.types";
import { MenuItem, TextField } from "@mui/material";
// import { Mastery } from "cv-graphql";

enum Mastery {
  Novice = "Novice",
  Advanced = "Advanced",
  Competent = "Competent",
  Proficient = "Proficient",
  Expert = "Expert",
}

export const SkillMasterySelect = () => {
  const { watch } = useFormContext<SkillFormValues>();
  const { field } = useController<SkillFormValues>({ name: "mastery" });
  const skillName = watch("name");

  return (
    <TextField
      {...field}
      sx={{ width: "100%" }}
      select
      disabled={!skillName}
      label={"Skill mastery"}
    >
      {Object.keys(Mastery).map((mastery) => (
        <MenuItem key={mastery} value={mastery}>
          {mastery}
        </MenuItem>
      ))}
    </TextField>
  );
};
