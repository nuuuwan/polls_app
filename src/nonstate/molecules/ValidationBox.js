import Stack from "@mui/material/Stack";
import Alert from "@mui/material/Alert";

export default function ValidationBox({
  children,
  isValid,
  alertIfValid,
  alertIfInvalid,
}) {
  const severity = isValid ? "success" : "info";
  const alertBody = isValid ? alertIfValid : alertIfInvalid;
  return (
    <Stack spacing={1}>
      {children}
      {alertBody ? <Alert severity={severity}>{alertBody}</Alert> : null}
    </Stack>
  );
}

// import ValidationBox from "../../nonstate/molecules/ValidationBox";
