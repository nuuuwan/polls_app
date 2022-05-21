import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";

export default function FAQ({ faq, iFaq }) {
  return (
    <Paper elevation={1} sx={{ margin: 1, padding: 1 }}>
      <Typography variant="h5" sx={{ marginBottom: 1 }}>
        {faq.question}
      </Typography>
      {faq.answerParagraphs.map(function (answer, iAnswer) {
        const fontWeight = iAnswer === 0 ? "bold" : "normal";
        return (
          <Typography
            key={"answer-paragraph-" + iFaq + "-" + iAnswer}
            variant="body1"
            sx={{ marginBottom: 1, fontWeight }}
          >
            {answer}
          </Typography>
        );
      })}
    </Paper>
  );
}
