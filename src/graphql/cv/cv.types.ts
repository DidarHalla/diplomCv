import { Cv } from "cv-graphql";

export type CreateCvResult = {
  createCv: Cv;
};

export type CvResult = {
  cv: Cv;
};

export type AddCvSkillResult = {
  addCvSkill: Cv;
};

export type UpdateCvSkillResult = {
  updateCvSkill: Cv;
};

export type DeleteCvSkillResult = {
  deleteCvSkill: Cv;
};

export type UpdateCvResult = {
  updateCv: Cv;
};
