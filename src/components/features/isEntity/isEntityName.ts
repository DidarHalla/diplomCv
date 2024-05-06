import { makeVar } from "@apollo/client";

export const entityNameVar = makeVar<string[]>([]);

export const setEntityName = (name: string) => {
  // const entities = entityNameVar();
  // if (entities.includes(name)) {
  //   entityNameVar(entities.filter((n) => n !== name));
  //   return;
  // }

  entityNameVar([name]);
};

export const resetEntityName = () => {
  entityNameVar([]);
};
