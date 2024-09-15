import { AlertTitle } from "@mui/material";
import Alert from "@mui/material/Alert";
import Stack from "@mui/material/Stack";
import { useState, useEffect } from "react";

export default function Alerts({
  msg,
  code,
  random,
}: {
  msg: string;
  code: string;
  random: number;
}) {
  const [visible, setVisible] = useState(true); // Use useState for visibility

  useEffect(() => {
    // Set the alert to be visible every time msg or code changes
    setVisible(true);

    // Set a timeout to hide the alert after 3 seconds
    const timer = setTimeout(() => {
      setVisible(false);
    }, 3000);
    return () => clearTimeout(timer);
  }, [msg, code, random]);

  if (!visible) return null;

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
    </Stack>
  );
}
