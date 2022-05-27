import Alert from "@mui/material/Alert";
import FormControl from "@mui/material/FormControl";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormLabel from "@mui/material/FormLabel";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import Typography from "@mui/material/Typography";

import { PublicIcon, UnlistedIcon } from "../../view/_constants/CommonIcons";
import AlignCenter from "../../view/atoms/AlignCenter";

export default function PollVisibilitySelector({ poll, onChangePoll }) {
  const onChangeVisibility = function (e) {
    const newVisibility = e.target.value;
    poll.visibility = newVisibility;
    onChangePoll(poll);
  };

  const alertMessage =
    poll.visibility === "public" ? (
      <>
        You have chossen <strong>"public"</strong>, which means that this poll{" "}
        <strong>will</strong> appear when users search for polls and on "Random
        Public Polls". If you don't want this, choose{" "}
        <strong>"unlisted"</strong>.
      </>
    ) : (
      <>
        You have chossen <strong>"unlisted"</strong>, which means that this poll{" "}
        <strong>will not</strong> appear when users search for polls and on
        "Random Poll". The only way to share this poll is with a link. Anyone
        with a link to this poll can see it. If you don't want this, choose{" "}
        <strong>"public"</strong>.
      </>
    );

  return (
    <FormControl>
      <FormLabel>Visibility</FormLabel>
      <RadioGroup value={poll.visibility} onChange={onChangeVisibility}>
        <FormControlLabel
          value="public"
          control={<Radio />}
          label={
            <AlignCenter>
              <PublicIcon />
              <Typography>Public Poll</Typography>
            </AlignCenter>
          }
        />
        <FormControlLabel
          value="unlisted"
          control={<Radio />}
          label={
            <AlignCenter>
              <UnlistedIcon />
              <Typography>Unlisted Poll</Typography>
            </AlignCenter>
          }
        />
      </RadioGroup>
      <Alert severity="info">{alertMessage}</Alert>
    </FormControl>
  );
}
