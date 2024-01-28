import { Link, Typography } from "@mui/material";
import React, { useState } from "react";
import { likeComment } from "../../../controllers/postsController/likeCommentController";
import useUserInfo from "../../../pages/auth/useUserInfo";

interface LikeCommentProps {
  commentData: Comment;
  post: Post;
  setCommentData: React.Dispatch<React.SetStateAction<Comment>>;
}
const LikeComment: React.FC<LikeCommentProps> = ({
  post,
  setCommentData,
  commentData,
}) => {
  const { userInfo } = useUserInfo();
  const [liked, setLiked] = useState(commentData.liked);
  const onLike = async () => {
    try {
      const res = await likeComment(post._id, commentData._id);
      setLiked(!liked);
      setCommentData(res.data.commentData);
    } catch (err: any) {
      console.error("Failed to like post:", err);
    }
  };
  return (
    <div className="">
      <Typography className="flex items-end cursor-pointer pl-4 text-gray-500 text-sm">
        <Link
          className={
            userInfo && commentData.likes.includes(userInfo?.userId)
              ? "text-primary font-medium"
              : "text-gray-500"
          }
          underline="hover"
          component="button"
          onClick={onLike}
        >
          Like
        </Link>
      </Typography>
    </div>
  );
};

export default LikeComment;
