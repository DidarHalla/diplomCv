import { useForm } from "react-hook-form";
import { CvFormValues, CvProps } from "./formCv.types";
import { useCreateCv } from "../../../hooks/use-cv";
import {
  Button,
  Container,
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
      projectsIds: [],
    },
  });

  const [createCv, { loading }] = useCreateCv();

  const submit = ({
    name,
    education,
    description,
    projectsIds,
  }: CvFormValues) => {
    createCv({
      variables: {
        cv: {
          name,
          education,
          projectsIds,
          description,
          userId,
        },
      },
    }).then(closeDialog);
  };

  return (
    <>
      <Container>
        <form onSubmit={handleSubmit(submit)}>
          <DialogTitle>Create Cv</DialogTitle>
          <DialogContent
            sx={{
              overflowY: "auto",
              paddingRight: "24px",
              paddingBottom: "20px",
              paddingLeft: "24px",
              display: "grid",
              gridTemplateColumns: "1fr" + " 1fr",
              gap: "32px",
              paddingTop: "16px" + " !important",
            }}
          >
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
            <Button variant="outlined" onClick={closeDialog}>
              Cancel
            </Button>
          </DialogActions>
        </form>
      </Container>
    </>
  );
};

export const useCvDialog = dialogHelpers<CvProps>(
  (props) => () => {
    return <Cv {...props} />;
  },
  { maxWidth: "md", fullWidth: true }
);
