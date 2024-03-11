import { useParams } from "react-router";
import { useCv, useUpdateCv } from "../../../hooks/use-cvs";
import { Controller, useForm } from "react-hook-form";
import { CvFormValues } from "../../organisms/forms/formCv.types";
import { Button, Container, TextField } from "@mui/material";
import { authReactive } from "../../../graphql/authReactive/authReactive";
import { useEffect } from "react";
import { Cv } from "cv-graphql";

export const CvDetails = () => {
  const { cvId = "" } = useParams();
  const { cv, loading } = useCv(cvId);
  const userId = authReactive.getAuth().user$()?.id;

  const {
    formState: { errors, isDirty },
    control,
    reset,
    register,
    handleSubmit,
  } = useForm<CvFormValues>({
    defaultValues: {
      name: cv?.name,
      education: cv?.education || "",
      description: cv?.description,
    },
  });

  useEffect(() => {
    const upForm = async () => {
      new Promise((resolve: (value: Cv) => void) => {
        if (cv) {
          resolve(cv);
        }
      }).then((res) => {
        reset({
          name: res?.name,
          education: res?.education || "",
          description: res?.description,
        });
      });
    };

    upForm();
  }, [loading]);

  const [updateCv] = useUpdateCv();

  const onSubmit = ({ name, education, description }: CvFormValues) => {
    updateCv({
      variables: {
        cv: {
          cvId: cv?.id || "",
          name,
          education,
          description,
          projectsIds: [],
        },
      },
    }).then(() => reset({ name, education, description }));
  };

  return (
    <>
      <Container sx={{ mt: 7 }} maxWidth="md">
        <form
          onSubmit={handleSubmit(onSubmit)}
          style={{ display: "flex", flexDirection: "column", gap: "30px" }}
        >
          <TextField
            {...register("name", {
              validate: (value: string) => {
                if (!value) {
                  return "Required field";
                }
              },
            })}
            autoFocus
            label="Name"
            InputLabelProps={{ shrink: true }}
            error={!!errors.name}
            helperText={errors.name?.message || ""}
          />

          <TextField
            {...register("education")}
            label="Education"
            InputLabelProps={{ shrink: true }}
          />
          <Controller
            name="description"
            control={control}
            render={({ field }) => (
              <TextField
                {...field}
                label={"Description"}
                InputLabelProps={{ shrink: true }}
                multiline
                rows={5}
              />
            )}
          />
          {userId === cv?.user?.id && (
            <Button type="submit" variant="contained" disabled={!isDirty}>
              Update
            </Button>
          )}
        </form>
      </Container>
    </>
  );
};
