import React from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../controllers/auth/useAuth";
import WarningAmberIcon from "@mui/icons-material/WarningAmber";
import { Typography } from "@mui/material";
import { Button } from "./sharedComponents/Button";

interface Props {
  visible?: boolean;
}
const ActivationBar: React.FC<Props> = ({ visible }) => {
  const auth = useAuth();
  const navigate = useNavigate();
  const onBarClick = () => {
    navigate("/user-activation");
  };
  return (
    <>
      {auth?.checkFinished && !(auth?.isActivated) && auth?.isAuthenticated && auth.checkFinished && (
        <Button bgcolorhover="hover:bg-[#FFB32F]" bgcolor="bg-[#FFC232]" textclassname="flex tracking-[0.25em] text-[rgb(0,0,0)]"
          className=" cursor-pointer text-red-400 flex h-14 w-full bg-[#f7a311]"
          onClick={onBarClick}
        >
          <WarningAmberIcon></WarningAmberIcon><Typography className="text-xl ml-5">Activate Your Account</Typography>
        </Button>
      )}
    </>
  );
};

export default ActivationBar;
