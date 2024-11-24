import { FC } from "react";
import { Avatar, Typography } from "@mui/material";
import Person2Icon from "@mui/icons-material/Person2";
import { convertPictureToURI } from "../../../../utils/utils";

interface Props extends React.HTMLAttributes<HTMLDivElement> {
  details: ResultsItem;
}

const Profile: FC<Props> = ({ details }): JSX.Element => {
  return (
    <div className="flex items-center">
      {details.icon ? (
        <Avatar
          className="w-[36px] h-[36px] mr-2"
          alt="profile"
          // sx={{ width: 36, height: 36 }}
          src={convertPictureToURI(details.icon.imageStringBase64)}
        ></Avatar>
      ) : (
        <Person2Icon className="text-primary mr-2" />
      )}
      <Typography className="text-black py-1">{`${details.title} ${details.content}`}</Typography>
    </div>
  );
};

export default Profile;
