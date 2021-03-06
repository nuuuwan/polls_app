import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";

import FAQParagraph from "./FAQParagraph";

export default function FAQ({ faq, iFaq }) {
  if (faq.question === "divider") {
    return null;
  }

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

      {faq.image ? (
        <img
          alt={faq.question}
          src={"/polls_app/faq/" + faq.image}
          style={{
            maxWidth: "67%",
            marginLeft: 30,
            marginBottom: 30,
            border: "1px solid lightgray",
          }}
        />
      ) : null}
    </Paper>
  );
}
