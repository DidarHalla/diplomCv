import { useParams } from "react-router";
import {
  useProfileSkillDelete,
  useProfileSkillUpdate,
  useProfileSkills,
} from "../../../hooks/use-profile";
import { useSkillDialog } from "../../dialogs/skill/skill";
import { useProfileSkillAdd } from "../../../hooks/use-skill";
import { Container } from "@mui/material";
import { AddSkiil } from "../../molecules/add-skills-btn/add-skills-btn";
import { SkillMastery } from "cv-graphql";
import { SkillBox } from "../../molecules/skill-box/skill-box";
import { DeleteSkills } from "../../molecules/delete-skill/delete-skill";

export const UserSkills = () => {
  const [AddProfileSkill] = useProfileSkillAdd();
  const [UpProfileSkill] = useProfileSkillUpdate();
  const { userId = "" } = useParams();
  const { skills, classes } = useProfileSkills(userId);
  const [OpenSkillDialog] = useSkillDialog();
  const YourSkills = skills.map((skills) => skills.name);
  const [DeleteSkill] = useProfileSkillDelete();
  const add_skill = () => {
    OpenSkillDialog({
      title: "Add Skill",
      YourSkills,
      onConfirm({ category, mastery, name }) {
        return AddProfileSkill({
          variables: { skill: { userId, category, mastery, name } },
        });
      },
    });
  };

  const up_skill = (skill: SkillMastery) => {
    OpenSkillDialog({
      title: "Update Skill",
      YourSkills,
      userId: userId,
      onConfirm({ category, mastery, name }) {
        return UpProfileSkill({
          variables: { skill: { userId, category, mastery, name } },
        });
      },
      skill,
      disableSkillSelect: true,
    });
  };

  const delete_skill = (entityName: string[]) => {
    return DeleteSkill({
      variables: {
        skill: {
          userId,
          name: entityName,
        },
      },
    });
  };

  return (
    <>
      <Container>
        <div
          style={{
            display: "flex",
            alignItems: "center",
          }}
        >
          <AddSkiil onClick={add_skill} />
          <DeleteSkills onDelete={delete_skill} />
        </div>
        {Object.entries(classes).map(([category, skills]) => {
          return (
            <SkillBox
              skills={skills}
              category={category}
              key={category}
              onUpdate={up_skill}
            />
          );
        })}
      </Container>
    </>
  );
};
