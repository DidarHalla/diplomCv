import { Typography } from "@mui/material";
import { SkillMastery } from "cv-graphql";
import { SkillCard } from "../skill-card/skill-card";

export type SkillsBoxProps = {
  category: string;
  skills: SkillMastery[];
  onUpdate(skill: SkillMastery): void;
};

export const SkillBox = ({ skills, category, onUpdate }: SkillsBoxProps) => {
  return (
    <>
      <div style={{ marginTop: "50px" }}>
        <Typography>{category}</Typography>
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "1fr 1fr 1fr ",
            gap: "3rem",
          }}
        >
          {skills.map((skill) => (
            <SkillCard skill={skill} onUpdate={onUpdate} key={skill.name} />
          ))}
        </div>
      </div>
    </>
  );
};
