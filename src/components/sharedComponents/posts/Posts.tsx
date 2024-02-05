import React, { useEffect, useState } from "react";
import { Divider } from "@mui/material";
import { Post } from "./Post";
import { getMyPosts } from "../../../controllers/postsController/getMyPostsController";

const Posts = () => {
  const [posts, setPosts] = useState<Post[]>([]);
  const [media, setMedia] = useState<Media[]>([]);

  useEffect(() => {
    const fetchPosts = async () => {
      const data = await getMyPosts();
      if (data?.postsData?.length > 0) {
        console.log(data)
        setPosts(data?.postsData);
        setMedia(data?.media);
      }
    };
    fetchPosts();
  }, []);
  return posts?.length > 0 ? (
    <div>
      {posts?.map((post: any, index: number) => (
        <div key={index}>
          <Divider />
          <Post
          media={media}
            setPosts={setPosts}
            post={post}
          ></Post>
        </div>
      ))}
    </div>
  ) : (
    <></>
  );
};

export default Posts;
