import { Divider } from "@mui/material";
import React, {
  TextareaHTMLAttributes,
  useEffect,
  useRef,
  useState,
} from "react";
import { Button } from "../Button";
import { createPost } from "../../../controllers/postsController/createPostController";
import { useNavigate } from "react-router-dom";
import PostInput from "./PostInput";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch } from "../../../redux/store";
import { RootState } from "../../../redux/rootReducer";
import { fetchUserInfo } from "../../../redux/slices/user";
import { showToast } from "../../../utils/toast";
import MiniProfilePicture from "../profilePicture/MiniProfilePicture";
import CustomButton from "../CustomButton";
import { useAppSelector } from "../../../redux/hooks";

interface WritePostProps extends TextareaHTMLAttributes<HTMLTextAreaElement> {}
export const WritePost: React.FC<WritePostProps> = ({ ...rest }) => {
  const isDarkMode = useAppSelector((state) => state.theme.mode) === "dark";

  const dispatch = useDispatch();
  const userInfo = useSelector((state: RootState) => state.user.userInfo);
  const userInfoStatus = useSelector((state: RootState) => state.user.status);

  const [isExpanded, setIsExpanded] = useState(false);
  const textareaRef = useRef<HTMLTextAreaElement | null>(null); // Ref for the textarea element
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const [postValue, setPostValue] = useState("");

  useEffect(() => {
    // Dispatch the async action to fetch user info only if it's not already present
    if (!userInfo && userInfoStatus !== "loading") {
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

    // For other cases (clicking outside the textarea), collapse the component only if there is no text inside
    if (postValue.trim() === "") {
      setIsExpanded(false);
    }

    // Scroll the textarea to the top
    if (textareaRef?.current?.scrollTop) {
      textareaRef.current.scrollTop = 0;
    }
  };

  const onCreatePost = async (e: React.MouseEvent) => {
    e.preventDefault();
    setLoading(true);
    const res = await createPost(postValue);
    if (res) {
      setLoading(false);
      setIsExpanded(false);
      navigate(0);
    } else {
      showToast("Error", "Error while posting", "error");
    }
    setLoading(false);
  };

  return (
    <div
      className={`w-full bg-paper-light dark:bg-dark-paper flex flex-col rounded-none md:rounded-lg transition-width duration-300 my-2 xs:py-3 dark:border-none`}
    >
      {userInfo?.username && (
        <div className="flex px-1 pt-1">
          <div className="mx-2">
            <MiniProfilePicture
              imageSrc={userInfo.profilePicture?.imageStringBase64}
              firstName={userInfo.firstName}
              lastName={userInfo.lastName}
              size="medium"
              tooltip
              active={false}
            ></MiniProfilePicture>
          </div>
          <PostInput
            postValue={postValue}
            setPostValue={setPostValue}
            handleBlur={handleBlur}
            isExpanded={isExpanded}
            setIsExpanded={setIsExpanded}
            userInfo={userInfo}
          ></PostInput>
        </div>
      )}
      <Divider className="py-2 mx-3" />
      <div className="flex items-end justify-center pt-2">
        <CustomButton
          className="py-[1px] px-4"
          glow={isDarkMode}
          variant="outlined"
          loadingText="Posting..."
          loading={loading}
          disabled={!(postValue.trim().length >= 2)}
          onClick={onCreatePost}
        >
          Post
        </CustomButton>
      </div>
    </div>
  );
};
