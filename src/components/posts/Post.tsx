import React, { useState } from "react";
import { Box, Typography } from "@mui/material";
import { PostMenu } from "./PostMenu";
import PostInput from "./PostInput";
import { Button } from "../sharedComponents/Button";
import { deletePost } from "../../controllers/postsController/deletePostController";
import { useNavigate } from "react-router-dom";
import { updatePost } from "../../controllers/postsController/updatePostController";
import CancelIcon from "@mui/icons-material/Cancel";
import { Tooltip } from "../sharedComponents/Tooltip";
import { Avatar } from "../sharedComponents/Avatar";

export const Post: React.FC<Post> = ({
  content = "",
  postId,
  fullName,
  userId,
}) => {
  const [value, setValue] = useState(content);
  const [isEditMode, setIsEditMode] = useState(false);
  const [isDeleted, setIsDeleted] = useState(false);
  const [previousState, setPreviousState] = useState(value);
  const navigate = useNavigate();

  const onDeletePost = async () => {
    const res = await deletePost(postId);
    setIsDeleted(true);
    // navigate(0);
  };

  const onUpdatePost = async () => {
    setPreviousState(value);
    const res = await updatePost(value, postId);
    setIsEditMode(false);
    // navigate(0);
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
      } p-[20px]`}
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
          username={fullName}
            alt={fullName?.toUpperCase() || ""}
            src="/static/images/avatar/1.jpg"
            className="bg-gradient-to-b from-rose-400 via-fuchsia-500 to-indigo-500 mr-4"
            sx={{ width: 40, height: 40 }}
          />
          <Typography className="text-slate-500">{value}</Typography>
          
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
