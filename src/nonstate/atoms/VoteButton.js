import Button from "@mui/material/Button";
import Stack from "@mui/material/Stack";
import HowToVoteIcon from "@mui/icons-material/HowToVote";

const STYLE_BUTTON = {
  maxWidth: 150,
};

export default function VoteButton({ onClick }) {
  return (
    <Stack direction="row" justifyContent="right" spacing={1} sx={{ m: 1 }}>
      <Button
        sx={STYLE_BUTTON}
        startIcon={<HowToVoteIcon />}
        variant="contained"
        onClick={onClick}
      >
        Vote
      </Button>
    </Stack>
  );
}
