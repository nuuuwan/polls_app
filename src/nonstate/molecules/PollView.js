import Button from "@mui/material/Button";
import FormControl from "@mui/material/FormControl";
import FormControlLabel from "@mui/material/FormControlLabel";
import Paper from "@mui/material/Paper";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";

const STYLE = {
  margin: 2,
  padding: 3,
  maxWidth: "50%",
};

export default function PollView({ poll }) {
  return (
    <Paper sx={STYLE}>
      <FormControl>
        <Typography variant="h6">{poll.question}</Typography>
        <RadioGroup>
          {poll.answerList.map(function (answer, iAnswer) {
            return (
              <FormControlLabel
                key={"poll-answer-" + iAnswer}
                value={answer}
                control={<Radio />}
                label={answer}
              />
            );
          })}
        </RadioGroup>
      </FormControl>

      <Stack
        direction="row"
        spacing={1}
        display="flex"
        justifyContent="flex-end"
      >
        <Button variant="contained" disabled>
          Vote by Phone Number
        </Button>
        <Button variant="contained" disabled>
          Vote by Email
        </Button>
        <Button variant="contained">Vote Anonymously</Button>
      </Stack>
    </Paper>
  );
}
