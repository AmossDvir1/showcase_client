import { Link, Typography } from "@mui/material";
import React, { useEffect } from "react";
import { likeComment } from "../../../controllers/postsController/likeCommentController";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch } from "../../../redux/store";
import { RootState } from "../../../redux/rootReducer";
import { fetchUserInfo } from "../../../redux/slices/user";

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

  const dispatch = useDispatch<AppDispatch>();
  const userInfo = useSelector((state: RootState) => state.user.userInfo);
  const userInfoStatus = useSelector((state: RootState) => state.user.status);


  useEffect(() => {
    // Dispatch the async action to fetch user info only if it's not already present
    if (!userInfo && userInfoStatus !== 'loading') {
      dispatch(fetchUserInfo());
    }
  }, [dispatch, userInfo, userInfoStatus]);

  const onLike = async () => {
    try {
      const res = await likeComment(post._id, commentData._id);
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
            userInfo && commentData.likes.some(like => like._id === userInfo?.userId)
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
