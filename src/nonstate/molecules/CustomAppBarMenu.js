import React, { useState } from "react";
import IconButton from "@mui/material/IconButton";
import Menu from "@mui/material/Menu";
import MenuIcon from "@mui/icons-material/Menu";

import {
  PollIcon,
  HelpIcon,
  CodeIcon,
  UserIcon,
} from "../../constants/Constants.js";
import HelpPage from "../../stateful/pages/HelpPage";
import PollPage from "../../stateful/pages/PollPage";
import UserPage from "../../stateful/pages/UserPage";

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
    onClose();
  };

  const onSelectPageInner = function (Page) {
    onSelectPage(Page);
    onClose();
  };

  return (
    <div>
      <IconButton color="inherit" onClick={onClick}>
        <MenuIcon />
      </IconButton>
      <Menu anchorEl={anchorEl} open={open} onClose={onClose}>
        <CustomAppBarMenuItem
          label="Polls"
          Icon={PollIcon}
          onClick={(e) => onSelectPageInner(PollPage)}
        />
        <CustomAppBarMenuItem
          label="User"
          Icon={UserIcon}
          onClick={(e) => onSelectPageInner(UserPage)}
        />
        <CustomAppBarMenuItem
          label="Help & FAQs"
          Icon={HelpIcon}
          onClick={(e) => onSelectPageInner(HelpPage)}
        />
        <CustomAppBarMenuItem
          label="Code"
          Icon={CodeIcon}
          onClick={onClickCode}
        />
      </Menu>
    </div>
  );
}
