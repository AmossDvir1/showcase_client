import React, { useEffect, useState } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Divider,
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
import { TextField as MuiTextField } from "@mui/material";
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
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredFriends, setFilteredFriends] = useState<Friend[] | []>([]);

  const navigate = useNavigate();

  const onFriendClick = (friend: Friend) => {
    closeDialog();
    navigate(`/profile/${friend.urlMapping}`);
  };

  const sortFriendsAlphabetically = (friendsList: Friend[]): Friend[] => {
    return [...friendsList].sort((a, b) =>
      `${a.firstName} ${a.lastName}`.localeCompare(
        `${b.firstName} ${b.lastName}`
      )
    );
  };

  useEffect(() => {
    const getProfileFriends = async () => {
      setLoading(true);
      const res = await getUserFriendsDetails(userId);
      if (res?.data) {
        const sortedFriends = sortFriendsAlphabetically(res.data.friends ?? []);
        setFriends(sortedFriends);
        setFilteredFriends(sortedFriends);
      }
      setLoading(false);
    };
    getProfileFriends();
  }, [userId]);

  useEffect(() => {
    const filtered = friends.filter((friend) =>
      `${friend.firstName} ${friend.lastName}`
        .toLowerCase()
        .includes(searchTerm.toLowerCase())
    );
    setFilteredFriends(filtered);
  }, [searchTerm, friends]);

  const openDialog = () => {
    // Disables Background Scrolling whilst the SideDrawer/Modal is open
    if (typeof window != "undefined" && window.document) {
      document.body.style.overflow = "hidden";
    }
    setIsDialogOpen(true);
  };
  const closeDialog = () => {
    document.body.style.overflow = "unset";
    setIsDialogOpen(false);
  };

  return (
    <div className="bg-paper-light dark:bg-dark-paper shadow-lg border-zinc-200 border-solid border-[1px] p-4 rounded-lg h-full flex flex-col">
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
                  className="text-black dark:text-dark-text font-normal"
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

      <Dialog
        disableScrollLock={false}
        className="bg-paper-light dark:bg-dark-paper"
        open={isDialogOpen}
        onClose={closeDialog}
        fullWidth
        maxWidth="sm"
        disablePortal
      >
        <DialogTitle className="bg-paper-light dark:bg-dark-paper">
          All Friends
        </DialogTitle>
        {/* <Divider /> */}
        <DialogContent className="h-[50rem] overflow-y-auto bg-paper-light dark:bg-dark-paper pb-3 px-6">
          <div className="sticky top-0 z-10 bg-paper-light dark:bg-dark-paper">
            <MuiTextField
              // className="lg:mt-2 mt-2"
              fullWidth
              placeholder="Search friends"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              InputProps={{
                sx: { borderRadius: "100px", cursor: "default" },
                inputProps: {
                  className: `rounded-full input-no-ring lg:text-sm xs:text-xs dark:bg-dark-paper-light
                  dark:placeholder:text-neutral-400 dark:text-dark-text
                  text-black 
                  `,
                },
              }}
            />
            <Typography className="lg:text-base text-sm my-3">
              {filteredFriends.length > 0
                ? `Showing ${filteredFriends.length} friend${
                    filteredFriends.length > 1 ? "s" : ""
                  }`
                : `No results`}
            </Typography>
            <Divider className="my-3" />
          </div>
          <div className="grid grid-cols-2 gap-4">
            {filteredFriends.map((friend) => (
              <div key={friend.id} className="flex items-center gap-2">
                {friend.profilePicture ? (
                  <img
                    src={convertPictureToURI(
                      friend.profilePicture?.imageStringBase64
                    )}
                    alt={`${friend.firstName} ${friend.lastName}`}
                    className="w-12 h-12 lg:w-16 lg:h-16 rounded-full object-cover"
                  />
                ) : (
                  <AccountCircleIcon className="fill-slate-400 w-12 h-12 lg:w-16 lg:h-16 rounded-full"></AccountCircleIcon>
                )}
                <Typography>
                  <Link
                    className="text-black dark:text-dark-text font-normal lg:text-base text-sm"
                    underline="hover"
                    component="button"
                    onClick={() => onFriendClick(friend)}
                  >
                    {`${friend.firstName} ${friend.lastName}`}
                  </Link>
                </Typography>
              </div>
            ))}
          </div>
        </DialogContent>
        <div className="sticky bottom-0 z-10">
          <Divider />
        </div>
        <DialogActions className="bg-paper-light dark:bg-dark-paper flex justify-end px-8">
          <CustomButton
            size="small"
            rounded={false}
            variant="outlined"
            onClick={closeDialog}
            color="primary"
          >
            Close
          </CustomButton>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default ProfileFriendsCard;
