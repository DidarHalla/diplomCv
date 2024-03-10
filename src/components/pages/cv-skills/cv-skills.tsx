import { useParams } from "react-router";
import {
  useAddCvSkill,
  useCvSkills,
  useDeleteCvSkill,
  useUpdateCvSkill,
} from "../../../hooks/use-cvs";
import { Container } from "@mui/material";
import { AddSkiil } from "../../molecules/add-skills-btn/add-skills-btn";
import { DeleteSkills } from "../../molecules/delete-skill/delete-skill";
import { SkillBox } from "../../molecules/skill-box/skill-box";
import { useSkillDialog } from "../../dialogs/skill/skill";
import { SkillMastery } from "cv-graphql";

export const CvSkills = () => {
  const { cvId = "" } = useParams();
  const { skills, classes } = useCvSkills(cvId);

  const [AddCvSkill] = useAddCvSkill();
  const [UpCvSkill] = useUpdateCvSkill();
  const [DeleteCvSkill] = useDeleteCvSkill();
  const YourSkills = skills.map((skills) => skills.name);
  const [OpenSkillDialog] = useSkillDialog();

  const add_skill = () => {
    OpenSkillDialog({
      title: "Add Skill",
      YourSkills,
      onConfirm({ category, mastery, name }) {
        return AddCvSkill({
          variables: { skill: { cvId, category, mastery, name } },
        });
      },
    });
  };

  const up_skill = (skill: SkillMastery) => {
    OpenSkillDialog({
      title: "Update Skill",
      YourSkills,
      onConfirm({ category, mastery, name }) {
        return UpCvSkill({
          variables: { skill: { cvId, category, mastery, name } },
        });
      },
      skill,
      disableSkillSelect: true,
    });
  };

  const delete_skill = (entityName: string[]) => {
    return DeleteCvSkill({
      variables: {
        skill: {
          cvId,
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
          {" "}
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
