import Typography from "@mui/material/Typography";

export default function FAQParagraph({ paragraph }) {
  return (
    <Typography variant="body1" sx={{ marginBottom: 1 }}>
      {paragraph}
    </Typography>
  );
}
