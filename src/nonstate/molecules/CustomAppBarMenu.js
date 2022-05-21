import React, { useState } from "react";
import IconButton from "@mui/material/IconButton";
import Menu from "@mui/material/Menu";
import MenuIcon from "@mui/icons-material/Menu";
import GitHubIcon from "@mui/icons-material/GitHub";
import HelpIcon from "@mui/icons-material/Help";
import HelpPage from "../../stateful/pages/HelpPage";

import { URL_GITHUB_REPO_POLLS_APP } from "../../constants/Constants";
import CustomAppBarMenuItem from "./CustomAppBarMenuItem";

export default function CustomAppBarMenu({ onSelectPage }) {
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);

  const onClick = function (e) {
    setAnchorEl(e.currentTarget);
  };

  const onClose = function () {
    setAnchorEl(null);
  };

  const onClickCode = function () {
    window.open(URL_GITHUB_REPO_POLLS_APP, "_blank");
  };

  return (
    <div>
      <IconButton color="inherit" onClick={onClick}>
        <MenuIcon />
      </IconButton>
      <Menu anchorEl={anchorEl} open={open} onClose={onClose}>
        <CustomAppBarMenuItem
          label="Help & FAQs"
          Icon={HelpIcon}
          onClick={(e) => onSelectPage(HelpPage)}
        />
        <CustomAppBarMenuItem
          label="Code"
          Icon={GitHubIcon}
          onClick={onClickCode}
        />
      </Menu>
    </div>
  );
}
