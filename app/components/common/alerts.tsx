import { AlertTitle } from "@mui/material";
import Alert from "@mui/material/Alert";
import Stack from "@mui/material/Stack";

export default function Alerts({ msg, code }: { msg: string; code: string }) {
  return (
    <Stack
      sx={{
        width: "30%",
        position: "absolute",
        right: 20,
        top: 100,
        zIndex: 1000,
      }}
      spacing={2}
    >
      {code === "200" && (
        <Alert variant="outlined" severity="success">
          <AlertTitle>Success</AlertTitle>
          <b>{msg}</b>
        </Alert>
      )}
      {code === "400" && (
        <Alert variant="outlined" severity="error">
          <b>{msg}</b>
        </Alert>
      )}
      {false && (
        <>
          <Alert variant="outlined" severity="info">
            {msg}
          </Alert>
          <Alert variant="outlined" severity="warning">
            {msg}
          </Alert>
        </>
      )}
    </Stack>
  );
}
