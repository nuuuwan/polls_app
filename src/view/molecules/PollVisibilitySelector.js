import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormControl from "@mui/material/FormControl";
import FormLabel from "@mui/material/FormLabel";
import Alert from "@mui/material/Alert";
import AlignCenter from "../../view/atoms/AlignCenter";
import Typography from "@mui/material/Typography";

import { PublicIcon, UnlistedIcon } from "../../view/_constants/CommonIcons";

export default function PollVisibilitySelector({ visibility, onChange }) {
  const onChangeInner = function (e) {
    onChange(e.target.value);
  };

  const alertMessage =
    visibility === "public" ? (
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
      <RadioGroup value={visibility} onChange={onChangeInner}>
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
