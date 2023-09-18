import React from "react";
import { AvatarProps, Avatar as MuiAvatar } from "@mui/material";
import { Tooltip } from "./Tooltip";

interface Props extends AvatarProps {
  username: string;
}
export const Avatar: React.FC<Props> = ({ username, ...rest }) => {
  return (
    <div>
      <Tooltip title={username}>
        <MuiAvatar
          alt={username?.toUpperCase() || ""}
          src="/static/images/avatar/1.jpg"
          className="bg-gradient-to-b from-rose-400 via-fuchsia-500 to-indigo-500 mr-4"
          sx={{ width: 40, height: 40 }}
          {...rest}
        />
      </Tooltip>
    </div>
  );
};
