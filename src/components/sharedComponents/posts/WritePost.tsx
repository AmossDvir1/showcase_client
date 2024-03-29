import { Avatar, Divider } from "@mui/material";
import React, { TextareaHTMLAttributes, useEffect, useRef, useState } from "react";
import { Button } from "../Button";
import { createPost } from "../../../controllers/postsController/createPostController";
import { useNavigate } from "react-router-dom";
import PostInput from "./PostInput";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch } from "../../../redux/store";
import { RootState } from "../../../redux/rootReducer";
import { fetchUserInfo } from "../../../redux/slices/user";

interface WritePostProps extends TextareaHTMLAttributes<HTMLTextAreaElement> {}
export const WritePost: React.FC<WritePostProps> = ({ ...rest }) => {
  const dispatch = useDispatch<AppDispatch>();
  const userInfo = useSelector((state: RootState) => state.user.userInfo);
  const userInfoStatus = useSelector((state: RootState) => state.user.status);

  const [isExpanded, setIsExpanded] = useState(false);
  const textareaRef = useRef<HTMLTextAreaElement | null>(null); // Ref for the textarea element
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const [postValue, setPostValue] = useState("");

  useEffect(() => {
    // Dispatch the async action to fetch user info only if it's not already present
    if (!userInfo && userInfoStatus !== 'loading') {
      dispatch(fetchUserInfo());
    }
  }, [dispatch, userInfo, userInfoStatus]);

  const handleBlur = (e: React.FocusEvent) => {
    // Check if the related target (the element clicked) is the "Post" button
    if (e.relatedTarget && e.relatedTarget instanceof HTMLElement) {
      const isPostButton = e.relatedTarget.getAttribute("data-post-button");
      if (isPostButton === "true") {
        return;
      }
    }

    // For other cases (clicking outside the textarea), collapse the component
    setIsExpanded(false);

    // Scroll the textarea to the top
    if (textareaRef.current) {
      textareaRef.current.scrollTop = 0;
    }
  };

  const onCreatePost = async (e: React.MouseEvent) => {
    e.preventDefault();
    setLoading(true);
    const res = await createPost(postValue);
    if (res) {
      setLoading(false)
      setIsExpanded(false);
      navigate(0);
    }
  };

  return (
    <div
      className={`w-full bg-slate-50 flex flex-col rounded-lg transition-width duration-300 my-2 lg:p-3 xs:px-2 xs:py-3`}
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
        <Button
        loading={loading}
          btnsize="sm"
          disabled={!postValue}
          data-post-button="true"
          onMouseDown={(e) => {
            e.stopPropagation();
          }}
          round
          onClick={onCreatePost}
        >
          Post
        </Button>
      </div>
    </div>
  );
};
