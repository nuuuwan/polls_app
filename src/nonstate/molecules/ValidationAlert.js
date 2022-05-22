import Alert from "@mui/material/Alert";

export default function ValidationAlert({ isInvalid, children }) {
  const severity = isInvalid ? "error" : "success";
  return <Alert severity={severity}>{children}</Alert>;
}
