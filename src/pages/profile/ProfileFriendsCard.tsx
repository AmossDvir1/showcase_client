import React, { useEffect, useState } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
} from "@mui/material";
import Typography from "../../components/sharedComponents/Typography";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import { useNavigate } from "react-router-dom";
import Link from "@mui/material/Link";
import Loader from "../../components/sharedComponents/Loader";
import { Button } from "../../components/sharedComponents/Button";
import { convertPictureToURI } from "../../utils/utils";
import { getUserFriendsDetails } from "../../controllers/friendsController/getUserFriends";
import CustomButton from "../../components/sharedComponents/CustomButton";

type Friend = {
  username: string;
  firstName: string;
  lastName: string;
  email: string;
  urlMapping: string;
  profilePicture: PictureData;
  id: string;
};

type ProfileFriendsCardProps = {
  userId?: string;
};

const ProfileFriendsCard: React.FC<ProfileFriendsCardProps> = ({ userId }) => {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [friends, setFriends] = useState<Friend[] | []>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const navigate = useNavigate();

  const onFriendClick = (friend: Friend) => {
    navigate(`/profile/${friend.urlMapping}`);
  };

  useEffect(() => {
    const getProfileFriends = async () => {
      setLoading(true);
      const res = await getUserFriendsDetails(userId);
      if (res?.data) {
        setFriends(res?.data?.friends ?? []);
      }
      setLoading(false);
    };
    getProfileFriends();
  }, [userId]);

  const openDialog = () => setIsDialogOpen(true);
  const closeDialog = () => setIsDialogOpen(false);

  return (
    <div className="bg-[#fcfcfc] dark:bg-dark-paper shadow-lg border-zinc-200 border-solid border-[1px] p-4 rounded-lg h-full flex flex-col">
      <div className="flex flex-col mb-4 justify-center">
        <Typography className="text-black text-xl font-medium">
          Friends
        </Typography>
        <Typography className="text-gray-400 text-md font-normal">
          {!loading ? `${friends.length} friends` : ""}
        </Typography>
      </div>
      <div className="flex flex-wrap gap-2">
        {loading ? (
          <div className="m-auto">
            <Loader></Loader>
          </div>
        ) : (
          friends?.length > 0 &&
          friends.slice(0, 6).map((friend) => (
            <div key={friend.id} className="text-center">
              {friend.profilePicture ? (
                <img
                  src={convertPictureToURI(
                    friend.profilePicture?.imageStringBase64
                  )}
                  alt={`${friend.firstName} ${friend.lastName}`}
                  className="w-20 h-20 rounded-lg mx-auto object-cover"
                />
              ) : (
                <AccountCircleIcon className="fill-slate-400 w-20 h-20 rounded-lg mx-auto"></AccountCircleIcon>
              )}
              <Typography component={"div"}>
                <Link
                  className="text-black dark:text-dark-text-light font-normal"
                  underline="hover"
                  component="button"
                  onClick={() => onFriendClick(friend)}
                >
                  {`${friend.firstName} ${friend.lastName}`}
                </Link>
              </Typography>
            </div>
          ))
        )}
      </div>
      <div className="mt-auto w-full">
        <CustomButton
        fullWidth
          className="w-full px-4 py-2 text-sm"
          variant="outlined"
          size="medium"
          glow={false}
          onClick={openDialog}
        >
          See All Friends
        </CustomButton>
      </div>

      <Dialog open={isDialogOpen} onClose={closeDialog} fullWidth maxWidth="sm">
        <DialogTitle>All Friends</DialogTitle>
        <DialogContent>
          <div className="flex flex-col gap-2">
            {friends.map((friend) => (
              <div key={friend.id} className="flex items-center gap-2">
                {friend.profilePicture ? (
                  <img
                    src={convertPictureToURI(
                      friend.profilePicture?.imageStringBase64
                    )}
                    alt={`${friend.firstName} ${friend.lastName}`}
                    className="w-20 h-20 rounded-lg mx-auto object-cover"
                  />
                ) : (
                  // <div className="">
                  <AccountCircleIcon className=" fill-slate-400 w-20 h-20 rounded-lg mx-auto"></AccountCircleIcon>
                  // </div>
                )}
                <Typography>{`${friend.firstName} ${friend.lastName}`}</Typography>
              </div>
            ))}
          </div>
        </DialogContent>
        <DialogActions>
          <Button onClick={closeDialog} color="primary">
            Close
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default ProfileFriendsCard;
