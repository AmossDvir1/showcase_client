import React, { useState, useEffect } from "react";
import { Box, Typography } from "@mui/material";
import { TechnologiesSelector } from "./TechnologiesSelector";
import { useFormContext } from "react-hook-form";
interface Props {}

export const TechnologiesTagsPage: React.FC<Props> = () => {
  const [availableChips, setAvailableChips] = useState<string[]>([]);
  const { register } = useFormContext(); // retrieve all hook methods


  useEffect(
    () =>
      setAvailableChips([
        "React",
        "Angular",
        "VueJS",
        "Python",
        "Java",
        "JavaScript",
      ]),
    []
  );
  return (
    <Box>
      <Typography>Which Technologies Did You Use?</Typography>
      <TechnologiesSelector
                  items={availableChips}
                  register={register}
                  name="techSelector"
                  defaultValue={[]}

                ></TechnologiesSelector>

    </Box>
  );
};
