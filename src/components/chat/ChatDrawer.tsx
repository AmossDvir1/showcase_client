import {
  Collapse,
  Divider,
  IconButton,
  Popper,
  Typography,
} from "@mui/material";
import React, { useRef, useState } from "react";
import { Button } from "../sharedComponents/Button";
import ExpandLessIcon from "@mui/icons-material/ExpandLess";
import CloseIcon from "@mui/icons-material/Close";
import { useSelector } from "react-redux";
import MiniProfilePicture from "../sharedComponents/profilePicture/MiniProfilePicture";
import { RootState } from "../../redux/rootReducer";
import ChatContacts from "./ChatContacts";
import useMediaQuery from "../responsiveness/useMediaQuery";
interface ChatDrawerProps {}

const ChatDrawer: React.FC<ChatDrawerProps> = () => {
  const chatBottomRef = useRef(null);
  const isMobile = useMediaQuery(500);
  const [chatMenuOpen, setChatMenuOpen] = useState(false);
  const userInfo = useSelector((state: RootState) => state.user.userInfo);
  const [anchorEl, setAnchorEl] = useState<HTMLButtonElement | null>(
    null
  );

  const onOpenChatDrawer = (e: React.MouseEvent<HTMLButtonElement>) => {
    // setAnchorEl(event.currentTarget);
    setAnchorEl(chatBottomRef.current);
    setChatMenuOpen((previousOpen) => !previousOpen);
  };

  const open = Boolean(anchorEl) && chatMenuOpen;

  return (
    <div className="relative flex z-30">
      <div ref={chatBottomRef} className="md:w-44 xs:w-30 flex justify-center items">
        <Button
          btnsize={isMobile ? "xs" : "sm"}
          round
          className="relative rounded-full bg-primary h-full w-full text-white px-4 py-2 hover:bg-primary-light focus:outline-none"
          onClick={onOpenChatDrawer}
        >
          <div className="flex items-center">
            Chat
            <ExpandLessIcon
            className={isMobile ? 'w-4': 'w-6'}
              style={{
                transition: "all 0.28s ease",
                transform: `rotate(${chatMenuOpen ? "0.5turn" : 0})`,
              }}
            />
          </div>
        </Button>
      </div>
      {
        <Popper
          transition
          keepMounted
          open={open}
          anchorEl={anchorEl}
          placement="top"
          className="z-30"
        >
          {({ TransitionProps }) => (
            <div>
              <Collapse
                className="mb-4 rounded-lg"
                {...TransitionProps}
                timeout={350}
              >
                <div className="p-1 bg-indigo-100 justify-center items-center w-56 h-[68vh] rounded-lg">
                  <IconButton
                    className="absolute top-1 right-1 p-0 m-2"
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
                        <Typography className="cursor-default">Messaging</Typography>
                      </div>
                    </div>
                    <div className="w-full ">
                      <Divider></Divider>
                    </div>

                    <div>
                      {userInfo && <ChatContacts></ChatContacts>}
                    </div>
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
