import Link from "@mui/material/Link";

export default function SimpleLink({ href }) {
  return (
    <Link href={href} target="_blank" sx={{ marginLeft: 1 }}>
      {href}
    </Link>
  );
}
