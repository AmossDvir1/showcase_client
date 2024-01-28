import React, { useEffect, useState } from "react";
import { getUserFriends } from "../../controllers/friendsController/getUserFriends";
import { Link, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";

interface FriendsListProps {
  userData: UserProfile;
}
const FriendsList: React.FC<FriendsListProps> = ({ userData }) => {
  const navigate = useNavigate();

  const [profileFriends, setProfileFriends] = useState<UserDetails[]>([]);

  useEffect(() => {
    const getProfileFriends = async () => {
      if (userData?.id) {
        const res = await getUserFriends(userData.id);
        if (res?.data) {
          setProfileFriends(res.data.friends);
        }
      }
    };
    getProfileFriends();
  }, [userData]);

  const onFriendClick = (friend: UserDetails) => {
    navigate(`/profile/${friend.urlMapping}`);
  };

  return (
    <div className="flex flex-col items-center mt-8 space-y-4">
      {profileFriends?.length > 0 &&
        profileFriends.map((friend, index) => (
          <Typography key={index} className="text-black">
                  <Link
                    className="text-black font-normal"
                    underline="hover"
                    component="button"
                    onClick={() => onFriendClick(friend)}
                  >
                    {`${friend.firstName} ${friend.lastName}`}
                  </Link>
          </Typography>
        ))}
    </div>
  );
};

export default FriendsList;
