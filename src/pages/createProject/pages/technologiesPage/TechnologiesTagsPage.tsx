import React, { useState, useEffect } from "react";
import { Box, Typography } from "@mui/material";
import { TechnologiesSelector } from "./TechnologiesSelector";
interface Props {}

export const TechnologiesTagsPage: React.FC<Props> = () => {
  const [selectedChips, setSelectedChips] = useState<
    [] | (ColoredChip | undefined)[]
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
      <TechnologiesSelector
        items={availableChips}
        setSelectedChips={setSelectedChips}
      ></TechnologiesSelector>
    </Box>
  );
};
