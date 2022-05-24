import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormControl from "@mui/material/FormControl";
import FormLabel from "@mui/material/FormLabel";

export default function PollVisibilitySelector({ visibility, onChange }) {
  const onChangeInner = function (e) {
    onChange(e.target.value);
  };

  return (
    <FormControl>
      <FormLabel>Visibility</FormLabel>
      <RadioGroup value={visibility} onChange={onChangeInner}>
        <FormControlLabel
          value="public"
          control={<Radio />}
          label="Public Poll"
        />
        <FormControlLabel
          value="unlisted"
          control={<Radio />}
          label="Unlisted Poll"
        />
      </RadioGroup>
    </FormControl>
  );
}
