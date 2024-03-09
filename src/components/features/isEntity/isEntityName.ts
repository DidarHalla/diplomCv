import { makeVar } from "@apollo/client";

export const nameSkillVar = makeVar<string[]>([]);

export const setNameSkill = (name: string) => {
  const entityId = nameSkillVar();
  if (entityId.includes(name)) {
    nameSkillVar(entityId.filter((n) => n !== name));
    return;
  }

  nameSkillVar([...entityId, name]);
};

export const resetNameSkills = () => {
  nameSkillVar([]);
};
