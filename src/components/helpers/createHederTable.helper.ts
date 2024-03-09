import { Data } from "../pages/users/users.types";

export function createHederTable(
    id: string,
  ...argument:(string|JSX.Element|number)[]

  ): Data {
    return {
      id: id, data: argument
    };
  }