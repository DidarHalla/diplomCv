import { useMutation } from "@apollo/client";
import { CreateCvResult } from "../graphql/cv/cv.types";

import { CREATE_CV } from "../graphql/cv/cv";
import { CVS } from "../graphql/cvs/cvs";
import { CvFormValues } from "../components/organisms/forms/formCv.types";
import { USER } from "../graphql/auth/query";

export const useCreateCv = () => {
  return useMutation<CreateCvResult, { cv: CvFormValues }>(CREATE_CV, {
    refetchQueries: [CVS, USER],
  });
};
