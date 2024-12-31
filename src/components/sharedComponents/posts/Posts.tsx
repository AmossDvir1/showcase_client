import { useEffect, useState } from "react";
import { Divider, Typography } from "@mui/material";
import { Post } from "./Post";
import { getMyPosts } from "../../../controllers/postsController/getMyPostsController";
import Loader from "../Loader";

const Posts = () => {
  const [posts, setPosts] = useState<Post[]>([]);
  const [media, setMedia] = useState<PictureData[]>([]);
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    const fetchPosts = async () => {
      setLoading(true);
      const data = await getMyPosts();
      if (data?.postsData?.length > 0) {
        setPosts(data?.postsData);
        setMedia(data?.media);
      }
      setLoading(false);
    };
    fetchPosts();
  }, []);
  return loading ? (
    <div className="flex justify-center items-center xs:pt-4 lg:pt-14">
      <Loader size="lg"></Loader>
    </div>
  ) : posts?.length > 0 ? (
    <div>
      {posts?.map((post: any, index: number) => (
        <div className="pt-1" key={index}>
          <Post media={media} setPosts={setPosts} post={post}></Post>
        </div>
      ))}
    </div>
  ) : (
    <div className="mt-12 flex items-center justify-center">
      <Typography>No posts to show</Typography>
    </div>
  );
};

export default Posts;
