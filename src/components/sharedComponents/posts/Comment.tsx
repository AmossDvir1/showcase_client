import React, { useState } from "react";
import { Typography } from "@mui/material";
import LikeComment from "./LikeComment";
import { useNavigate } from "react-router-dom";
import Link from "@mui/material/Link";
import ElapsedTimeLabel from "../ElapsedTimeLabel";
import MiniProfilePicture from "../profilePicture/MiniProfilePicture";
import LikeIcon from "./LikeIcon";

interface CommentProps {
  comment: Comment;
  post: Post;
  media?: Media[];
}
const Comment: React.FC<CommentProps> = ({ post, comment, media = [] }) => {
  const navigate = useNavigate();

  const [commentData, setCommentData] = useState(comment);
  const onUserClick = () => {
    navigate(`/profile/${commentData.user.urlMapping}`);
  };
  return (
    <div className="flex flex-row ml-[20px] py-2 w-[calc(100%-20px-1.5rem-15px)]">
      <div className="flex">
        <div className="mr-1">
          <MiniProfilePicture
            media={media}
            userDetails={commentData.user}
          ></MiniProfilePicture>
        </div>
      </div>
      <div className="flex flex-col">
        <div className="bg-slate-200 rounded-3xl px-3 pt-3 pb-3 min-w-[12rem] w-[calc(100%)]">
          {commentData.likes.length > 0 && <LikeIcon className="relative z-10 float-right bottom-5" users={commentData.likes}></LikeIcon>}
          <Typography>
            <Link
              className="text-black font-normal"
              underline="hover"
              component="button"
              onClick={onUserClick}
            >
              {`${commentData.user.firstName} ${commentData.user.lastName}`}
            </Link>
          </Typography>
          <Typography className="text-black font-thin">
            {commentData.content}
          </Typography>
        </div>
        <div className="flex items-center cursor-default">
          <ElapsedTimeLabel date={comment.createdAt}></ElapsedTimeLabel>
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
