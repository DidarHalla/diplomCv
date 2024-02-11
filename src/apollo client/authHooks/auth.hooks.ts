import { useLazyQuery, useMutation } from "@apollo/client";
import { SIGN_NUP } from "../mutation";
import { LOGIN } from "../query";

export const useSignup = () => {
  return useMutation(SIGN_NUP);
};

export const useLogin = () => {
  return useLazyQuery(LOGIN);
};
