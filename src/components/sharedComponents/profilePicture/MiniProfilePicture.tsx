import React, { useState } from "react";
import { Avatar } from "../Avatar";

interface MiniProfilePictureProps {
  userDetails: UserDetails;
  media?: Media[];
}
const MiniProfilePicture: React.FC<MiniProfilePictureProps> = ({
  userDetails,
  media=[]
}) => {
  const [profilePic, setProfilePic] = useState<string>(media.find(image => {return image.userId === userDetails.id})?.imageStringBase64 || "");
  return (
    <div>
      {profilePic ? (
        <img
          className="w-[40px] h-[40px] rounded-full"
          alt="profile"
          src={profilePic}
        ></img>
      ) : (
        <Avatar
          username={userDetails?.firstName}
          alt={userDetails.firstName?.toUpperCase() || ""}
          src="/static/images/avatar/1.jpg"
          className="bg-gradient-to-b from-rose-400 via-fuchsia-500 to-indigo-500"
          sx={{ width: 40, height: 40 }}
        />
      )}
    </div>
  );
};

export default MiniProfilePicture;
