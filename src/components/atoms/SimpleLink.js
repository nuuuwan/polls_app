import Link from "@mui/material/Link";

export default function SimpleLink({ href, label }) {
  label = label ? label : href;
  return (
    <Link href={href} target="_blank" sx={{ textDecoration: "none" }}>
      {label}
    </Link>
  );
}
