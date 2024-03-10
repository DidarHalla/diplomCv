import { useController, useFormContext } from "react-hook-form";
import { useSkills } from "../../../hooks/use-skill";
import { MenuItem, TextField } from "@mui/material";
import { SkillFormValues } from "../../dialogs/skill/skill.types";

type SkillSelectProps = {
  ownSkills: string[];
  disabled?: boolean;
};

export const SkillSelect = ({ ownSkills, disabled }: SkillSelectProps) => {
  const { skills, loading } = useSkills();

  const { setValue } = useFormContext<SkillFormValues>();
  const { field } = useController<SkillFormValues>({ name: "name" });

  return (
    <TextField {...field} select disabled={disabled || loading} label={"Skill"}>
      {skills
        .filter(({ name }) => {
          return disabled || !ownSkills.includes(name);
        })
        .map(({ id, name, category }) => (
          <MenuItem
            key={id}
            value={name}
            onClick={() => setValue("category", category || "")}
          >
            {name}
          </MenuItem>
        ))}
    </TextField>
  );
};
