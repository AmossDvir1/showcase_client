import Typography from "@mui/material/Typography";
import React, { ReactElement } from "react";
import { homePageTitle } from "../common/constants";
import { toTitleCase } from "../common/utils";

interface Props {}

export const HomePage: React.FC<Props> = () => {
  return (
    <Typography
    //   fontSize={50}
      className="text-secondary whitespace-pre-line font-light text-center text-4xl"
    >
      {toTitleCase("the Platform to\nshowcase, connect,\nand collaborate")}
    </Typography>
  );
};
