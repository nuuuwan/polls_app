import Typography from "@mui/material/Typography";
import StatisticsX from "../../base/StatisticsX.js";
const WIDTH = "100%";
const HEIGHT = 24;
const STYLE = {
  width: WIDTH,
  height: HEIGHT,
  marginRight: "10%",
};

const STYLE_INNER = {
  height: HEIGHT,
  backgroundColor: "#1976D2",
  float: "left",
};

export default function PercentageWidget({ n, np }) {
  if (!n) {
    return null;
  }

  const { lower, upper } = StatisticsX.getErrorBounds(n, np);
  const [lowerStr, upperStr] = [lower, upper].map((x) =>
    parseInt(x * 100 + 0.5)
  );

  let pStr;
  if (lowerStr === upperStr) {
    pStr = lowerStr + "%";
  } else {
    pStr = lowerStr + " - " + upperStr + "%";
  }
  const widthLower = parseInt(lower * 80 + 0.5) + "%";
  const widthSpan = parseInt((upper - lower) * 80 + 0.5) + "%";
  const styleInnerLower = {
    width: widthLower,
    opacity: 0.2,
  };
  const styleInnerSpan = {
    width: widthSpan,
    opacity: 0.3,
    marginRight: "5%",
  };

  return (
    <div style={STYLE}>
      <span style={{ ...STYLE_INNER, ...styleInnerLower }} />
      <span style={{ ...STYLE_INNER, ...styleInnerSpan }} />
      <Typography variant="body2">{pStr}</Typography>
    </div>
  );
}
