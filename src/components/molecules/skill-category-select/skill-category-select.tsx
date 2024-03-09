import { useController } from "react-hook-form";
import { SkillFormValues } from "../../dialogs/skill/skill.types";
import { MenuItem, TextField } from "@mui/material";
import { useSkillCategories } from "../../../hooks/use-skill";

export type SkillCategorySelectProps = {
  disabled?: boolean;
};

export const SkillCategorySelect = ({ disabled }: SkillCategorySelectProps) => {
  const { field } = useController<SkillFormValues>({ name: "category" });
  const { categories, loading } = useSkillCategories();

  return (
    <TextField
      {...field}
      disabled={disabled || loading}
      sx={{ width: "100%" }}
      select
      label={"Category"}
    >
      <MenuItem value="">{"No category"}</MenuItem>
      {categories.map((category) => (
        <MenuItem key={category} value={category}>
          {category}
        </MenuItem>
      ))}
    </TextField>
  );
};
