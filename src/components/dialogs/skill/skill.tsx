import { useState } from "react";
import { SkillFormValues, SkillMasteryProps } from "./skill.types";
import { FormProvider, useForm } from "react-hook-form";
import {
  Button,
  DialogActions,
  DialogContent,
  DialogTitle,
} from "@mui/material";
import { SkillSelect } from "../../molecules/skill-select/skill-select";
import { SkillCategorySelect } from "../../molecules/skill-category-select/skill-category-select";
import { SkillMasterySelect } from "../../molecules/skill-mastery-select/skill-mastery-select";
import { dialogHelpers } from "../../../helpers/form/form.helper";
import { DeleteSkills } from "../../molecules/delete-skill/delete-skill";
import {
  entityNameVar,
  resetEntityName,
} from "../../features/isEntity/isEntityName";
import { useReactiveVar } from "@apollo/client";

enum Mastery {
  Novice = "Novice",
  Advanced = "Advanced",
  Competent = "Competent",
  Proficient = "Proficient",
  Expert = "Expert",
}

const SkillMastery = ({
  title,
  YourSkills,
  skill,
  disableSkillSelect,
  onConfirm,
  closeDialog,
  userId,
}: SkillMasteryProps) => {
  const [isLoading, setIsLoading] = useState(false);
  const methods = useForm<SkillFormValues>({
    defaultValues: {
      name: skill?.name || "",
      category: skill?.category || "",
      mastery: skill?.mastery || Mastery.Novice,
    },
  });

  const { formState, handleSubmit } = methods;

  const onSubmit = (values: SkillFormValues) => {
    setIsLoading(true);
    onConfirm(values)
      .then(onCloseDialog)
      .catch(() => setIsLoading(false));
  };

  const onCloseDialog = () => {
    resetEntityName();
    closeDialog();
  };

  const nameSkills = useReactiveVar(entityNameVar);

  return (
    <FormProvider {...methods}>
      <form onSubmit={handleSubmit(onSubmit)}>
        <DialogTitle>{title}</DialogTitle>
        <DialogContent
          sx={{ display: "flex", flexDirection: "column", gap: 4 }}
        >
          <SkillSelect ownSkills={YourSkills} disabled={disableSkillSelect} />
          <SkillCategorySelect disabled />
          <SkillMasterySelect />
        </DialogContent>
        <DialogActions>
          <Button variant="outlined" color="primary" onClick={onCloseDialog}>
            Cancel
          </Button>
          <Button
            sx={{ marginTop: 0 }}
            variant="contained"
            type="submit"
            disabled={isLoading || !formState.isDirty}
          >
            {!skill ? "add" : "update"}
          </Button>
          {nameSkills.length > 0 && (
            <DeleteSkills id={userId} closeDialog={onCloseDialog} />
          )}
        </DialogActions>
      </form>
    </FormProvider>
  );
};

export const useSkillDialog = dialogHelpers<SkillMasteryProps>(
  (props) => () => <SkillMastery {...props} />,
  { maxWidth: "sm", fullWidth: true }
);
