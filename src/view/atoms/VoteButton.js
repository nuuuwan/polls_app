import Button from "@mui/material/Button";
import Stack from "@mui/material/Stack";
import HowToVoteIcon from "@mui/icons-material/HowToVote";

export default function VoteButton({ onClick, disabled }) {
  return (
    <Stack direction="row" justifyContent="right" spacing={1} sx={{ m: 1 }}>
      <Button
        sx={{
          maxWidth: 150,
        }}
        startIcon={<HowToVoteIcon />}
        variant="contained"
        onClick={onClick}
        disabled={disabled}
      >
        Vote
      </Button>
    </Stack>
  );
}
