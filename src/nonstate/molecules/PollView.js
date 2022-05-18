import Button from "@mui/material/Button";
import FormControl from "@mui/material/FormControl";
import FormControlLabel from "@mui/material/FormControlLabel";
import Paper from "@mui/material/Paper";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";

import EmailIcon from "@mui/icons-material/Email";
import FaceRetouchingOffIcon from "@mui/icons-material/FaceRetouchingOff";
import PhoneAndroidIcon from "@mui/icons-material/PhoneAndroid";

const STYLE = {
  margin: 2,
  padding: 3,
  maxWidth: 500,
};

const STYLE_BUTTON = {
  maxWidth: 300,
};

export default function PollView({ poll }) {
  return (
    <Paper sx={STYLE}>
      <FormControl>
        <Typography variant="h6">{poll.question}</Typography>
        <RadioGroup>
          {Object.entries(poll.answerValueToLabel).map(function (
            [answerValue, answerLabel],
            iAnswer
          ) {
            return (
              <FormControlLabel
                key={"poll-answer-" + iAnswer}
                value={answerValue}
                control={<Radio />}
                label={answerLabel}
              />
            );
          })}
        </RadioGroup>
      </FormControl>

      <Stack spacing={1} sx={{ margin: 2 }}>
        <Button
          sx={STYLE_BUTTON}
          startIcon={<PhoneAndroidIcon />}
          variant="contained"
          disabled
        >
          Vote with Phone
        </Button>
        <Button
          sx={STYLE_BUTTON}
          startIcon={<EmailIcon />}
          variant="contained"
          disabled
        >
          Vote with Email
        </Button>
        <Button
          sx={STYLE_BUTTON}
          startIcon={<FaceRetouchingOffIcon />}
          variant="contained"
        >
          Vote Anonymously
        </Button>
      </Stack>
    </Paper>
  );
}
