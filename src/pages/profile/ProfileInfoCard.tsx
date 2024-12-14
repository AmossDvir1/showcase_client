import React from "react";
import { Button } from "../../components/sharedComponents/Button";
import Typography from "../../components/sharedComponents/Typography";
import { Chip } from "../../components/sharedComponents/Chip";
import FavoriteIcon from "@mui/icons-material/Favorite";
import WorkIcon from "@mui/icons-material/Work";
import HomeIcon from "@mui/icons-material/Home";
import HistoryEduIcon from "@mui/icons-material/HistoryEdu";
import { extractMonthYear } from "../../utils/utils";
import CustomButton from "../../components/sharedComponents/CustomButton";
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
    <div className="bg-[#fcfcfc] dark:bg-dark-paper shadow-lg border-zinc-200 border-solid border-[1px] p-4 rounded-lg h-full flex flex-col">
      <div className="mb-4 flex items-center">
        <FavoriteIcon className="dark:text-gray-400 text-gray-400 mr-2" />
        <Typography className="dark:text-black text-black">
          {relationshipStatus || "Not specified"}
        </Typography>
      </div>
      <div className="mb-4 flex items-center">
        <WorkIcon className="dark:text-gray-400 text-gray-400 mr-2" />

        {primaryWork ? (
          <div className="flex flex-col">
            <Typography className="dark:text-black text-black">
              {`${primaryWork.jobTitle} at ${primaryWork.workPlace}`}
            </Typography>
            <Typography className="dark:text-gray-400 text-gray-400 text-xs">
              {`Since ${extractMonthYear(primaryWork.startedAt)}`}
            </Typography>
          </div>
        ) : (
          <Typography className="dark:text-black text-black">Not specified</Typography>
        )}
      </div>
      <div className="mb-4 flex items-center">
        <HomeIcon className="dark:text-gray-400 text-gray-400 mr-2" />
        <Typography className="dark:text-black text-black">
          {livingPlace || "Not specified"}
        </Typography>
      </div>
      <div className="mb-4">
        <Typography className="dark:text-black text-black font-semibold mb-2">
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
        <Typography className="dark:text-black text-black">
          {bio || "No bio available"}
        </Typography>
      </div>
      {isCurrentUser && (

        <div className="mt-auto">
          <CustomButton
          fullWidth
            className="px-4 py-2 text-sm "
            variant="outlined"
            size="medium"
            glow={false}
            // onClick={openDialog}
          >
            Edit Details
          </CustomButton>
        </div>
      )}
    </div>
  );
};

export default ProfileInfoCard;
