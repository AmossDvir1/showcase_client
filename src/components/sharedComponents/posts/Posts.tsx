import React, { useEffect, useState } from "react";
import { Divider } from "@mui/material";
import { Post } from "./Post";
import { getMyPosts } from "../../../controllers/postsController/getMyPostsController";

const Posts = () => {
  const [posts, setPosts] = useState<Post[]>([]);

  useEffect(() => {
    const fetchPosts = async () => {
      const data = await getMyPosts();
      if (data?.length > 0) {
        console.log(data)
        setPosts(data);
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
