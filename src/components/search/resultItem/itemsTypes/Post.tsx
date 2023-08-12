import { FC } from "react";
import { Typography } from "@mui/material";
import NotesIcon from "@mui/icons-material/Notes";

interface Props extends React.HTMLAttributes<HTMLDivElement> {
  details: ResultsItem;
}

const Post: FC<Props> = ({ details }): JSX.Element => {
  return (
    <div className="flex items-center pr-2">
      <NotesIcon className="text-primary mr-2" />
      <Typography className="text-black py-1">{details.title}</Typography>
    </div>
  );
};

export default Post;
