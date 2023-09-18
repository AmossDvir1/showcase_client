import { Typography } from "@mui/material";
import React from "react";

import { useNavigate } from "react-router-dom";
import { Button } from "../../components/sharedComponents/Button";

const UserAlreadyActivated: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className="bg-gray-100 flex flex-col items-center justify-center rounded-3xl p-7 mt-10">
      <Typography className="text-primary text-5xl font-normal mb-4">
        {"User is Already Activated :)"}
      </Typography>
      <Button onClick={() => navigate("/")}>Go Home</Button>
    </div>
  );
};

export default UserAlreadyActivated;
