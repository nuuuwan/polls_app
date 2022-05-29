import AlignCenter from "../../view/atoms/AlignCenter";
import Condition from "../../view/atoms/Condition";
import Typography from "@mui/material/Typography";
import { useTheme } from "@mui/material/styles";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";

export default function PollUserAnswer({pollExtended, small}) {
  const fontSizeSmall = small ? "x-small" : "small";
  const isUserAnswer =
    pollExtended.userAnswer && pollExtended.userAnswer !== "";

  const theme = useTheme();
  const color = isUserAnswer
    ? theme.palette.secondary.main
    : theme.palette.primary.main;

  return (
    <Condition condition={isUserAnswer}>
      <AlignCenter>
        <CheckCircleIcon sx={{ fontSize: fontSizeSmall, color: color }} />
        <Typography style={{ fontSize: fontSizeSmall, color: color }}>
          You voted "{pollExtended.userAnswer}"
        </Typography>
      </AlignCenter>
    </Condition>
  );
}
