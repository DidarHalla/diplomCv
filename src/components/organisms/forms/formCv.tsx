import { useForm } from "react-hook-form";
import { CvFormValues, CvProps } from "./formCv.types";
import { useCreateCv } from "../../../hooks/use-cv";
import {
  Button,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
} from "@mui/material";
import { dialogHelpers } from "../../../helpers/form/form.helper";

const Cv = ({ userId, closeDialog }: CvProps) => {
  const {
    formState: { errors, isDirty },
    register,
    handleSubmit,
  } = useForm<CvFormValues>({
    defaultValues: {
      name: "",
      education: "",
      description: "",
    },
  });

  const [createCv, { loading }] = useCreateCv();

  const submit = ({ name, education, description }: CvFormValues) => {
    createCv({
      variables: {
        cv: {
          name,
          education,
          description,
          userId,
        },
      },
    }).then(closeDialog);
  };

  return (
    <>
      <form onSubmit={handleSubmit(submit)}>
        <DialogTitle>Create Cv</DialogTitle>
        <DialogContent>
          <TextField
            {...register("name", {
              validate: (val: string) => {
                if (!val) {
                  return "Required field";
                }
              },
            })}
            label="Name"
            error={!!errors.name}
            helperText={errors.name?.message}
            autoFocus
          />
          <TextField label="Education" {...register("education")} />
          <TextField label="Description" {...register("description")} />
        </DialogContent>
        <DialogActions>
          <Button
            variant="contained"
            type="submit"
            disabled={loading || !isDirty}
          >
            Create
          </Button>
        </DialogActions>
        <Button variant="outlined" onClick={closeDialog}>
          Cancel
        </Button>
      </form>
    </>
  );
};

export const useCvDialog = dialogHelpers<CvProps>(
  (props) => () => {
    return <Cv {...props} />;
  },
  { maxWidth: "sm", fullWidth: true }
);
