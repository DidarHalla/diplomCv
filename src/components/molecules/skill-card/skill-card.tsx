import { SkillMastery } from "cv-graphql";
import { useReactiveVar } from "@apollo/client";
import { Button, LinearProgress, Typography } from "@mui/material";
import { colorMastery } from "../../../helpers/color-mastery";
import {
  entityNameVar,
  setEntityName,
} from "../../features/isEntity/isEntityName";

type SkillCardProps = {
  skill: SkillMastery;
  onUpdate(skill: SkillMastery): void;
};

enum Mastery {
  Novice = "Novice",
  Advanced = "Advanced",
  Competent = "Competent",
  Proficient = "Proficient",
  Expert = "Expert",
}

export const SkillCard = ({ skill, onUpdate }: SkillCardProps) => {
  const colorMaster = colorMastery(skill.mastery);
  const nameSkills = useReactiveVar(entityNameVar);
  const numberMastery = Object.keys(Mastery).indexOf(skill.mastery);
  const percent = (numberMastery + 1) * 20;
  const selected = nameSkills.includes(skill.name);

  const onClickCard = () => {
    setEntityName(skill.name);
    onUpdate(skill);
  };

  return (
    <div>
      <Button onClick={onClickCard} color={"secondary"}>
        <Typography>{skill.name}</Typography>
      </Button>

      <LinearProgress
        color={selected ? "secondary" : colorMaster}
        value={selected ? 0 : percent}
        variant="determinate"
      />
    </div>
  );
};
