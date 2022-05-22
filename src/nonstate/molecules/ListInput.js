import { useState } from "react";
import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";
import Chip from "@mui/material/Chip";
import TextField from "@mui/material/TextField";

export default function ListInput({
  label,
  placeholder,
  required,
  value,
  onChange,
}) {
  const [list, setList] = useState(value);
  const [currentText, setCurrentText] = useState("");

  const onKeyUp = function (e) {
    if (e.keyCode === 13) {
      let currentList = list;
      currentList.push(currentText);
      setList(currentList);
      setCurrentText("");
      onChange(currentList);
    }
  };

  const onChangeInternal = function (e) {
    setCurrentText(e.target.value);
  };

  return (
    <Stack spacing={1}>
      <TextField
        required
        label={label}
        value={currentText}
        placeholder={placeholder}
        onKeyUp={onKeyUp}
        onChange={onChangeInternal}
      />
      <Box>
        {list.map(function (listItem, iItem) {
          return <Chip key={"chip-" + iItem} label={listItem} sx={{ m: 1 }} />;
        })}
      </Box>
    </Stack>
  );
}
