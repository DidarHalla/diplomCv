import { useMutation, useQuery } from "@apollo/client";
import { CreateCvResult } from "../graphql/cv/cv.types";
import {
  CreateCvInput,
  Cv,
  DeleteCvInput,
  DeleteResult,
  UpdateCvInput,
} from "cv-graphql";
import { CREATE_CV, DELETE_CV, UPDATE_CV } from "../graphql/cv/cv";
import { CV, CVS } from "../graphql/cvs/cvs";
import { USER } from "../graphql/query";

import { CREATE_CV } from "../graphql/cv/cv";
import { CVS } from "../graphql/cvs/cvs";
import { CvFormValues } from "../components/organisms/forms/formCv.types";
import { USER } from "../graphql/auth/query";

export const useCreateCv = () => {
  return useMutation<CreateCvResult, { cv: CvFormValues }>(CREATE_CV, {
    refetchQueries: [CVS, USER],
  });
};

export const useDeleteCv = () => {
  return useMutation<DeleteResult, { cv: DeleteCvInput }>(DELETE_CV, {
    refetchQueries: [CVS, USER],
  });
};

export const useUpdateCv = () => {
  return useMutation<Cv, { cv: UpdateCvInput }>(UPDATE_CV, {
    refetchQueries: [CVS, USER],
  });
};

export const useQueryCv = (cvId: string) => {
  const query = useQuery<{ cv: Cv }>(CV, { variables: { cvId } });
  return { cv: query.data?.cv, ...query };
};
