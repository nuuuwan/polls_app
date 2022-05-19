import Typography from "@mui/material/Typography";
const WIDTH = "100%";
const HEIGHT = 24;
const STYLE = {
  width: WIDTH,
  height: HEIGHT,
};

export default function PercentageWidget({ answer, n, np }) {
  const color = {
    Yes: "#00534e",
    No: "#8d153a",
    Undecided: "#eb7400",
  }[answer];

  const p = np / n;
  const pStr = parseInt(p * 100 + 0.5) + "%";
  const width = parseInt(p * 80 + 0.5) + "%";
  const styleP = {
    width: width,
    height: HEIGHT,
    backgroundColor: color,
    float: "left",
    marginRight: "5%",
    borderRadius: "10%",
  };

  return (
    <div style={STYLE}>
      <span style={styleP} />
      <Typography variant="body1" sx={{ fontWeight: "bold" }}>
        {pStr}
      </Typography>
    </div>
  );
}
