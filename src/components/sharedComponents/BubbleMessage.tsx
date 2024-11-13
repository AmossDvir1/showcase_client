import React, { useState } from "react";
import { Box, Collapse, Typography } from "@mui/material";
import MiniProfilePicture from "../sharedComponents/profilePicture/MiniProfilePicture";
import { formatTimeShort } from "../../utils/utils";

interface BubbleMessageProps {
  message: {
    senderId: string;
    content: string;
    createdAt?: string;
  };
  isOwnMessage: boolean;
  friend: UserDetails;
}

const BubbleMessage: React.FC<BubbleMessageProps> = ({
  message,
  isOwnMessage,
  friend,
}) => {
  const [isHovering, setIsHovering] = useState(false);

  const onMouseOver = () => {
    setIsHovering(true);
  };

  const onMouseOut = () => {
    setIsHovering(false);
  };

  return (
    <Box className="mb-2 w-full">
      {isOwnMessage ? (
        <div className="flex flex-col items-end">
          <div
            className="py-2 px-3 flex bg-[#cac9e8] rounded-[18px]"
            onMouseOver={onMouseOver}
            onMouseOut={onMouseOut}
          >
            <Typography className="break-all text-wrap text-sm">
              {message.content}
            </Typography>
          </div>
          
          {message?.createdAt && (       
            <Collapse in={isHovering} >
              <Typography className="text-xs text-neutral-400">
                {formatTimeShort(message.createdAt)}
              </Typography>
            </Collapse>
          )}
        </div>
      ) : (
        <div className="flex justify-start items-start w-64">
          <div className="mr-[6px] py-1">
            <MiniProfilePicture userDetails={friend} size="small" />
          </div>
          <div className="flex flex-col items-start">
            <div
              className="py-2 px-3 flex justify-start bg-gray-200 rounded-[18px]"
              onMouseOver={onMouseOver}
              onMouseOut={onMouseOut}
            >
              <Typography className="break-all text-wrap text-sm">
                {message.content}
              </Typography>
            </div>
            {message?.createdAt && (
            <Collapse in={isHovering}>
              <Typography className="text-xs text-neutral-400">
                {formatTimeShort(message.createdAt)}
              </Typography>
            </Collapse>
          )}
          </div>
        </div>
      )}
    </Box>
  );
};

export default BubbleMessage;
