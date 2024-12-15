import React, { RefObject } from "react";

interface PostInputProps {
  setPostValue: React.Dispatch<React.SetStateAction<string>>;
  postValue: string;
  textareaRef?: RefObject<HTMLDivElement>;
  handleBlur?: (e: React.FocusEvent) => void;
  setIsExpanded?: React.Dispatch<React.SetStateAction<boolean>>;
  userInfo?: UserDetails | null;
  isExpanded?: boolean;
}
const PostInput: React.FC<PostInputProps> = ({
  setPostValue,
  postValue,
  textareaRef,
  handleBlur,
  setIsExpanded,
  userInfo,
  isExpanded,
  ...rest
}) => {
  return (
    <div
      className={`w-full pr-4 transition-all duration-300 ${
        isExpanded ? "h-40" : "h-12"
      }`}
    >
      <textarea
        dir="auto"
        className="w-full dark:placeholder:text-neutral-400
                    placeholder:text-sm font-sans h-full dark:bg-dark-paper-light 
                  dark:text-dark-text bg-slate-100 cursor-auto p-2 rounded-2xl border
                  border-gray-300 focus:primary-2 focus:border-primary-400 resize-none
                    transition-all duration-300"
        onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) =>
          setPostValue(e.target.value)
        }
        value={postValue}
        onBlur={handleBlur}
        onClick={() => setIsExpanded?.(true)}
        placeholder={`${
          userInfo?.username
            ? "What's on your mind, " + userInfo?.firstName + "?"
            : ""
        }`}
        {...rest}
      ></textarea>
    </div>
  );
};

export default PostInput;
