import Stack from "@mui/material/Stack";
import Alert from "@mui/material/Alert";

export default function ValidationBox({
  children,
  isValid,
  alertIfValid,
  alertIfInvalid,
}) {
  const severity = isValid ? "success" : "error";
  const alertBody = isValid ? alertIfValid : alertIfInvalid;
  return (
    <Stack spacing={1}>
      {children}
      <Alert severity={severity}>{alertBody}</Alert>
    </Stack>
  );
}

// import ValidationBox from "../../nonstate/molecules/ValidationBox";
