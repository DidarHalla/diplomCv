import { Controller } from "react-hook-form";
import { usePositions } from "../../../hooks/use-position";
import { PositionSelectProps } from "./position-select.types";
import { MenuItem, TextField } from "@mui/material";

export const PositionSelect = ({ name, ...props }: PositionSelectProps) => {
  const { position } = usePositions();

  return (
    <Controller
      name={name}
      render={({ field }) => {
        return (
          <TextField {...props} {...field} select label={"Position"}>
            <MenuItem value="">{"No position"}</MenuItem>
            {position?.positions.map(({ id, name }) => (
              <MenuItem key={id} value={id}>
                {name}
              </MenuItem>
            ))}
          </TextField>
        );
      }}
    />
  );
};
