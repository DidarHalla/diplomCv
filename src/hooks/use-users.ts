import { useMutation, useQuery } from "@apollo/client";
import { UpdateUserResult } from "../graphql/users/users.types";
import { UpdateUserInput, User } from "cv-graphql";
import { UPDATE_USER } from "../apollo client/mutation";
import { USER } from "../graphql/user";

export const useUpdateUser = () => {
  return useMutation<UpdateUserResult, { user: UpdateUserInput }>(UPDATE_USER);
};

type UserResult = {
  user: User;
};
export const useUser = (userId?: string) => {
  const query = useQuery<UserResult>(USER, { variables: { userId } });
  return { user: query.data?.user, ...query };
};
