import React, { FC, ReactNode, useState } from "react";
import { Avatar } from "../Avatar";
import ActiveBadge from "../ActiveBadge";

type MiniPictureSize = "small" | "medium" | "large";
interface MiniProfilePictureProps {
  userDetails: UserDetails;
  size?: MiniPictureSize;
  media?: PictureData[];
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
  userDetails,
  size,
  media = [],
  active = false,
}) => {
  const circleSize = setSize(size);
  const [profilePic, setProfilePic] = useState<string>(
    media?.find((image) => {
      return image?.userId === userDetails?.id;
    })?.imageStringBase64 || ""
  );
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
            username={userDetails?.firstName}
            className=" border-gray-100"
            alt="profile"
            sx={{ width: circleSize, height: circleSize}}
            src={profilePic}
          ></Avatar>
      ) : (
          <Avatar
            username={userDetails?.firstName}
            alt={userDetails.firstName?.toUpperCase() || ""}
            src="/static/images/avatar/1.jpg"
            className="bg-gradient-to-b from-rose-400 via-fuchsia-500 to-indigo-500"
            sx={{ width: circleSize, height: circleSize, fontSize: `${circleSize/2}px` }}
          />
        )}
        </ActiveAvatar>
    </div>
  );
};

export default MiniProfilePicture;
