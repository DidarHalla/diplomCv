import { Data } from "../pages/users/users.types";

export function createHederUsers(
    id: string,
    avatar: JSX.Element,
    first_name: string,
    last_name: string,
    email: string,
    department_name: string,
    position_name: string

  ): Data {
    return {
      id: id, data: [
        avatar,
        first_name,
        last_name,
        email,
        department_name,
        position_name
      ]
    };
  }