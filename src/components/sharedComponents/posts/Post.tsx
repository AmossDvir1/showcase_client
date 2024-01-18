import React, { useState } from "react";
import {
  Box,
  Divider,
  IconButton,
  InputAdornment,
  Typography,
} from "@mui/material";
import { PostMenu } from "./PostMenu";
import PostInput from "./PostInput";
import { Button } from "../Button";
import { Button as MuiButton } from "@mui/material";
import { deletePost } from "../../../controllers/postsController/deletePostController";
import { updatePost } from "../../../controllers/postsController/updatePostController";
import CancelIcon from "@mui/icons-material/Cancel";
import { Tooltip } from "../Tooltip";
import { Avatar } from "../Avatar";
import LineRenderer from "../LineRenderer";
import ThumbUpIcon from "@mui/icons-material/ThumbUp";
import ThumbUpOutlinedIcon from "@mui/icons-material/ThumbUpOutlined";
import InsertCommentOutlinedIcon from "@mui/icons-material/InsertCommentOutlined";
import likeImg from "../../../assets/like.png";
import { likePost } from "../../../controllers/postsController/likePostController";
import { TextField as MuiTextField } from "@mui/material";
import SendIcon from "@mui/icons-material/Send";
import Link from "@mui/material/Link";
import { addComment } from "../../../controllers/postsController/addCommentController";
import Comment from "./Comment";

