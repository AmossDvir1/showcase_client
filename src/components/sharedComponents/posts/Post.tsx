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
import { useNavigate } from "react-router-dom";
import ElapsedTimeLabel from "../ElapsedTimeLabel";
import MiniProfilePicture from "../profilePicture/MiniProfilePicture";
import { Collapse } from "@mui/material";
import Loader from "../Loader";
import LikeIcon from "./LikeIcon";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch } from "../../../redux/store";
import { RootState } from "../../../redux/rootReducer";
import { fetchUserInfo } from "../../../redux/slices/user";

interface PostProps {
  post: Post;
  media?: Media[];
  setPosts?: React.Dispatch<React.SetStateAction<Post[]>>;
}
export const Post: React.FC<PostProps> = ({ post, media = [] }) => {
  const navigate = useNavigate();

  const dispatch = useDispatch<AppDispatch>();
  const userInfo = useSelector((state: RootState) => state.user.userInfo);
  const userInfoStatus = useSelector((state: RootState) => state.user.status);
  useEffect(() => {
    // Dispatch the async action to fetch user info only if it's not already present
    if (!userInfo && userInfoStatus !== 'loading') {
      dispatch(fetchUserInfo());
    }
  }, [dispatch, userInfo, userInfoStatus]);

  
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
  const [userStr, setUserStr] = useState("");
    const [commentSubmitLoading, setCommentSubmitLoading] = useState(false);
  const [commentString, setCommentString] = useState("");

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
    if (postData?.user) {
      setUserStr(`${postData?.user?.firstName} ${postData.user.lastName}`);
    }
  }, [postData]);

  const onLikeClick = async () => {
    try {
      const res = await likePost(postData._id);
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
      setCommentSubmitLoading(true);
      const res = await addComment(postData._id, commentString);
      setCommentSubmitLoading(false);
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
            <div className="mr-2">
              <MiniProfilePicture
                media={media}
                userDetails={postData.user}
              ></MiniProfilePicture>
            </div>
            <div className="flex flex-col">
              <div className="flex flex-row items-center">
                <Typography>
                  <Link
                    className="text-black font-normal"
                    underline="hover"
                    component="button"
                    onClick={onUserClick}
                  >
                    {userStr}
                  </Link>
                </Typography>
                <Divider className="mx-4" orientation="vertical"></Divider>
                <ElapsedTimeLabel date={postData.createdAt} />
              </div>
              <Typography
                className="pt-3 text-slate-900 font-light text-sm break-words"
                sx={{ unicodeBidi: "plaintext" }}
              >
                {value}
              </Typography>
            </div>
          </div>

          <Collapse in={likesCount > 0 || commentsCount > 0}>
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
                  <LikeIcon users={postData.likes}></LikeIcon>
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
          </Collapse>

          <Collapse in={commentsCount > 0 && showCommentsOpen}>
            <Divider className="w-full my-3"></Divider>
            {postData.comments.map((comment, index) => (
              <Comment media={media} key={index} post={postData} comment={comment}></Comment>
            ))}
          </Collapse>

          <Divider className="w-full pb-3"></Divider>
          <div className="flex flex-row w-full justify-between pt-3">
            <div className="flex flex-row">
              <MuiButton variant="text" onClick={onLikeClick}>
                {postData.likes.some(like => like._id === userInfo?.userId) ? (
                  <ThumbUpIcon className="text-primary pr-1 w-5" />
                ) : (
                  <ThumbUpOutlinedIcon className="text-gray-400 pr-1 w-5" />
                )}
                <Typography
                  className={
                    postData.likes.some(like => like._id === userInfo?.userId)
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
          <Collapse in={commentOpen}>
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
                    <InputAdornment sx={{ display: "flex", alignItems: "center", justifyContent: "center" }} position="end">
                      <IconButton
                        disabled={!commentString}
                        className={`flex items-center p-0 px-1 justify-center ${
                          commentString
                            ? "text-primary cursor-pointer"
                            : "text-gray-300 cursor-default"
                        }`}
                        onClick={onAddComment}
                        disableRipple
                      >
                        {commentSubmitLoading ? <Loader/>:<SendIcon
                          className={`flex items-center justify-center w-[20px] ${
                            commentString ? "cursor-pointer" : "cursor-default"
                          }`}
                        />}
                      </IconButton>
                    </InputAdornment>
                  ),
                }}
              />
            </div>
          </Collapse>
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
