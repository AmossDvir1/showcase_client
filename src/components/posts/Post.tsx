import { Typography } from "@mui/material";
import React from "react";

interface PostProps {
  content: string;
}
export const Post: React.FC<PostProps>  = ({ content }) => {
  return (
    <div
      className={`w-full min-h-[100px] my-2
      bg-slate-50 flex flex-col rounded-lg p-[35px]`}
    >
      <Typography className="text-slate-400">{content}</Typography>
    </div>
  );
};