interface PostProps {
  postData: Post;
  setPosts: React.Dispatch<React.SetStateAction<Post[]>>;
}
export const Post: React.FC<PostProps> = ({ postData, setPosts }) => {
  const [liked, setLiked] = useState(postData.liked);
  const [likesCount, setLikesCount] = useState(postData?.likes?.length ?? 0);
  const [commentsCount, setCommentsCount] = useState(
    postData?.comments?.length ?? 0
  );
  const [value, setValue] = useState(postData.content);
  const [isEditMode, setIsEditMode] = useState(false);
  const [isDeleted, setIsDeleted] = useState(false);
  const [previousState, setPreviousState] = useState(value);
  const [commentOpen, setCommentOpen] = useState(false);
  const [showCommentsOpen, setShowCommentsOpen] = useState(false);

  const [commentString, setCommentString] = useState("");
  const onDeletePost = async () => {
    const res = await deletePost(postData.postId);
    if (res) {
      setIsDeleted(true);
    }
  };

  const onUpdatePost = async () => {
    setPreviousState(value);
    const res = await updatePost(value, postData.postId);
    setIsEditMode(false);
  };

  const onLikeClick = async () => {
    try {
      const res = await likePost(postData.postId);
      setLiked(!liked);
      setLikesCount(res?.data?.post?.likes?.length ?? 0);
    } catch (err: any) {
      console.error("Failed to like post:", err);
    }
  };

  const onCommentClick = () => {
    setCommentOpen(true);
  };
  const onAddComment = async () => {
    try {
      const res = await addComment(postData.postId, commentString);
      setCommentsCount(commentsCount+1);
    } catch (err: any) {
      console.error("Failed to like post:", err);
    }
  };
  const onCancel = () => {
    setValue(previousState);
    setIsEditMode(false);
  };
  return isDeleted ? (
    <></>
  ) : (
    <Box
      className={`w-full min-h-[100px] my-2
      bg-slate-50 flex rounded-lg ${
        !isEditMode ? "justify-between" : ""
      } px-[20px] py-[15px]`}
    >
      {isEditMode ? (
        <div className="flex flex-col w-full">
          <div className="flex justify-between">
            <div className="flex">
              <Typography className="text-black">Edit Post</Typography>
            </div>
            <div className="flex items-end">
              <Tooltip title="Cancel">
                <CancelIcon
                  className="cursor-pointer mb-2 fill-primary hover:fill-primary-light"
                  onClick={onCancel}
                ></CancelIcon>
              </Tooltip>
            </div>
          </div>
          <PostInput
            setPostValue={setValue}
            isExpanded
            postValue={value}
          ></PostInput>
          <div className="pt-4 flex items-center justify-center">
            <Button
              fullWidth
              className="mx-1 w-[20%]"
              btnsize="xs"
              round
              onClick={onUpdatePost}
            >
              Save
            </Button>
          </div>
        </div>
      ) : (
        <div className="flex w-full flex-col">
          <div className="flex">
            <Avatar
              username={postData?.user?.fullName}
              alt={postData?.user?.fullName?.toUpperCase() || ""}
              src="/static/images/avatar/1.jpg"
              className="bg-gradient-to-b from-rose-400 via-fuchsia-500 to-indigo-500 mr-4"
              sx={{ width: 40, height: 40 }}
            />
            <Typography className="text-slate-500">
              <LineRenderer text={value}></LineRenderer>
            </Typography>
          </div>
          {(likesCount > 0 || commentsCount > 0) && (
            <div className="flex flex-row justify-between">
              {likesCount > 0 && (
                <div className="flex flex-row pt-5 items-center">
                  <img className="w-[15px] h-[15px]" src={likeImg}></img>
                  <Typography className="text-primary pl-[3px] cursor-default">
                    {likesCount}
                  </Typography>
                </div>
              )}
              {commentsCount > 0 && (
                <div className="flex flex-row pt-5 items-center">

                  <Typography className="text-primary pl-[3px] cursor-pointer">
                    <Link underline="hover"
                      component="button"
                      onClick={() => setShowCommentsOpen(!showCommentsOpen)}
                    >{`${commentsCount} comments`}</Link>
                  </Typography>
                </div>
              )}
            </div>
          )}

          {commentsCount > 0 && showCommentsOpen && (
            <div>
              {postData.comments.map((comment, index) => (
                <Comment key={index} value={comment.commentStr}></Comment>
              ))}
            </div>
          )}

          <Divider className="w-full pt-3"></Divider>
          <div className="flex flex-row w-full justify-between pt-3">
            <div className="flex flex-row">
              {liked ? (
                <MuiButton variant="text" onClick={onLikeClick}>
                  <ThumbUpIcon className="text-primary pr-1 w-5" />
                  <Typography className="text-primary pl-1">Like</Typography>
                </MuiButton>
              ) : (
                <MuiButton variant="text" onClick={onLikeClick}>
                  <ThumbUpOutlinedIcon className="text-gray-400 pr-1 w-5" />
                  <Typography className="text-gray-400 pl-1">Like</Typography>
                </MuiButton>
              )}
            </div>
            <div className="flex flex-row">
              <MuiButton variant="text" onClick={onCommentClick}>
                <InsertCommentOutlinedIcon className="text-primary pr-1 w-5" />
                <Typography className="text-primary pl-1">Comment</Typography>
              </MuiButton>
            </div>
          </div>
          {commentOpen && (
            <div className="flex w-full py-2">
              <MuiTextField
                onChange={(e) => setCommentString(e.target.value)}
                value={commentString}
                sx={{ backgroundColor: "white" }}
                placeholder="Write a comment..."
                fullWidth
                InputProps={{
                  sx: { borderRadius: "100px" },
                  endAdornment: (
                    <InputAdornment sx={{ display: "flex" }} position="end">
                      <IconButton
                        disabled={!commentString}
                        className={`flex ${commentString ? "text-primary" : "text-gray-300"}`}
                        onClick={onAddComment}
                        disableRipple
                      >
                        <SendIcon className="w-[20px]" />
                      </IconButton>
                    </InputAdornment>
                  ),
                }}
              />
            </div>
          )}
        </div>
      )}
      {!isEditMode && (
        <PostMenu
          onEditClick={() => setIsEditMode(true)}
          onDeleteClick={onDeletePost}
        ></PostMenu>
      )}
    </Box>
  );
};
