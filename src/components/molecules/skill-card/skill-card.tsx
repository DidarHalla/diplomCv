import { SkillMastery } from "cv-graphql";

import { useReactiveVar } from "@apollo/client";

import { MouseEvent } from "react";
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
    console.log(selected, 111);

    if (nameSkills.length) {
      setEntityName(skill.name);
      return;
    }
    console.log(selected, 222);
    onUpdate(skill);
  };

  const handleContextMenu = (event: MouseEvent) => {
    event.preventDefault();
    setEntityName(skill.name);
  };

  return (
    <div>
      <Button
        onClick={onClickCard}
        onContextMenu={handleContextMenu}
        color={"secondary"}
      >
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
