import React from "react";
import { Button } from "../../components/sharedComponents/Button";
import { Typography } from "@mui/material";
import { Chip } from "../../components/sharedComponents/Chip";
import FavoriteIcon from "@mui/icons-material/Favorite";
import WorkIcon from "@mui/icons-material/Work";
import HomeIcon from "@mui/icons-material/Home";
import HistoryEduIcon from "@mui/icons-material/HistoryEdu";
import { extractMonthYear } from "../../utils/utils";
type ProfileInfoCardProps = {
  relationshipStatus?: string;
  work?: IWork[];
  livingPlace?: string;
  bio?: string;
  technologies: ChipItem[];
  isCurrentUser: boolean;
};

const ProfileInfoCard: React.FC<ProfileInfoCardProps> = ({
  relationshipStatus,
  work,
  livingPlace,
  bio,
  technologies,
  isCurrentUser,
}) => {
  const primaryWork = work?.find((work) => work.primary);
  return (
    <div className="bg-[#fcfcfc] shadow-lg border-zinc-200 border-solid border-[1px] p-4 rounded-lg h-full flex flex-col">
      <div className="mb-4 flex items-center">
        <FavoriteIcon className="text-gray-400 mr-2" />
        <Typography className="text-black">
          {relationshipStatus || "Not specified"}
        </Typography>
      </div>
      <div className="mb-4 flex items-center">
        <WorkIcon className="text-gray-400 mr-2" />

        {primaryWork ? (
          <div className="flex flex-col">
            <Typography className="text-black">
              {`${primaryWork.jobTitle} at ${primaryWork.workPlace}`}
            </Typography>
            <Typography className="text-gray-400 text-xs">
              {`Since ${extractMonthYear(primaryWork.startedAt)}`}
            </Typography>
          </div>
        ) : (
          <Typography className="text-black">Not specified</Typography>
        )}
      </div>
      <div className="mb-4 flex items-center">
        <HomeIcon className="text-gray-400 mr-2" />
        <Typography className="text-black">
          {livingPlace || "Not specified"}
        </Typography>
      </div>
      <div className="mb-4">
        <Typography className="text-black font-semibold mb-2">
          Technologies:
        </Typography>
        <div className="flex flex-wrap gap-2">
          {technologies?.map((tech, index) => (
            <div key={index}>
              <Chip
                iconSrc={tech.icon}
                id={tech._id}
                outlineColor={tech.color}
                label={tech.label}
                variant="outlined"
                color="primary"
              />
            </div>
          ))}
        </div>
      </div>
      <div className="mb-4 flex items-center">
        <HistoryEduIcon className="text-gray-400 mr-2" />
        <Typography className="text-black">
          {bio || "No bio available"}
        </Typography>
      </div>
      {isCurrentUser && (
        <Button
          btnsize={"sm"}
          round
          className="bg-primary w-full text-white px-4 py-2 hover:bg-primary-light focus:outline-none mt-auto"
          //   onClick={openDialog}
        >
          <Typography>Edit Details</Typography>
        </Button>
      )}
    </div>
  );
};

export default ProfileInfoCard;
