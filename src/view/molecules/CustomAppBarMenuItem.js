import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import MenuItem from "@mui/material/MenuItem";

export default function CustomAppBarMenuItem({
  label,
  Icon,
  onClick,
  disabled,
}) {
  return (
    <MenuItem onClick={onClick} disabled={disabled}>
      <ListItemIcon>
        <Icon />
      </ListItemIcon>
      <ListItemText>{label}</ListItemText>
    </MenuItem>
  );
}
