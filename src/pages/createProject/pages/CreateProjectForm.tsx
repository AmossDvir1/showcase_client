import React, {
  ChangeEvent,
  Dispatch,
  SetStateAction,
  useContext,
  useState,
} from "react";
import { Box, Grid, Typography } from "@mui/material";
import { TextField } from "../../../components/sharedComponents/TextField";
import { TextBox } from "../../../components/sharedComponents/TextBox";
import { Switch } from "../../../components/sharedComponents/Switch";
import PublicIcon from "@mui/icons-material/Public";
import Diversity3Icon from "@mui/icons-material/Diversity3";
import { CreateProjectContext } from "../../../context/CreateProjectContext";

interface Props {setData: Dispatch<SetStateAction<{ projectName: string; projectDesc: string; isExposed: string; }>>}

export const CreateProjectForm: React.FC<Props> = ({setData}) => {
  const [isExposed, setIsExposed] = useState<boolean>(false);
  const { formData, updateFormData } = useContext(CreateProjectContext);

  const onDataChange = (
    e: ChangeEvent<HTMLTextAreaElement> | React.ChangeEvent<HTMLInputElement>
  ) => {
    setData({
      ...formData,
      [e.target.name]: e.target.value,
    });
    updateFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <Box className="pt-14 pl-10 pr-10">
      <Box className="pb-12">
        <Typography className="pb-4">How do you call it?</Typography>
        <Box className="">
          <TextField
            errorText="Must Be Filled"
            validation={(value) => !!value}
            placeholder="Project Name"
            name="projectName"
            value={formData.projectName}
            onChange={onDataChange}
          ></TextField>
        </Box>
      </Box>
      <Box className="pb-12">
        <Typography className="pb-4">Add Your Description</Typography>
        <TextBox
          placeholder="Description"
          rows={5}
          className="resize-none pt-10"
          name="projectDesc"
          value={formData.projectDesc}
          onChange={onDataChange}
        ></TextBox>
      </Box>
      <Box
        className="text-center"
        // onClick={(e: React.ChangeEvent<HTMLInputElement>) => {
        //   setDialogData({
        //     ...dialogData,
        //     [e.target.name]: e.target.value,
        //   });
        //   // setIsExposed(!isExposed);
        //   e.preventDefault();
        // }}
      >
        <Typography className="cursor-default">
          Expose to {isExposed ? "World" : "Friends Only"}
        </Typography>
        <Box className="flex justify-center">
          <Grid container className="flex justify-center items-center">
            <Grid item>
              <Switch checked={isExposed} onChange={setIsExposed} />
            </Grid>
            <Grid item>
              {isExposed ? (
                <PublicIcon onClick={() => setIsExposed(!isExposed)} />
              ) : (
                <Diversity3Icon onClick={() => setIsExposed(!isExposed)} />
              )}
            </Grid>
          </Grid>
        </Box>
      </Box>
    </Box>
  );
};
