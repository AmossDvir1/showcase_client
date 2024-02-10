import React from "react";
import { Tooltip, Typography } from "@mui/material";
import likeImg from "../../../assets/like.png";

interface TooltipUsersContentProps {
  users: UserInfo[];
}
const TooltipUsersContent: React.FC<TooltipUsersContentProps> = ({ users }) => {
  return (
    <div>
      <Typography className="text-sm">Like</Typography>
      {users.map((user, index) =>
        index < 2 ? (
          <Typography key={index} className="font-light text-sm">{`${user.firstName} ${user.lastName}`}</Typography>
        ) : index === 2 ? (
          <Typography key={index} className="text-sm">{`and ${
            users.length - index
          } more...`}</Typography>
        ) : (
          ""
        )
      )}
    </div>
  );
};

interface LikeIconProps
  extends React.DetailedHTMLProps<
    React.ImgHTMLAttributes<HTMLImageElement>,
    HTMLImageElement
  > {
  users: UserInfo[];
}
const LikeIcon: React.FC<LikeIconProps> = ({ users, ...rest }) => {
  return (
    <Tooltip
      arrow
      componentsProps={{
        tooltip: {
          sx: {
            bgcolor: "rgb(40,40,40,0.85)",
            "& .MuiTooltip-arrow": {
              color: "rgb(0,0,0,0.85)",
            },
          },
        },
      }}
      title={<TooltipUsersContent users={users}></TooltipUsersContent>}
    >
      <img
        alt="like"
        className={`${rest.className} w-[17px] h-[17px] rounded-lg shadow-[-3px_3px_6px_2px_rgba(0,0,0,0.2)] hover:shadow-[-3px_3px_5px_2px_rgba(0,0,0,0.25)]`}
        src={likeImg}
      ></img>
    </Tooltip>
  );
};

LikeIcon.propTypes = {};

export default LikeIcon;
