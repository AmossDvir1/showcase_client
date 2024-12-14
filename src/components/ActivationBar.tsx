import React from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import WarningAmberIcon from "@mui/icons-material/WarningAmber";
import Typography from "./sharedComponents/Typography";
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
      {auth?.checkFinished && !(auth?.isActivated) && auth?.isAuthenticated && (
        <Button bgcolorhover="hover:bg-[#FFB32F]" bgcolor="bg-[#FFC232]" textclassname=" flex tracking-[0.25em] text-[rgb(0,0,0)]"
          className="cursor-pointer flex h-20 w-full bg-[#f7a311] z-[1500]"
          onClick={onBarClick}
        >
          <div className="flex items-center justify-center"><WarningAmberIcon></WarningAmberIcon><Typography className="md:text-xl text-md ml-5">Activate Your Account</Typography></div>
        </Button>
      )}
    </>
  );
};

export default ActivationBar;
