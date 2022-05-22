import Paper from "@mui/material/Paper";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";

import { HelpIcon } from "../../constants/Constants.js";

export default function FAQ({ faq, iFaq }) {
  return (
    <Paper elevation={1} sx={{ margin: 1, padding: 1 }}>
      <Stack direction="row" spacing={1} sx={{ alignItems: "center" }}>
        <HelpIcon />
        <Typography variant="h5" sx={{ marginBottom: 1 }}>
          {faq.question}
        </Typography>
      </Stack>

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
