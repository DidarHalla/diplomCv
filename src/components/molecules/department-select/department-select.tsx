import { Controller } from "react-hook-form";
import { useDepartaments } from "../../../hooks/use-departaments";
import { DepartmentSelectProps } from "./department-select.types";
import { MenuItem, TextField } from "@mui/material";

export const DepartamentSelect = ({
  name,
  ...props
}: DepartmentSelectProps) => {
  const { data, loading } = useDepartaments();

  return (
    <Controller
      name={name}
      render={({ field }) => (
        <TextField {...props} {...field} disabled={loading} label="Departament">
          <MenuItem value="">{"No Departament"}</MenuItem>
          {data?.departments.map(({ id, name }) => (
            <MenuItem key={id} value={id}>
              {name}
            </MenuItem>
          ))}
        </TextField>
      )}
    />
  );
};
