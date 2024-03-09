import { useQuery } from "@apollo/client";
import { PositionsResult } from "../graphql/positions/positions.types";
import { POSITIONS } from "../graphql/positions/positions";

export const usePositions = () => {
  const position = useQuery<PositionsResult>(POSITIONS);
  return { positions: position.data,position: position.data, ...position };
};
