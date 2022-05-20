import Typography from "@mui/material/Typography";

export default function PollStatisticsView({ totalVotes }) {
  return <Typography variant="body2">{totalVotes + " votes"}</Typography>;
}
