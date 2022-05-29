import Typography from "@mui/material/Typography";

export default function PollStatisticsTotal({ pollExtended, small }) {
  const fontSize = small ? "x-small" : "small";

  return (
    <Typography style={{ fontSize }}>
      {pollExtended.totalCount + " votes"}
    </Typography>
  );
}
