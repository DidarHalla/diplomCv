import { gql } from "@apollo/client";

export const CVS = gql`
  query Cvs {
    cvs {
      id
      name
      description
      user {
        id
        email
      }
    }
  }
`;
export const CV = gql`
  query Cv($cvId: ID!) {
    cv(cvId: $cvId) {
      id
      name
      education
      description
      projects {
        id
        name
        internal_name
        domain
        start_date
        end_date
      }
      user {
        id
      }
    }
  }
`;

export const USER_CVS = gql`
  query UserCvs($userId: ID!) {
    user(userId: $userId) {
      id
      cvs {
        id
        created_at
        name
        description
      }
    }
  }
`;

export const CV_SKILLS = gql`
  query CvSkills($cvId: ID!) {
    cv(cvId: $cvId) {
      id
      skills {
        name
        category
        mastery
      }
    }
  }
`;

export const ADD_CV_SKILL = gql`
  mutation AddCvSkill($skill: AddCvSkillInput!) {
    addCvSkill(skill: $skill) {
      id
      skills {
        name
        category
        mastery
      }
    }
  }
`;

export const UPDATE_CV_SKILL = gql`
  mutation UpdateCvSkill($skill: UpdateCvSkillInput!) {
    updateCvSkill(skill: $skill) {
      id
      skills {
        name
        category
        mastery
      }
    }
  }
`;

export const DELETE_CV_SKILL = gql`
  mutation DeleteCvSkill($skill: DeleteCvSkillInput!) {
    deleteCvSkill(skill: $skill) {
      id
      skills {
        name
        category
        mastery
      }
    }
  }
`;

export const UPDATE_CV = gql`
  mutation UpdateCv($cv: UpdateCvInput!) {
    updateCv(cv: $cv) {
      id
      name
      education
      description
    }
  }
`;
