import { useMutation, useQuery } from "@apollo/client";
import { UpdateUserResult, UserResult } from "../graphql/users/users.types";
import { UpdateUserInput } from "cv-graphql";
import { UPDATE_USER } from "../apollo client/mutation";
import { USER } from "../apollo client/query";

export const useUpdateUser = () => {
  return useMutation<UpdateUserResult, { user: UpdateUserInput }>(UPDATE_USER);
};

export const useUser = (userId?: string) => {
  const query = useQuery<UserResult>(USER, { variables: { userId } });
  return { user: query.data?.user, ...query };
};
