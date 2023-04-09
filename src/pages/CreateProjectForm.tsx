import React, { Dispatch, SetStateAction, useEffect, useState } from "react";
import { Box, Typography } from "@mui/material";
import { TextField } from "../components/TextField";
import { TextBox } from "../components/TextBox";
import { Switch } from "../components/Switch";

interface Props {
  onProjectNameChange?: (value: string) => void;
}

export const CreateProjectForm: React.FC<Props> = ({ onProjectNameChange }) => {
  const [projectName, setProjectName] = useState<string>("");
  const [projectDesc, setProjectDesc] = useState<string>("");
  const [isExposed, SetIsExposed] = useState<boolean>(true);


    useEffect(() => onProjectNameChange && onProjectNameChange(projectName), [onProjectNameChange, projectName]);
  return (
    <Box>
      <Box className="pb-12">
        <Typography className="pb-4">How do you call it?</Typography>
        <TextField
          errorText="Must Be Filled"
          validation={(value) => !!value}
          placeholder="Project Name"
          onChange={setProjectName}
        ></TextField>
      </Box>
      <Box className="pb-12">
        <Typography className="pb-4">Add Your Description</Typography>
        <TextBox placeholder="Description" rows={5} className="resize-none pt-10" onChange={setProjectDesc}></TextBox>
      </Box>
      <Box className="flex justify-center pb-12">
        <Switch setSwitch={SetIsExposed} label={`Expose to ${isExposed?"World" : 'Friends Only'}`}></Switch>
      </Box>
    </Box>
  );
};
