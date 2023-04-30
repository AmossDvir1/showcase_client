import React from "react";
import { Box, Grid, Typography } from "@mui/material";
import { TextField } from "../../../components/TextField";
import { TextBox } from "../../../components/TextBox";
import { Switch } from "../../../components/Switch";
import PublicIcon from "@mui/icons-material/Public";
import Diversity3Icon from "@mui/icons-material/Diversity3";
import { useFormContext, Controller } from "react-hook-form";

interface Props {}

export const CreateProjectForm: React.FC<Props> = () => {
  const { register, control, setValue, watch } = useFormContext(); // retrieve all hook methods
  const exposureLevel = watch("exposureLevel");

  return (
    <Box className="pt-14 pl-10 pr-10">
      <Box className="pb-12">
        <Typography className="pb-4">How do you call it?</Typography>
        <Box className="">
          <TextField
            errorText="Must Be Filled"
            validation={(value) => !!value}
            placeholder="Project Name"
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
        ></TextBox>
      </Box>
      <Box
        className="text-center"
        onClick={(e) => {
          setValue("exposureLevel", !exposureLevel);
          e.preventDefault();
        }}
      >
        <Typography className="cursor-default">
          Expose to {exposureLevel ? "World" : "Friends Only"}
        </Typography>
        <Box className="flex justify-center">
          <Grid container className="flex justify-center items-center">
            <Grid item>
              <Controller
                control={control}
                name="exposureLevel"
                defaultValue={false}
                render={({ field: { onChange, value } }) => (
                  <Switch checked={value} onChange={onChange} />
                )}
              ></Controller>
            </Grid>
            <Grid item>
              {exposureLevel ? (
                <PublicIcon
                  onClick={() => setValue("exposureLevel", !exposureLevel)}
                />
              ) : (
                <Diversity3Icon
                  onClick={() => setValue("exposureLevel", !exposureLevel)}
                />
              )}
            </Grid>
          </Grid>
        </Box>
      </Box>
    </Box>
  );
};
