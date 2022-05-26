import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";

export default function TitledBody({ title, body }) {
  return (
    <Paper elevation={0} sx={{ marginBottom: 1, marginTop: 1 }}>
      <Typography sx={{ fontSize: "small", color: "gray" }}>{title}</Typography>
      <Typography variant="body1">{body}</Typography>
    </Paper>
  );
}
