import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";

import FAQParagraph from "./FAQParagraph";

export default function FAQ({ faq, iFaq }) {
  return (
    <Paper elevation={0} sx={{ padding: 1 }}>
      <Typography variant="h5" sx={{ marginBottom: 1 }}>
        {faq.question}
      </Typography>

      {faq.answerParagraphs.map(function (paragraph, iParagraph) {
        return (
          <FAQParagraph
            key={"answer-paragraph-" + iFaq + "-" + iParagraph}
            paragraph={paragraph}
          />
        );
      })}
    </Paper>
  );
}
