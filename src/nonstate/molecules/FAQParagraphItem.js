import Typography from "@mui/material/Typography";
import Link from "@mui/material/Link";

export default function FAQParagraphItem({ info }) {
  switch (info.infoType) {
    case "link":
      return (
        <Link href={info.href} sx={{ textDecoration: "none" }}>
          <Typography variant="body2" component="span">
            {info.label}
          </Typography>
        </Link>
      );

    default:
      return (
        <Typography variant="body2" component="span">
          {info.text}
        </Typography>
      );
  }
}
