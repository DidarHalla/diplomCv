import gql from "graphql-tag";

export const SKILLS = gql`
  query Skills {
    skills {
      id
      name
      category
    }
  }
`;
export const SKILL_CATEGORIES = gql`
  query SkillCategories {
    skillCategories
  }
`;

export const CREATE_SKILL = gql`
  mutation CreateSkill($skill: CreateSkillInput!) {
    createSkill(skill: $skill) {
      id
      name
      category
    }
  }
`;

export const UPDATE_SKILL = gql`
  mutation UpdateSkill($skill: UpdateSkillInput!) {
    updateSkill(skill: $skill) {
      id
      name
      category
    }
  }
`;
