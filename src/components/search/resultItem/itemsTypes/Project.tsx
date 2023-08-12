import { FC } from "react";
import { Typography } from "@mui/material";
import AppsIcon from "@mui/icons-material/Apps";

interface Props extends React.HTMLAttributes<HTMLDivElement> {
  details: ResultsItem;
}

const Project: FC<Props> = ({ details }): JSX.Element => {
  return (
    <div className="flex items-center">
      <AppsIcon className="text-primary mr-2" />
      <Typography className="text-black py-1">{details.title}</Typography>
    </div>
  );
};

export default Project;
