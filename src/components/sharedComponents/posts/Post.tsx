import React, { useEffect, useState } from "react";
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
import { formatTime } from "../../../utils/utils";
import { useNavigate } from "react-router-dom";

interface PostProps {
  post: Post;
  setPosts?: React.Dispatch<React.SetStateAction<Post[]>>;
}
export const Post: React.FC<PostProps> = ({ post, setPosts }) => {
  const navigate = useNavigate();
  const [liked, setLiked] = useState(post.liked);
  const [likesCount, setLikesCount] = useState(post?.likes?.length ?? 0);
  const [commentsCount, setCommentsCount] = useState(
    post?.comments?.length ?? 0
  );
  const [value, setValue] = useState(post.content);
  const [postData, setPostData] = useState(post);
  const [isEditMode, setIsEditMode] = useState(false);
  const [isDeleted, setIsDeleted] = useState(false);
  const [previousState, setPreviousState] = useState(value);
  const [commentOpen, setCommentOpen] = useState(false);
  const [showCommentsOpen, setShowCommentsOpen] = useState(false);

  const [commentString, setCommentString] = useState("");
  const { relativeTime, exactTime } = formatTime(postData.createdAt);

  const onDeletePost = async () => {
    const res = await deletePost(postData._id);
    if (res) {
      setIsDeleted(true);
    }
  };

  const onUpdatePost = async () => {
    try {
      setPreviousState(value);
      const res = await updatePost(value, postData._id);
      setPostData(res.data.postData);
      setIsEditMode(false);
    } catch (err: any) {
      console.log(err);
    }
  };
  useEffect(() => {
    setLikesCount(postData?.likes?.length ?? 0);
  }, [postData]);

  const onLikeClick = async () => {
    try {
      const res = await likePost(postData._id);
      setLiked(!liked);
      setPostData(res.data.postData);
      // setLikesCount(res?.data?.post?.likes?.length ?? 0);
    } catch (err: any) {
      console.error("Failed to like post:", err);
    }
  };

  const onUserClick = () => {
    navigate(`/profile/${postData.user.urlMapping}`);
  };

  const onCommentClick = () => {
    setCommentOpen(!commentOpen);
  };
  const onAddComment = async () => {
    try {
      const res = await addComment(postData._id, commentString);
      setPostData(res.data.postData);
      setCommentsCount(commentsCount + 1);
      setCommentString("");
      setShowCommentsOpen(true);
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
      className={`w-full my-2 relative
      bg-slate-50 flex rounded-lg ${
        !isEditMode ? "justify-between" : ""
      } lg:p-3 xs:px-2 xs:py-3`}
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
              username={postData?.user?.userStr}
              alt={postData?.user?.userStr?.toUpperCase() || ""}
              src="/static/images/avatar/1.jpg"
              className="bg-gradient-to-b from-rose-400 via-fuchsia-500 to-indigo-500 mr-4"
              sx={{ width: 40, height: 40 }}
            />
            <div className="flex flex-col">
              <div className="flex flex-row items-center">
                <Typography>
                  <Link
                    className="text-black font-normal"
                    underline="hover"
                    component="button"
                    onClick={onUserClick}
                  >
                    {postData.user.userStr}
                  </Link>
                </Typography>
                <Divider className="mx-4" orientation="vertical"></Divider>
                <Tooltip title={exactTime} placement={"bottom"}>
                  <Typography className="text-gray-500 text-sm">
                    {relativeTime}
                  </Typography>
                </Tooltip>
              </div>
              <Typography className="text-slate-900 font-light text-sm break-words" sx={{unicodeBidi: "plaintext"}}>
                {/* <LineRenderer text={value}></LineRenderer> */}
                {value}
              </Typography>
            </div>
          </div>
          {(likesCount > 0 || commentsCount > 0) && (
            <div
              className={`px-3 flex flex-row ${
                likesCount > 0 && commentsCount > 0
                  ? "justify-between"
                  : likesCount > 0 && commentsCount === 0
                  ? "justify-start"
                  : "justify-end"
              }`}
            >
              {likesCount > 0 && (
                <div className="flex flex-row pt-5 items-center">
                  <img
                    alt="like"
                    className="w-[17px] h-[17px]"
                    src={likeImg}
                  ></img>
                  <Typography className="text-primary pl-[3px] cursor-default">
                    {likesCount}
                  </Typography>
                </div>
              )}
              {commentsCount > 0 && (
                <div className="flex flex-row pt-5 items-center">
                  <Typography className="flex items-end text-primary pl-[3px] cursor-pointer">
                    <Link
                      underline="hover"
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
              <Divider className="w-full my-3"></Divider>
              {postData.comments.map((comment, index) => (
                <Comment
                  key={index}
                  post={postData}
                  comment={comment}
                ></Comment>
              ))}
            </div>
          )}
          <Divider className="w-full pb-3"></Divider>
          <div className="flex flex-row w-full justify-between pt-3">
            <div className="flex flex-row">
              <MuiButton variant="text" onClick={onLikeClick}>
                {liked ? (
                  <ThumbUpIcon className="text-primary pr-1 w-5" />
                ) : (
                  <ThumbUpOutlinedIcon className="text-gray-400 pr-1 w-5" />
                )}
                <Typography
                  className={
                    liked
                      ? "text-primary pl-1 text-sm"
                      : "text-gray-400 pl-1 text-sm"
                  }
                >
                  Like
                </Typography>
              </MuiButton>
            </div>
            <div className="flex flex-row">
              <MuiButton variant="text" onClick={onCommentClick}>
                <InsertCommentOutlinedIcon className="text-primary pr-1 w-5" />
                <Typography className="text-primary pl-1 text-sm">
                  Comment
                </Typography>
              </MuiButton>
            </div>
          </div>
          {commentOpen && (
            <div className="flex w-full py-2 bg-transparent rounded-full">
              <MuiTextField
                onChange={(e) => setCommentString(e.target.value)}
                value={commentString}
                sx={{ borderRadius: "100px" }}
                placeholder="Write a comment..."
                fullWidth
                InputProps={{
                  sx: { borderRadius: "100px", cursor: "default" },
                  inputProps: {
                    className: "input-no-ring",
                    style: {
                      borderTopLeftRadius: "100px",
                      borderBottomLeftRadius: "100px",
                    },
                  },
                  endAdornment: (
                    <InputAdornment sx={{ display: "flex" }} position="end">
                      <IconButton
                        disabled={!commentString}
                        className={`flex ${
                          commentString
                            ? "text-primary cursor-pointer"
                            : "text-gray-300 cursor-default"
                        }`}
                        onClick={onAddComment}
                        disableRipple
                      >
                        <SendIcon
                          className={`w-[20px] ${
                            commentString ? "cursor-pointer" : "cursor-default"
                          }`}
                        />
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
