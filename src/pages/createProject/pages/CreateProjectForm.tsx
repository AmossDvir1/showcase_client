import React, { useEffect, useState } from "react";
import { Box, Grid, Typography } from "@mui/material";
import { TextField } from "../../../components/TextField";
import { TextBox } from "../../../components/TextBox";
import { Switch } from "../../../components/Switch";
import PublicIcon from "@mui/icons-material/Public";
import Diversity3Icon from "@mui/icons-material/Diversity3";
import { useFormContext } from "react-hook-form";

interface Props {
  onProjectNameChange?: (value: string) => void;
}

export const CreateProjectForm: React.FC<Props> = ({ onProjectNameChange }) => {
  const [projectName, setProjectName] = useState<string>("");
  const [projectDesc, setProjectDesc] = useState<string>("");
  const [isExposed, SetIsExposed] = useState<boolean>(true);
  const { register } = useFormContext(); // retrieve all hook methods

  useEffect(
    () => onProjectNameChange && onProjectNameChange(projectName),
    [onProjectNameChange, projectName]
  );
  return (
    <Box className="pt-14 pl-10 pr-10">
      <Box className="pb-12">
        <Typography className="pb-4">How do you call it?</Typography>
        <Box className="">
          <TextField
            errorText="Must Be Filled"
            validation={(value) => !!value}
            placeholder="Project Name"
            // onChange={setProjectName}
            // {...register("projectName")}
            register={register}
            name="projectName"
          ></TextField>
        </Box>
      </Box>
      <Box className="pb-12">
        <Typography className="pb-4">Add Your Description</Typography>
        <TextBox
          placeholder="Description"
          rows={5}
          className="resize-none pt-10"
          register={register}
          name="projectDescription"

          // onChange={setProjectDesc}
          // {...register("projectDescription")}
        ></TextBox>
      </Box>
      <Box className="text-center">
        <Typography>
          Expose to {isExposed ? "World" : "Friends Only"}
        </Typography>
        <Box className="flex justify-center">
          <Grid container className="flex justify-center items-center">
            <Grid item>
              <Switch
                value={isExposed}
                setSwitch={SetIsExposed}
                register={register}
                name="exposureLEvel"
                // {...register("exposureLEvel")}
              ></Switch>
            </Grid>
            <Grid item>
              {isExposed ? (
                <PublicIcon
                  onClick={() => SetIsExposed && SetIsExposed(!isExposed)}
                />
              ) : (
                <Diversity3Icon
                  onClick={() => SetIsExposed && SetIsExposed(!isExposed)}
                />
              )}
            </Grid>
          </Grid>
        </Box>
      </Box>
    </Box>
  );
};
