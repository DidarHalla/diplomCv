import { useQuery } from "@apollo/client";
import { PositionsResult } from "../graphql/positions/positions.types";
import { POSITIONS } from "../graphql/positions/positions";

export const usePositions = () => {
  const position = useQuery<PositionsResult>(POSITIONS);
  return { position: position.data, ...position };
};
