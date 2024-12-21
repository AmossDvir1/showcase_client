import {
  Collapse,
  Divider,
  IconButton,
  Popper,
} from "@mui/material";
import React, { useRef, useState } from "react";
import CloseIcon from "@mui/icons-material/Close";
import { useSelector } from "react-redux";
import { IoChatboxEllipses } from "react-icons/io5";
import MiniProfilePicture from "../sharedComponents/profilePicture/MiniProfilePicture";
import { RootState } from "../../redux/rootReducer";
import ChatContacts from "./ChatContacts";
import Typography from "../sharedComponents/Typography";
import { useNavigate } from "react-router-dom";

interface ChatDrawerProps {
  onMenuBar?: boolean;
}

const ChatDrawer: React.FC<ChatDrawerProps> = ({ onMenuBar = false }) => {
  const chatBottomRef = useRef(null);
  const navigate = useNavigate();
  const [chatMenuOpen, setChatMenuOpen] = useState(false);
  const userInfo = useSelector((state: RootState) => state.user.userInfo);
  const [anchorEl, setAnchorEl] = useState<HTMLButtonElement | null>(null);

  const onOpenChatDrawer = (e: React.MouseEvent<HTMLButtonElement>) => {
    // setAnchorEl(event.currentTarget);
    setAnchorEl(chatBottomRef.current);
    setChatMenuOpen((previousOpen) => !previousOpen);
  };

  const navigateToMessenger = () => {
    navigate("/messenger");
  }

  const open = Boolean(anchorEl) && chatMenuOpen;

  return (
    <div className="relative flex z-30">
      {onMenuBar ? (
        <IconButton
          ref={chatBottomRef}
          className="px-1"
          onClick={navigateToMessenger}
          // onClick={onOpenChatDrawer}
        >
          <IoChatboxEllipses
            className="fill-primary w-5 h-5"
            fontSize="medium"
          />
        </IconButton>
      ) : (
        <div
          ref={chatBottomRef}
          className="md:w-44 xs:w-30 flex justify-center items"
        >
          <IconButton
            onClick={onOpenChatDrawer}
            className="bg-primary text-white p-4 mb-2"
          >
            <IoChatboxEllipses></IoChatboxEllipses>
          </IconButton>
        </div>
      )}
      {
        <Popper
          transition
          keepMounted
          open={open}
          anchorEl={anchorEl}
          placement="top"
          className={`z-30 ${onMenuBar ? "w-full" : "w-56"}`}
        >
          {({ TransitionProps }) => (
            <div>
              <Collapse
                className="mb-4 rounded-lg"
                {...TransitionProps}
                timeout={350}
              >
                <div
                  className={`${
                    onMenuBar ? "p-0 mt-3" : "p-1"
                  } bg-indigo-100 justify-center items-center ${
                    onMenuBar ? "w-full" : "w-56"
                  } h-[68vh] rounded-lg`}
                >
                  <IconButton
                    className={`absolute ${
                      onMenuBar ? "top-3 " : "top-1 "
                    } right-1 p-0 m-2`}
                    disableFocusRipple
                    disableRipple
                    onClick={onOpenChatDrawer}
                  >
                    <CloseIcon className="w-5"></CloseIcon>
                  </IconButton>
                  <div className="flex flex-col p-2">
                    <div className="flex flex-row justify-start items-center pb-2">
                      {userInfo && (
                        <div className="pr-2">
                          <MiniProfilePicture
                            userDetails={userInfo}
                            size="small"
                            active={true}
                          ></MiniProfilePicture>
                        </div>
                      )}
                      <div className="pl-2">
                        <Typography className="cursor-default">
                          Messaging
                        </Typography>
                      </div>
                    </div>
                    <div className="w-full ">
                      <Divider></Divider>
                    </div>

                    <div>{userInfo && <ChatContacts></ChatContacts>}</div>
                  </div>
                </div>
              </Collapse>
            </div>
          )}
        </Popper>
      }
    </div>
  );
};

export default ChatDrawer;
