import { useMutation } from "@apollo/client";
import { CreateCvResult } from "../graphql/cv/cv.types";
import { CreateCvInput, DeleteCvInput, DeleteResult } from "cv-graphql";
import { CREATE_CV, DELETE_CV } from "../graphql/cv/cv";
import { CVS } from "../graphql/cvs/cvs";
import { USER } from "../graphql/query";

export const useCreateCv = () => {
  return useMutation<CreateCvResult, { cv: CreateCvInput }>(CREATE_CV, {
    //   refetchQueries: [CVS, USER_CVS]
  });
};

export const useDeleteCv=()=>{
  return useMutation<DeleteResult, { cv: DeleteCvInput }>(DELETE_CV, {
      refetchQueries: [CVS, USER]
  });
}