import React, { useState } from "react";
import { Box, Typography } from "@mui/material";
import { PostMenu } from "./PostMenu";
import PostInput from "./PostInput";
import { Button } from "../Button";
import { deletePost } from "../../controllers/postsController/deletePostController";
import { useNavigate } from "react-router-dom";

export const Post: React.FC<Post> = ({ content = "", postId }) => {
  const [value, setValue] = useState(content);
  const [isEditMode, setIsEditMode] = useState(false);
  const navigate = useNavigate();
  const onDeletePost = () => {
    deletePost(postId);
    navigate(0);
  }
  return (
    <Box
      className={`w-full min-h-[100px] my-2
      bg-slate-50 flex rounded-lg ${!isEditMode ? "justify-between":"flex-col items-center"} p-[20px]`}
    >
      {isEditMode ? (
        <div className="flex flex-col">
          <PostInput setPostValue={setValue} postValue={value}></PostInput>
          <Button>Save</Button>
        </div>
      ) : (
        <Typography className="text-slate-400">{value}</Typography>
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
