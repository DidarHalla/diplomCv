import { useMutation, useQuery } from "@apollo/client";
import { CreateCvResult } from "../graphql/cv/cv.types";
import { CreateCvInput, Cv, DeleteCvInput, DeleteResult, UpdateCvInput } from "cv-graphql";
import { CREATE_CV, DELETE_CV, UPDATE_CV } from "../graphql/cv/cv";
import { CV, CVS } from "../graphql/cvs/cvs";
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

export const useUpdateCv=()=>{
  return useMutation<Cv, { cv: UpdateCvInput }>(UPDATE_CV, {
      refetchQueries: [CVS, USER]
  });
}

export const useQueryCv=(cvId:string)=>{
  const query = useQuery<{cv:Cv}>(CV, { variables: { cvId } });
  return { cv: query.data?.cv, ...query };
}


