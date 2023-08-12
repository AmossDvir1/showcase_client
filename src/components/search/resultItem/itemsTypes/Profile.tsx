import { FC } from "react";
import { Typography } from "@mui/material";
import Person2Icon from "@mui/icons-material/Person2";

interface Props extends React.HTMLAttributes<HTMLDivElement> {
  details: ResultsItem;
}

const Profile: FC<Props> = ({ details }): JSX.Element => {
  return (
    <div className="flex items-center pr-2">
      <Person2Icon className="text-primary mr-2" />
      <Typography className="text-black py-1">{`${details.title} ${details.content}`}</Typography>
    </div>
  );
};

export default Profile;
