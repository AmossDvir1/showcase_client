import React, { useState, useEffect } from "react";
import { Box, Typography } from "@mui/material";
import ChipsSelector from "../../../../components/sharedComponents/ChipsSelector";
interface Props {}

export const TechnologiesTagsPage: React.FC<Props> = () => {
  const [selectedChips, setSelectedChips] = useState<
    [] | (undefined)[]
  >([]);
  const [availableChips, setAvailableChips] = useState<string[]>([]);

  useEffect(
    () =>
      setAvailableChips([
        "React",
        "Angular",
        "VueJS",
        "Python",
        "Java",
        "JavaScript",
        ".NET"
      ]),
    []
  );
  return (
    <Box>
      <Typography>Which Technologies Did You Use?</Typography>
      {/* <ChipsSelector
        items={availableChips}
        setSelectedChips={setSelectedChips}
      ></ChipsSelector> */}
    </Box>
  );
};
