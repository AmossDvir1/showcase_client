import { Typography } from "@mui/material";
import React, { ChangeEvent, useEffect, useRef, useState } from "react";
import { Button } from "../../components/Button";
import {
  activateUserWithOtp,
  sendValidationEmail,
} from "../../controllers/auth/validation";
import { useNavigate } from "react-router-dom";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import CancelIcon from "@mui/icons-material/Cancel";

const LEGAL_CHARS = "0123456789";

interface RequestProccess {
  sent:boolean,
  processed: boolean,
  success: boolean
}
const UserValidation: React.FC = () => {
  const navigate = useNavigate();

  const [emailSent, setEmailSent] = useState(false);
  const [reqState, setReqState] = useState<RequestProccess>({sent:false, processed:false, success:false});
  const [verificationCode, setVerificationCode] = useState([
    "",
    "",
    "",
    "",
    "",
    "",
  ]);
  const verificationCodeInputs = useRef<Array<HTMLInputElement | null>>([]);

  const handleSendEmail = async () => {
    const res = await sendValidationEmail();
    setEmailSent(true);
    // Focus the first input after email is sent
    if (verificationCodeInputs.current[0]) {
      verificationCodeInputs.current[0].focus();
    }
  };

  const changeCurrentDigit = (index: number, value = "") => {
    const newVerCode = verificationCode.map((digit, i) =>
      i === index ? value : digit
    );
    setVerificationCode(newVerCode);
  };

  const checkFullyTyped = (arr: string[]): boolean => {
    return arr.every(
      (item) =>
        item !== "" && !isNaN(Number(item)) && Number.isInteger(Number(item))
    );
  };

  const handleVerificationCodeKeyDown = (
    event: React.KeyboardEvent<HTMLInputElement>,
    index: number
  ) => {
    if (event.key === "Backspace" && index > 0) {
      if (event.currentTarget.value) {
        changeCurrentDigit(index);
      }
      event.preventDefault();
      verificationCodeInputs.current[index - 1]?.focus();
    }
    if (
      event.key.length === 1 &&
      LEGAL_CHARS.includes(event.key) &&
      verificationCodeInputs.current[index]?.value !== "" &&
      index + 1 <= verificationCode.length
    ) {
      verificationCodeInputs.current[index + 1]?.focus();
      if (index < verificationCode.length - 1) {
        changeCurrentDigit(index + 1, event.key);
      }
      event.preventDefault();
    }
  };
  const handleVerificationCodeChange = (index: number, value: string) => {
    const newVerificationCode = [...verificationCode];
    newVerificationCode[index] = value;
    if (LEGAL_CHARS.includes(newVerificationCode[index])) {
      setVerificationCode(newVerificationCode);
      // Move focus to the next input after each box is filled
      if (value && index < verificationCodeInputs.current.length - 1) {
        verificationCodeInputs.current[index + 1]?.focus();
      }
    }
  };

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent, index: number) => {
      handleVerificationCodeKeyDown(event as any, index);
    };

    // Add event listeners for Backspace keydown on each input box
    verificationCodeInputs.current.forEach((input, index) => {
      if (input) {
        input.addEventListener("keypress", (event) =>
          handleKeyDown(event, index)
        );
      }
    });

    // Clean up the event listeners when component unmounts
    return () => {
      verificationCodeInputs.current.forEach((input, index) => {
        if (input) {
          input.removeEventListener("keydown", (event) =>
            handleKeyDown(event, index)
          );
        }
      });
    };
  }, []);

  useEffect(() => console.log(reqState), [reqState]);

  useEffect(() => {
    if (checkFullyTyped(verificationCode)) {
      setReqState({sent:true, processed: false, success:false});
      const activateUser = async () => {
        
          console.log(verificationCode);
          const res = await activateUserWithOtp(verificationCode.join(""));
          setReqState({sent:true, processed: true, success:false});
          if (res?.success) {
            setReqState({sent:true, processed: true, success:true});
            console.log("User is activated");
            setTimeout(() => navigate("/"), 2000);
          }
          else{
            setReqState({sent:true, processed: true, success:false});
          }
        
        
      };
      activateUser();
    }
  }, [verificationCode]);

  return (
    <div className="bg-gray-100 flex flex-col items-center justify-center rounded-3xl p-7">
      <Typography className="text-primary text-5xl font-normal mb-4">
        Activate Your Account
      </Typography>
      {emailSent ? (
        <div className="flex flex-col items-center">
          <Typography className="text-gray-700 mb-4 text-xl">
            An email has been sent to your registered email address. Please
            enter the 6-digit verification code below:
          </Typography>
          <div className="flex items-center">
            {verificationCode.map((value, index) => (
              <input
                key={index}
                ref={(el) => (verificationCodeInputs.current[index] = el)}
                type="text"
                className="border border-gray-300 px-4 py-2 rounded-md w-9 mx-1 text-center"
                value={value}
                disabled={reqState.sent && reqState.processed && reqState.success}
                onChange={(e: ChangeEvent<HTMLInputElement>) =>
                  handleVerificationCodeChange(index, e.target.value)
                }
                onKeyDown={(e: React.KeyboardEvent<HTMLInputElement>) =>
                  handleVerificationCodeKeyDown(e, index)
                }
                maxLength={1}
              />
            ))}
            <div className="pl-8"></div>
            {reqState.sent && reqState.processed && reqState.success && (
              <CheckCircleIcon className="text-green-400"></CheckCircleIcon>
            )}
            {reqState.sent && reqState.processed && !reqState.success && (
              <CancelIcon className="text-red-500"></CancelIcon>
            )}
          </div>
        </div>
      ) : (
        <div>
          <Typography className="text-gray-700 mb-4 text-lg">
            Thank you for registering!<br></br>
            To complete the registration process, please click the button below
            to receive a verification email:
          </Typography>
          <Button onClick={handleSendEmail}>Send Verification Email</Button>
        </div>
      )}
    </div>
  );
};

export default UserValidation;
