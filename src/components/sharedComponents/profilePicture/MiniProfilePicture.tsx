import React, { ReactNode, useState } from "react";
import Avatar from "../Avatar";
import ActiveBadge from "../ActiveBadge";
import AccountCircleRoundedIcon from "@mui/icons-material/AccountCircleRounded";

type MiniPictureSize = "small" | "medium" | "large" | "xl";
interface MiniProfilePictureProps {
  firstName: string;
  lastName: string;
  imageSrc?: string;
  link?: string;
  tooltip?: boolean;
  size?: MiniPictureSize;
  active?: boolean;
}

const setSize = (size?: MiniPictureSize) => {
  let circleSize = 40;
  if (size) {
    if (size === "small") {
      circleSize = 25;
    } else if (size === "medium") {
      circleSize = 40;
    } else if (size === "large") {
      circleSize = 50;
    } else if (size === "xl") {
      circleSize = 75;
    }
  }
  return circleSize;
};
interface ActiveAvatarProps {
  active?: boolean;
  ripple?: boolean;
  children: ReactNode;
}
const ActiveAvatar: React.FC<ActiveAvatarProps> = ({
  children,
  ripple = false,
  active = true,
}) => {
  if (active) {
    return <ActiveBadge ripple={ripple}>{children}</ActiveBadge>;
  } else {
    return <div>{children}</div>;
  }
};

const MiniProfilePicture: React.FC<MiniProfilePictureProps> = ({
  size,
  imageSrc,
  firstName,
  lastName,
  link,
  tooltip,
  active = false,
}) => {
  const circleSize = setSize(size);

  const profilePic = imageSrc
    ? imageSrc.startsWith("data:image")
      ? imageSrc // Already a data URI
      : `data:image/jpeg;base64,${imageSrc}` // Add data URI prefix if missing
    : "";

  const [isHovered, setIsHovered] = useState(false);

  const handleMouseEnter = () => {
    setIsHovered(true);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
  };
  return (
    <div onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}>
      <ActiveAvatar active={active} ripple={isHovered}>
        {profilePic ? (
          <Avatar
            tooltip={tooltip}
            firstName={firstName}
            lastName={lastName}
            className=" border-gray-100"
            link={link}
            sx={{ width: circleSize, height: circleSize }}
            src={profilePic}
          ></Avatar>
        ) : (
          <Avatar
            className="bg-transparent"
            tooltip={tooltip}
            firstName={firstName}
            lastName={lastName}
            link={link}
            src={`${process.env.PUBLIC_URL}/images/icons/profile_pic.png`}
            sx={{
              width: circleSize,
              height: circleSize,
              fontSize: `${circleSize / 2}px`,
            }}
          />
        )}
      </ActiveAvatar>
    </div>
  );
};

export default MiniProfilePicture;
