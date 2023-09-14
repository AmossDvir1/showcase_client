import { Avatar, Divider } from "@mui/material";
import React, { TextareaHTMLAttributes, useRef, useState } from "react";
import useUserInfo from "../../pages/auth/useUserInfo";
import { Button } from "../Button";
import { createPost } from "../../controllers/postsController/createPostController";
import { useNavigate } from "react-router-dom";
import PostInput from "./PostInput";

interface WritePostProps extends TextareaHTMLAttributes<HTMLTextAreaElement> {}
export const WritePost: React.FC<WritePostProps> = ({ ...rest }) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const textareaRef = useRef<HTMLTextAreaElement | null>(null); // Ref for the textarea element
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { userInfo } = useUserInfo();
  const [postValue, setPostValue] = useState("");
  const handleBlur = () => {
    // if (!value || value.length < 10) {
    setIsExpanded(false);
    // Scroll the textarea to the top
    if (textareaRef.current) {
      textareaRef.current.scrollTop = 0;
    }
    // }
  };

  const onCreatePost = async (e: React.MouseEvent) => {
    e.preventDefault();
    setLoading(true);
    const res = await createPost(postValue);
    navigate(0);
  };

  return (
    <div
      className={`w-full ${
        isExpanded ? "min-h-[150px]" : "min-h-[100px]"
      } bg-slate-50 flex flex-col rounded-lg p-[20px] ${
        isExpanded ? "h-[18vh]" : "h-0"
      } transition-width duration-300 my-2`}
    >
      {userInfo?.username && (
        <div className="flex w-full">
          <Avatar
            alt={userInfo?.username?.toUpperCase() || ""}
            src="/static/images/avatar/1.jpg"
            className="bg-gradient-to-b from-rose-400 via-fuchsia-500 to-indigo-500 mx-2"
            sx={{ width: 40, height: 40 }}
          />
          <PostInput
            postValue={postValue}
            setPostValue={setPostValue}
            textareaRef={textareaRef}
            handleBlur={handleBlur}
            isExpanded={isExpanded}
            setIsExpanded={setIsExpanded}
            userInfo={userInfo}
          ></PostInput>
        </div>
      )}
      <Divider className="py-2" />
      <div className="flex items-end justify-center pt-4">
        <Button disabled={!postValue} round onClick={onCreatePost}>
          Post
        </Button>
      </div>
    </div>
  );
};
