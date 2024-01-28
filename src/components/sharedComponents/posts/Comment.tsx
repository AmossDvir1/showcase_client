import React, { useState } from "react";
import { Typography } from "@mui/material";
import { Avatar } from "../Avatar";
import { formatTime } from "../../../utils/utils";
import { Tooltip } from "../Tooltip";
import LikeComment from "./LikeComment";
import likeImg from "../../../assets/like.png";
import { useNavigate } from "react-router-dom";
import Link from "@mui/material/Link";

interface CommentProps {
  comment: Comment;
  post: Post;
}
const Comment: React.FC<CommentProps> = ({ post, comment }) => {
  const navigate = useNavigate();

  const [commentData, setCommentData] = useState(comment);
  const { relativeTime, exactTime } = formatTime(comment.createdAt);
  const onUserClick = () => {
    navigate(`/profile/${commentData.user.urlMapping}`);
  };
  return (
    <div className="flex flex-row ml-[20px] py-2 w-[calc(100%-20px-1.5rem-15px)]">
      <div className="flex">
        <Avatar
          username={commentData.user.userStr}
          alt={commentData.user.userStr.toUpperCase() || ""}
          src="/static/images/avatar/1.jpg"
          className="bg-gradient-to-b from-rose-400 via-fuchsia-500 to-indigo-500 mr-2"
          sx={{ width: 40, height: 40 }}
        />
      </div>
      <div className="flex flex-col">
        <div className="bg-slate-200 rounded-3xl px-3 pt-3 pb-3 min-w-[12rem] w-[calc(100%)]">
          {commentData.likes.length > 0 && (
            <img
              alt="like"
              className="relative z-10 float-right bottom-5 w-[17px] h-[17px] rounded-lg shadow-[3px_3px_6px_2px_rgba(0,0,0,0.2)] hover:shadow-[3px_3px_5px_2px_rgba(0,0,0,0.25)]"
              src={likeImg}
            ></img>
          )}
          <Typography>
            <Link
              className="text-black font-normal"
              underline="hover"
              component="button"
              onClick={onUserClick}
            >
              {commentData.user.userStr}
            </Link>
          </Typography>
          <Typography className="text-black font-thin">
            {commentData.content}
          </Typography>
        </div>
        <div className="flex items-center cursor-default">
          <Tooltip title={exactTime} placement={"bottom"}>
            <Typography className="pl-2 text-gray-500 text-sm">
              {relativeTime}
            </Typography>
          </Tooltip>
          <LikeComment
            post={post}
            commentData={commentData}
            setCommentData={setCommentData}
          ></LikeComment>
        </div>
      </div>
    </div>
  );
};

export default Comment;
