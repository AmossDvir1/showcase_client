import React from "react";
import { AvatarProps, Avatar as MuiAvatar } from "@mui/material";
import { Tooltip } from "./Tooltip";
import { useNavigate } from "react-router-dom";

interface Props extends AvatarProps {
  firstName: string;
  lastName: string;
  link?: string;
  tooltip?: boolean;
}

const Avatar: React.FC<Props> = ({ firstName, lastName, link, tooltip = false, ...rest }) => {
  const navigate = useNavigate();
  const onAvatarClick = (link: string) => {
    navigate(`/profile/${link}`);
  };

  const avatarElement = (
    <MuiAvatar
      onClick={link && link !== "" ? () => onAvatarClick(link) : undefined}
      alt={`${firstName} ${lastName}`}
      {...rest}
    />
  );

  return (
    <div>
      {tooltip ? (
        <Tooltip title={`${firstName} ${lastName}`}>{avatarElement}</Tooltip>
      ) : (
        avatarElement
      )}
    </div>
  );
};

export default Avatar;