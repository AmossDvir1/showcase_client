import { Typography } from "@mui/material";
import React from "react";

interface CommentProps {
    value: string;
    user?: string;
    date?: string;
}
const Comment:React.FC<CommentProps> = ({value, user, date}) => {
  return <div><Typography className="text-black">{value}</Typography></div>;
};

export default Comment;
