import Typography from "@mui/material/Typography";
const WIDTH = "100%";
const HEIGHT = 24;
const STYLE = {
  width: WIDTH,
  height: HEIGHT,
};

const STYLE_INNER = {
  height: HEIGHT,
  backgroundColor: "#1976D2",
  float: "left",
  marginRight: "5%",
  borderRadius: "10%",
  opacity: 0.25,
};

export default function PercentageWidget({ n, np }) {
  const p = np / n;
  const pStr = parseInt(p * 100 + 0.5) + "%";
  const width = parseInt(p * 80 + 0.5) + "%";
  const styleInnerCustom = {
    width: width,
  };

  return (
    <div style={STYLE}>
      <span style={{ ...STYLE_INNER, ...styleInnerCustom }} />
      <Typography variant="body1" sx={{ fontWeight: "bold" }}>
        {pStr}
      </Typography>
    </div>
  );
}
