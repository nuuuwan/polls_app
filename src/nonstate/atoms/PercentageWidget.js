import Typography from "@mui/material/Typography";
const WIDTH = 400;
const HEIGHT = 24;
const STYLE = {
  width: WIDTH,
  height: HEIGHT,
};

export default function PercentageWidget({ n, np }) {
  const p = np / n;
  const styleP = {
    width: parseInt(p * 100 + 0.5) + "%",
    height: HEIGHT,
    backgroundColor: "lightgray",
    float: "left",
    marginRight: "5%",
    borderRadius: "10%",
  };
  const pStr = parseInt(p * 100 + 0.5) + "%";

  return (
    <div style={STYLE}>
      <span style={styleP} />
      <Typography variant="body1" sx={{ float: "right" }}>
        {pStr}
      </Typography>
    </div>
  );
}
