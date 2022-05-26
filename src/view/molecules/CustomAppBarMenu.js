import React, { useState } from "react";
import IconButton from "@mui/material/IconButton";
import Menu from "@mui/material/Menu";
import MenuIcon from "@mui/icons-material/Menu";
import AutorenewIcon from "@mui/icons-material/Autorenew";

import {
  PollIcon,
  HelpIcon,
  CodeIcon,
  UserIcon,
} from "../../view/_constants/CommonIcons.js";
import HelpPage from "../../view/pages/HelpPage";
import PollPage from "../../view/pages/PollPage";
import UserPage from "../../view/pages/UserPage";
import AudioX from "../../nonview/core/AudioX";

import { URL_GITHUB_REPO_POLLS_APP } from "../../nonview/constants/Constants";
import CustomAppBarMenuItem from "./CustomAppBarMenuItem";
import VersionWidget from "../../view/atoms/VersionWidget";

export default function CustomAppBarMenu({ onSelectPage, Page }) {
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const onClick = function (e) {
    setAnchorEl(e.currentTarget);
  };

  const onClose = function () {
    setAnchorEl(null);
  };

  const onClickCode = async function () {
    window.open(URL_GITHUB_REPO_POLLS_APP, "_blank");
    onClose();
    await AudioX.playVote();
  };

  const onSelectPageInner = async function (Page) {
    onSelectPage(Page);
    onClose();
    await AudioX.playClick();
  };

  const onClickRefresh = function () {
    window.location.reload();
  };

  return (
    <div>
      <IconButton
        color="inherit"
        onClick={onClick}
        aria-label="CustomAppBarMenu.button"
      >
        <MenuIcon />
      </IconButton>
      <Menu anchorEl={anchorEl} open={open} onClose={onClose}>
        <CustomAppBarMenuItem
          label="Polls"
          Icon={PollIcon}
          onClick={(e) => onSelectPageInner(PollPage)}
          disabled={Page === PollPage}
        />
        <CustomAppBarMenuItem
          label="User"
          Icon={UserIcon}
          onClick={(e) => onSelectPageInner(UserPage)}
          disabled={Page === UserPage}
        />
        <CustomAppBarMenuItem
          label="Help & FAQs"
          Icon={HelpIcon}
          onClick={(e) => onSelectPageInner(HelpPage)}
          disabled={Page === HelpPage}
        />
        <CustomAppBarMenuItem
          label="Code"
          Icon={CodeIcon}
          onClick={onClickCode}
        />
        <CustomAppBarMenuItem
          label="Refresh App"
          Icon={AutorenewIcon}
          onClick={onClickRefresh}
        />
        <VersionWidget />
      </Menu>
    </div>
  );
}
