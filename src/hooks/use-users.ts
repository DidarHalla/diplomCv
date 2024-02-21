import { useMutation } from "@apollo/client";
import { UpdateUserResult } from "../graphql/users/users.types";
import { UpdateUserInput } from "cv-graphql";
import { UPDATE_USER } from "../apollo client/mutation";

export const useUpdateUser = () => {
  return useMutation<UpdateUserResult, { user: UpdateUserInput }>(UPDATE_USER);
};
