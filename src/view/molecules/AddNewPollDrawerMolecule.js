import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Drawer from "@mui/material/Drawer";
import CloseIcon from "@mui/icons-material/Close";
import IconButton from "@mui/material/IconButton";
import AddIcon from "@mui/icons-material/Add";

import Poll from "../../nonview/core/Poll";
import { PollIcon } from "../../view/_constants/CommonIcons";
import AlignCenter from "../../view/atoms/AlignCenter";
import PollVisibilitySelector from "../../view/molecules/PollVisibilitySelector";
import PollQuestionEditor from "../../view/molecules/PollQuestionEditor";
import PollAnswerListEditor from "../../view/molecules/PollAnswerListEditor";

export default function AddNewPollDrawerMolecule({
  question,
  answerList,
  visibility,
  isOpen,
  onClose,
  onChangeQuestion,
  onChangeAnswerList,
  onChangeVisibility,
  onClickAdd,
}) {
  const style = {
    m: 1,
    p: 1,
    width: Math.min(450, window.innerWidth * 0.85),
  };
  return (
    <Drawer anchor="right" open={isOpen} onClose={onClose}>
      <Box sx={style}>
        <Stack spacing={3}>
          <AlignCenter>
            <IconButton onClick={onClose}>
              <CloseIcon />
            </IconButton>
            <Typography variant="h6">Add New Poll</Typography>
            <PollIcon />
          </AlignCenter>

          <PollQuestionEditor
            question={question}
            onChangeQuestion={onChangeQuestion}
          />

          <PollAnswerListEditor
            answerList={answerList}
            onChangeAnswerList={onChangeAnswerList}
          />

          <PollVisibilitySelector
            visibility={visibility}
            onChange={onChangeVisibility}
          />

          <Box display="flex" justifyContent="flex-end">
            <Button
              onClick={onClickAdd}
              disabled={
                !(
                  Poll.isQuestionValid(question) &&
                  Poll.isAnswerListValid(answerList)
                )
              }
              variant="contained"
              startIcon={<AddIcon />}
            >
              Add New Poll
            </Button>
          </Box>
        </Stack>
      </Box>
    </Drawer>
  );
}
