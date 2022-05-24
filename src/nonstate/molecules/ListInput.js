import { useState } from "react";
import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";
import Chip from "@mui/material/Chip";
import TextField from "@mui/material/TextField";
import FormLabel from "@mui/material/FormLabel";

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

  const onDeleteChip = function (listItem) {
    let listCopy = list;
    const iItem = listCopy.indexOf(listItem);
    if (iItem !== -1) {
      listCopy.splice(iItem, 1);
    }
    setList(listCopy);
    onChange(listCopy);
  };

  return (
    <Stack spacing={1}>
      <FormLabel>{label}</FormLabel>
      <TextField
        required
        value={currentText}
        placeholder={placeholder}
        onKeyUp={onKeyUp}
        onChange={onChangeInternal}
      />
      <Box>
        {list.map(function (listItem, iItem) {
          const onDelete = function () {
            onDeleteChip(listItem);
          };
          return (
            <Chip
              key={"chip-" + iItem}
              label={listItem}
              sx={{ m: 1 }}
              onDelete={onDelete}
            />
          );
        })}
      </Box>
    </Stack>
  );
}
