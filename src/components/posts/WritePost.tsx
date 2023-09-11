import { Avatar, Divider } from "@mui/material";
import React, { TextareaHTMLAttributes, useRef, useState } from "react";
import useUserInfo from "../../pages/auth/useUserInfo";
import { Button } from "../Button";
import { createPost } from "../../controllers/createPostController";

interface WritePostProps extends TextareaHTMLAttributes<HTMLTextAreaElement> {}
export const WritePost: React.FC<WritePostProps> = ({ ...rest }) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const textareaRef = useRef<HTMLTextAreaElement | null>(null); // Ref for the textarea element
  const [loading, setLoading] = useState(false);
  const { userInfo } = useUserInfo();
const [postValue, setPostValue] = useState('');
  const handleBlur = () => {
    // if (!value || value.length < 10) {
    setIsExpanded(false);
    // Scroll the textarea to the top
    if (textareaRef.current) {
      textareaRef.current.scrollTop = 0;
    }
    // }
  };

  const onCreatePost = (e: React.MouseEvent) => {
    e.preventDefault();
    setLoading(true);
    createPost(postValue);
  };

  return (
    <div
      className={`w-full ${
        isExpanded ? "min-h-[150px]" : "min-h-[100px]"
      } bg-slate-50 flex flex-col rounded-lg p-[35px] ${
        isExpanded ? "h-[18vh]" : "h-0"
      } transition-width duration-300`}
    >
      {userInfo?.username && (
        <div className="flex w-full">
          <Avatar
            alt={userInfo?.username?.toUpperCase() || ""}
            src="/static/images/avatar/1.jpg"
            className="bg-gradient-to-b from-rose-400 via-fuchsia-500 to-indigo-500 mx-2"
            sx={{ width: 40, height: 40 }}
          />
          <textarea
            onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) =>
              setPostValue(e.target.value)
            }
            value={postValue}
            ref={textareaRef} // Attach the ref to the textarea element
            onBlur={() => handleBlur()}
            onClick={() => setIsExpanded(true)}
            placeholder={`${
              userInfo?.username
                ? "What's on your mind, " + userInfo?.firstName + "?"
                : ""
            }`}
            className={`${
              isExpanded ? "h-[13vh]" : "h-0"
            }  mx-2 min-h-[40px] min-w-[250px] resize-none transition-width duration-300 w-full font-sans rounded-3xl border-0
            py-1 focus:ring-inset focus:ring-indigo-600
            bg-gray-200
            hover:ring-indigo-400 text-gray-900 ring-1
        ring-gray-300 placeholder:text-gray-400
         focus:ring-2 sm:text-sm sm:leading-6`}
            {...rest}
          ></textarea>
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
