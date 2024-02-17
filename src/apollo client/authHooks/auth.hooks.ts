import { makeVar } from "@apollo/client";

interface IErrorMessage {
  id: number;
  type: "error" | "info" | "success";
  message: string;
}

export const errorMessage = makeVar<IErrorMessage[]>([]);
let id = 0;
export const addErrorMessage = (
  message: string,
  type: IErrorMessage["type"] = "info"
) => {
  const idErr = (id += 1);
  errorMessage([...errorMessage(), { id, type, message }]);
  setTimeout(() => {
    errorMessage(errorMessage().filter((error) => error.id !== idErr));
  }, 5000);
};
