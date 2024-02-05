import React from "react";
import { Typography } from "@mui/material";
import { formatTime } from "../../utils/utils";
import { Tooltip } from "./Tooltip";

interface ElapsedTimeLabelProps {
  date: string;
}
const ElapsedTimeLabel: React.FC<ElapsedTimeLabelProps> = ({ date }) => {
  const { relativeTime, exactTime } = formatTime(date);

  return (
    <Tooltip title={exactTime} placement={"bottom"}>
      <Typography className="text-gray-500 text-sm cursor-default">
        {relativeTime}
      </Typography>
    </Tooltip>
  );
};

export default ElapsedTimeLabel;
