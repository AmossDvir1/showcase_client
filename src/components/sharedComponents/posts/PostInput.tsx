import { TextField } from "@mui/material";
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
    <div className={`w-full transition-all duration-300 ${
      isExpanded ? "h-40" : "h-12"
    }`}>
      <textarea
        className="w-full font-sans h-full p-2 rounded-2xl border border-gray-300 focus:primary-2 focus:border-primary-400 resize-none transition-all duration-300"
        
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
        //         className={`${
        //           isExpanded ? "h-[13vh]" : "h-0"
        //         } whitespace-normal break-words mx-2 min-h-[40px] min-w-[250px] resize-none transition-width duration-300 w-full font-sans rounded-3xl border-0
        //      focus:ring-inset focus:ring-indigo-600 !important
        //     bg-gray-200
        //     hover:ring-indigo-400 !important text-gray-900 ring-1
        // ring-gray-300 placeholder:text-gray-400
        //  focus:ring-2 xs:text-xs lg:text-sm sm:leading-6 lg:py-2 xs:py-2.5`}
        {...rest}
      ></textarea>
    </div>
  );
};

export default PostInput;
