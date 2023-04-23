import React, { SetStateAction, useState, useEffect } from "react";
import { Box, Typography } from "@mui/material";
import { TechnologiesSelector } from "./TechnologiesSelector";
import { Controller, useFormContext } from "react-hook-form";
interface Props {}

export const TechnologiesTagsPage: React.FC<Props> = () => {
  const [selectedChips, setSelectedChips] = useState<
    [] | (ColoredChip | undefined)[]
  >([]);
  const [availableChips, setAvailableChips] = useState<string[]>([]);
  const { register, control, setValue, watch } = useFormContext(); // retrieve all hook methods


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
                  setSelectedChips={setSelectedChips}
                  items={availableChips}
                  register={register}
                  name="techSelector"
                  defaultValue={[]}

                ></TechnologiesSelector>

    </Box>
  );
};
