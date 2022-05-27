import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Drawer from "@mui/material/Drawer";
import IconButton from "@mui/material/IconButton";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import AddIcon from "@mui/icons-material/Add";
import CloseIcon from "@mui/icons-material/Close";

import { PollIcon } from "../../view/_constants/CommonIcons";
import AlignCenter from "../../view/atoms/AlignCenter";
import PollAnswerListEditor from "../../view/molecules/PollAnswerListEditor";
import PollQuestionEditor from "../../view/molecules/PollQuestionEditor";
import PollVisibilitySelector from "../../view/molecules/PollVisibilitySelector";

export default function AddNewPollDrawerMolecule({
  poll,
  isOpen,
  onClose,
  onChangePoll,
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

          <PollQuestionEditor poll={poll} onChangePoll={onChangePoll} />
          <PollAnswerListEditor poll={poll} onChangePoll={onChangePoll} />
          <PollVisibilitySelector poll={poll} onChangePoll={onChangePoll} />

          <Box display="flex" justifyContent="flex-end">
            <Button
              onClick={onClickAdd}
              disabled={!(poll.isQuestionValid && poll.isAnswerListValid)}
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
