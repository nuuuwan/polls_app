import Typography from "@mui/material/Typography";
import StatisticsXFuture from "../../base/StatisticsXFuture";
import { useTheme } from "@mui/material/styles";

const SLIDER_WIDTH_P = 67;
const HEIGHT = 18;

export default function PercentageWidget({ n, np }) {
  const color = useTheme().palette.primary.main;

  if (!n || n < StatisticsXFuture.MIN_STATISTICAL_N) {
    return null;
  }

  const styleInner = {
    height: HEIGHT,
    backgroundColor: color,
    float: "left",
  };

  const { lower, upper } = StatisticsXFuture.getErrorBounds(n, np);
  const [lowerStr, upperStr] = [lower, upper].map((x) =>
    parseInt(x * 100 + 0.5)
  );

  let pStr;
  if (lowerStr === upperStr) {
    pStr = lowerStr + "%";
  } else {
    pStr = lowerStr + " - " + upperStr + "%";
  }

  const widthLower = parseInt(lower * SLIDER_WIDTH_P + 0.5) + "%";
  const widthSpan = parseInt((upper - lower) * SLIDER_WIDTH_P + 0.5) + "%";
  const widthRemainder = parseInt((1 - upper) * SLIDER_WIDTH_P + 0.5) + "%";

  const styleInnerLower = {
    width: widthLower,
    opacity: 0.2,
  };
  const styleInnerSpan = {
    width: widthSpan,
    opacity: 0.5,
  };
  const styleInnerRemainder = {
    width: widthRemainder,
    backgroundColor: "#f0f0f0",
    marginRight: "2%",
  };

  const styleLabel = {
    fontSize: "small",
    float: "right",
    margin: 0,
    padding: 0,
  };

  return (
    <div>
      <span style={{ ...styleInner, ...styleInnerLower }} />
      <span style={{ ...styleInner, ...styleInnerSpan }} />
      <span style={{ ...styleInner, ...styleInnerRemainder }} />
      <Typography style={styleLabel}>{pStr}</Typography>
    </div>
  );
}
