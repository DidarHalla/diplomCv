import { useMutation } from "@apollo/client";
import { CreateCvResult } from "../graphql/cv/cv.types";
import { CreateCvInput } from "cv-graphql";
import { CREATE_CV } from "../graphql/cv/cv";
import { CVS } from "../graphql/cvs/cvs";

export const useCreateCv = () => {
  return useMutation<CreateCvResult, { cv: CreateCvInput }>(CREATE_CV, {
    //   refetchQueries: [CVS, USER_CVS]
  });
};

export const useDeleteCv=()=>{
  return useMutation<CreateCvResult, { cv: CreateCvInput }>(CREATE_CV, {
      refetchQueries: [CVS, USER_CVS]
  });
}