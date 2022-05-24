import Typography from "@mui/material/Typography";
import StatisticsXFuture from "../../base/StatisticsXFuture";

const SLIDER_WIDTH_P = 67;
const HEIGHT = 18;

export default function PercentageWidget({ n, np, color }) {
  if (!n || n < StatisticsXFuture.MIN_STATISTICAL_N) {
    return null;
  }

  const styleInner = {
    height: HEIGHT,
    backgroundColor: color,
    float: "left",
  };

  const { lower, upper, p } = StatisticsXFuture.getErrorBounds(n, np);
  const numberOfVotesLabel = np + " votes";

  const widthLower = parseInt(lower * SLIDER_WIDTH_P + 0.5) + "%";
  const widthSpanLower = parseInt((p - lower) * SLIDER_WIDTH_P + 0.5) + "%";
  const widthSpanUpper = parseInt((upper - p) * SLIDER_WIDTH_P + 0.5) + "%";
  const widthRemainder = parseInt((1 - upper) * SLIDER_WIDTH_P + 0.5) + "%";

  const styleInnerLower = {
    width: widthLower,
    opacity: 0.3,
  };
  const styleInnerSpanLower = {
    width: widthSpanLower,
    opacity: 0.4,
    borderRight: "1px black solid",
  };
  const styleInnerSpanUpper = {
    width: widthSpanUpper,
    opacity: 0.4,
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
      <span style={{ ...styleInner, ...styleInnerSpanLower }} />
      <span style={{ ...styleInner, ...styleInnerSpanUpper }} />
      <span style={{ ...styleInner, ...styleInnerRemainder }} />
      <Typography style={styleLabel}>{numberOfVotesLabel}</Typography>
    </div>
  );
}
