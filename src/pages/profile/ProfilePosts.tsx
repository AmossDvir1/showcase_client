import React, { useEffect, useState } from "react";
import { getUserPosts } from "../../controllers/postsController/getUserPostsController";
import { Post } from "../../components/sharedComponents/posts/Post";
import { Divider, Typography } from "@mui/material";
import Loader from "../../components/sharedComponents/Loader";

interface ProfilePostsProps {
  userData?: UserProfile;
}

const ProfilePosts: React.FC<ProfilePostsProps> = ({ userData }) => {
  const [profilePosts, setProfilePosts] = useState<Post[]>([]);
  const [media, setMedia] = useState<Media[]>([]);
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    const getProfilePosts = async () => {
      if (userData?.id) {
        setLoading(true);
        const posts = await getUserPosts(userData?.id);
        setProfilePosts(posts?.postsData || []);
        setMedia(posts?.media || [])
        setLoading(false);
      }
    };
    getProfilePosts();
  }, [userData]);

  return (
    <div className="flex flex-col items-center w-full my-8">
      {loading ? <div><Loader></Loader></div> :profilePosts?.length > 0 ? (
        profilePosts.map((post, index) => <div className="w-full items-center justify-center flex" key={index}><Post media={media} post={post}></Post><Divider  className="my-5"></Divider></div>)
      ) : (
        <div className="flex items-center justify-center">
          <Typography className="text-xl text-black">No posts to show</Typography>
        </div>
      )}
    </div>
  );
};

export default ProfilePosts;
