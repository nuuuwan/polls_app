import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";

export default function FAQ({ faq, iFaq }) {
  return (
    <Paper elevation={0} sx={{ margin: 2, padding: 2 }}>
      <Typography variant="h5" sx={{ marginBottom: 2 }}>
        {faq.question}
      </Typography>

      {faq.answerParagraphs.map(function (paragraph, iParagraph) {
        return (
          <Typography
            key={"answer-paragraph-" + iFaq + "-" + iParagraph}
            variant="body1"
            sx={{ marginBottom: 1}}
          >
            {paragraph}
          </Typography>
        );
      })}
    </Paper>
  );
}
