import { useMutation, useQuery } from "@apollo/client";
import { UpdateUserInput, User } from "cv-graphql";
import { UpdateUserResult, UserResult } from "../graphql/users/users.types";
import { UPDATE_USER } from "../graphql/auth/mutation";
import { USER } from "../graphql/auth/query";
import { USERS } from "../graphql/users/users";

export const useUpdateUser = () => {
  return useMutation<UpdateUserResult, { user: UpdateUserInput }>(UPDATE_USER, {
    refetchQueries: [USERS],
  });
};

export const useUser = (userId?: string) => {
  const query = useQuery<UserResult>(USER, { variables: { userId } });
  return { user: query.data?.user, ...query };
};

export const useUsers = () => {
  const data = useQuery<{ users: User[] }>(USERS);
  return { users: data.data, ...data };
};
