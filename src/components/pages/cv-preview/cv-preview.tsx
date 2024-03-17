import { useParams } from "react-router-dom";
import { useQueryCv } from "../../../hooks/use-cv";
import { Box, Divider, Button, Stack } from "@mui/material";
import { useRef } from "react";
import { useExportPdf } from "../../../hooks/use-exportPdf";
export const CvPreview = () => {
  const [exportPdf]= useExportPdf()

  const { cvId } = useParams();
  const { cv } = useQueryCv(cvId ?? "");
  const ref=useRef<HTMLDivElement>(null)
  return (
    <Box  ref={ref} sx={{ width: "100vw", maxWidth: "900px" }}>
      <Stack
        direction="row"
        spacing={2}
        sx={{
          width: "100%",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <Box>
          <h2>{cv?.user?.profile?.full_name}</h2>
          <h4> {cv?.user?.position_name}</h4>
        </Box>
        <Button
          variant="contained"
          onClick={() => {
            exportPdf({variables:{pdf:{html:ref.current?.innerHTML??""}}})
          }}
        >
          export pdf
        </Button>
      </Stack>

      <Stack
        direction="row"
        divider={
          <Divider
            sx={{ backgroundColor: "blue" }}
            orientation="vertical"
            flexItem
          />
        }
        spacing={5}
      >
        <Box>
          <h4>Education</h4>
          <p>{cv?.education}</p>
          <h4>Language proficiency</h4>
          {cv?.languages.map((v) => {
            return <p>{v.name + "–" + v.proficiency}</p>;
          })}
          <h4>Domain</h4>

          {cv?.projects?.map((v) => (
            <p>{v.domain}</p>
          ))}
        </Box>
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            justifyItem: "left",
          }}
        >
          <h4>{cv?.name}</h4>
          <p>{cv?.description}</p>
          <h4 style={{ margin: "5px 0" }}>Programming languages</h4>
          <p style={{ margin: "5px 0" }}>
            {" "}
            {cv?.skills
              ?.filter((v) => v.category === "Programming languages")
              .map((v) => v.name)
              .join(", ")}
          </p>

          <h4 style={{ margin: "5px 0" }}>Programming technologies</h4>
          <p style={{ margin: "5px 0" }}>
            {" "}
            {cv?.skills
              ?.filter((v) => v.category === "Programming technologies")
              .map((v) => v.name)
              .join(", ")}
          </p>

          <h4 style={{ margin: "5px 0" }}>Database management system</h4>
          <p style={{ margin: "5px 0" }}>
            {" "}
            {cv?.skills
              ?.filter((v) => v.category === "Database management system")
              .map((v) => v.name)
              .join(", ")}
          </p>

          <h4 style={{ margin: "5px 0" }}>Other</h4>
          <p style={{ margin: "5px 0" }}>
            {" "}
            {cv?.skills
              ?.filter((v) => v.category === "")
              .map((v) => v.name)
              .join(", ")}
          </p>

          <h4 style={{ margin: "5px 0" }}>Source control systems</h4>
          <p style={{ margin: "5px 0" }}>
            {" "}
            {cv?.skills
              ?.filter((v) => v.category === "")
              .map((v) => v.name)
              .join(", ")}
          </p>
        </Box>
      </Stack>
    </Box>
  );
};
