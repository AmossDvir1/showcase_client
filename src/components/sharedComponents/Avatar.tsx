import React from "react";
import { AvatarProps, Avatar as MuiAvatar } from "@mui/material";
import { Tooltip } from "./Tooltip";
import { useNavigate } from "react-router-dom";
import { useContext } from "react";
import { AvatarGroupContext } from "./profilePicture/AvatarGroup";

interface Props extends AvatarProps {
  firstName: string;
  lastName: string;
  link?: string;
  tooltip?: boolean;
  imageSrc?: string;
}

const Avatar: React.FC<Props> = ({ firstName, lastName, link, tooltip = false, imageSrc, children, ...rest }) => {
    const navigate = useNavigate();
    const inAvatarGroup = useContext(AvatarGroupContext);
    const onAvatarClick = (link: string) => {
        navigate(`/profile/${link}`);
    };

    const pic = imageSrc
        ? imageSrc.startsWith("data:image")
            ? imageSrc // Already a data URI
            : `data:image/jpeg;base64,${imageSrc}` // Add data URI prefix if missing
        : "";

    const avatarElement = (
        <MuiAvatar
            onClick={link && link !== "" ? () => onAvatarClick(link) : undefined}
            alt={`${firstName} ${lastName}`}
            src={pic || ""}
            {...rest}
        >
            {children}
        </MuiAvatar>
    );


    return (
        <>
        {tooltip ? (
          <Tooltip title={`${firstName} ${lastName}`}>{avatarElement}</Tooltip>
          ) : (
            avatarElement
          )}
        </>
    );
};

export default Avatar;