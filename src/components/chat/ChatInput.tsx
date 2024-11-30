import React from "react";
import { TextField, IconButton, InputAdornment } from "@mui/material";
import SendIcon from "@mui/icons-material/Send";
import Loader from "../sharedComponents/Loader";

interface ChatInputProps {
  onSendMessage: () => void;
  onTyping: (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => void;
  inputString: string;
  isTyping: boolean;
}

const ChatInput: React.FC<ChatInputProps> = ({
  onSendMessage,
  onTyping,
  inputString,
  isTyping,
}) => {
  return (
    <TextField
      onKeyDown={(e) => {
        if (e.key === "Enter" && !e.shiftKey) {
          e.preventDefault();
          onSendMessage();
        }
      }}
      onChange={onTyping}
      value={inputString}
      sx={{ borderRadius: "8px" }}
      placeholder="Write a message..."
      fullWidth
      multiline
      InputProps={{
        sx: {
          borderRadius: "8px",
          cursor: "default",
          padding: "10px",
        },
        inputProps: {
          className: "max-h-16 input-no-ring lg:text-sm xs:text-xs",
          style: {
            borderTopLeftRadius: "8px",
            borderBottomLeftRadius: "8px",
          },
        },
        endAdornment: (
          <InputAdornment
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
            position="end"
          >
            <IconButton
              disabled={!inputString}
              className={`flex items-center p-0 px-1 justify-center ${
                inputString
                  ? "text-primary cursor-pointer"
                  : "text-gray-300 cursor-default"
              }`}
              onClick={onSendMessage}
              disableRipple
            >
              {false ? (
                <Loader />
              ) : (
                <SendIcon
                  className={`flex items-center justify-center w-[20px] ${
                    inputString ? "cursor-pointer" : "cursor-default"
                  }`}
                />
              )}
            </IconButton>
          </InputAdornment>
        ),
      }}
    />
  );
};

export default ChatInput;
