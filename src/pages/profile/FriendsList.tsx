import React, { useEffect, useState } from "react";
import { getUserFriends } from "../../controllers/friendsController/getUserFriends";
import { Link, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";
import Loader from "../../components/sharedComponents/Loader";

interface FriendsListProps {
  userData: UserProfile;
  setUserData:React.Dispatch<React.SetStateAction<UserProfile | null>>;
}
const FriendsList: React.FC<FriendsListProps> = ({ userData, setUserData }) => {
  const navigate = useNavigate();

  const [profileFriends, setProfileFriends] = useState<UserDetails[]>([]);
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    const getProfileFriends = async () => {
      if (userData?.id) {
        setLoading(true);
        const res = await getUserFriends(userData.id);
        if (res?.data) {
          setLoading(false);

          setProfileFriends(res.data.friends);
        }
      }
    };
    getProfileFriends();
  }, [userData]);

  const onFriendClick = (friend: UserDetails) => {
    navigate(`/profile/${friend.urlMapping}`);
    setUserData(null);
  };

  return (
    <div className="flex flex-col items-center mt-8 space-y-4">
      {loading ? <div><Loader></Loader></div>:profileFriends?.length > 0 &&
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
