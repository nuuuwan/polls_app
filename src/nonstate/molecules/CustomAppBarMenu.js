import React, { useState } from "react";
import IconButton from "@mui/material/IconButton";
import Menu from "@mui/material/Menu";
import MenuIcon from "@mui/icons-material/Menu";
import GitHubIcon from "@mui/icons-material/GitHub";
import HelpIcon from "@mui/icons-material/Help";

import CustomAppBarMenuItem from "./CustomAppBarMenuItem.js";

const MENU_ITEM_LIST = [
  {
    name: "Help",
    url: "https://twitter.com/nuuuwan/status/1522912345256865795",
    details: "Help, Examples and Usage",
    Icon: HelpIcon,
  },
  {
    name: "Code",
    url: "http://github.com/nuuuwan",
    details: "Visualization, Design and App by @nuuuwan",
    Icon: GitHubIcon,
  },
];

export default function CustomAppBarMenu() {
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);

  const onClick = function (e) {
    setAnchorEl(e.currentTarget);
  };

  const onClose = function () {
    setAnchorEl(null);
  };

  return (
    <div>
      <IconButton color="inherit" onClick={onClick}>
        <MenuIcon />
      </IconButton>
      <Menu anchorEl={anchorEl} open={open} onClose={onClose}>
        {MENU_ITEM_LIST.map(function (menuItem, i) {
          const onClick = function (e) {
            window.open(menuItem.url, "_blank");
            onClose();
          };
          return (
            <CustomAppBarMenuItem
              key={"app-bar-menu-item-" + i}
              Icon={menuItem.Icon}
              onClick={onClick}
            />
          );
        })}
      </Menu>
    </div>
  );
}
