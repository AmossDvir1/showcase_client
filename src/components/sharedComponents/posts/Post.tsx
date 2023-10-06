import React, { useState } from "react";
import { Box, Typography } from "@mui/material";
import { PostMenu } from "./PostMenu";
import PostInput from "./PostInput";
import { Button } from "../Button";
import { deletePost } from "../../../controllers/postsController/deletePostController";
import { updatePost } from "../../../controllers/postsController/updatePostController";
import CancelIcon from "@mui/icons-material/Cancel";
import { Tooltip } from "../Tooltip";
import { Avatar } from "../Avatar";
import LineRenderer from "../LineRenderer";

interface PostProps {
  postData: Post;
  setPosts: React.Dispatch<React.SetStateAction<Post[]>>;
}
export const Post: React.FC<PostProps> = ({ postData, setPosts }) => {
  const [value, setValue] = useState(postData.content);
  const [isEditMode, setIsEditMode] = useState(false);
  const [isDeleted, setIsDeleted] = useState(false);
  const [previousState, setPreviousState] = useState(value);

  const onDeletePost = async () => {
    const res = await deletePost(postData.postId);
    if (res){
      setIsDeleted(true);
    }
  };

  const onUpdatePost = async () => {
    setPreviousState(value);
    const res = await updatePost(value, postData.postId);
    setIsEditMode(false);
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
          <div className="flex items-end justify-end">
            <Tooltip title="Cancel">
              <CancelIcon
                className="cursor-pointer mb-2 fill-primary hover:fill-primary-light"
                onClick={onCancel}
              ></CancelIcon>
            </Tooltip>
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
        <div className="flex">
          <Avatar
            username={postData?.user?.fullName}
            alt={postData?.user?.fullName?.toUpperCase() || ""}
            src="/static/images/avatar/1.jpg"
            className="bg-gradient-to-b from-rose-400 via-fuchsia-500 to-indigo-500 mr-4"
            sx={{ width: 40, height: 40 }}
          />
          <Typography className="text-slate-500"><LineRenderer text={value}></LineRenderer></Typography>
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
