import Link from "@mui/material/Link";
import Typography from "@mui/material/Typography";

export default function FAQParagraphItem({ info }) {
  switch (info.infoType) {
    case "link":
      return (
        <Link href={info.href} sx={{ textDecoration: "none" }}>
          <Typography variant="body1" component="span">
            {info.label}
          </Typography>
        </Link>
      );

    default:
      return (
        <Typography variant="body1" component="span">
          {info.text}
        </Typography>
      );
  }
}
