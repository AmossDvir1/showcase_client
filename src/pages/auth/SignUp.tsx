import React, { useState, useEffect } from "react";
import { Box, Typography } from "@mui/material";
import { TextField } from "../../components/TextField";
import EmailIcon from "@mui/icons-material/Email";
import PersonIcon from "@mui/icons-material/Person";
import PasswordIcon from "@mui/icons-material/Password";
import { Button } from "../../components/Button";
import {
  validateEmail,
  validatePassword,
  validateUsername,
} from "../../utils/stringValidation";
import { useNavigate } from "react-router-dom";

interface Props {}

export const SignUp: React.FC<Props> = () => {
  const navigate = useNavigate();


  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [username, setUsername] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [formValid, setFormValid] = useState<boolean>(false);

  useEffect(
    () => setFormValid(validateUsername(username) && validateEmail(email) && validatePassword(password)),
    [username, email, password]
  );
  return (
    <Box className="flex-col w-96 h-96 bg-white rounded-[50px] text-center p-10 mt-28 flex">
      <Typography className="text-black text-3xl mt-7 mb-7">
        Sign up to Showcase
      </Typography>
      <Box className="py-3">
        <TextField
          validation={validateUsername}
          placeholder="Username"
          onChange={(value) => setUsername(value)}
          Icon={PersonIcon}
          type="text"
          errorText="Must be Between 2 and 20 Characters in Length"
        ></TextField>
      </Box>
      <Box className="py-3">
        <TextField
          validation={validateEmail}
          placeholder="Email"
          onChange={(value) => setEmail(value)}
          Icon={EmailIcon}
          type="email"
          errorText="Not a Valid Email Address"
        ></TextField>
      </Box>
      <Box className="py-3">
        <TextField
          validation={validatePassword}
          placeholder="Password"
          onChange={(value) => setPassword(value)}
          Icon={PasswordIcon}
          type="password"
          errorText="Password Must Combine Lowercase Letters, Uppercase Letters, Numbers, And Special Characters"
        ></TextField>
      </Box>

      <Box>
        <Typography
          onClick={() => navigate("/login")}
          className="text-black cursor-pointer"
        >
          Already Have an Account? Log In
        </Typography>
      </Box>
      <Box className="pt-12">
        <Button
          disabled={!formValid ?? true}
          loading={isLoading}
          round
          className="w-64"
          textclassname=""
          onClick={() => setIsLoading(true)}
        >
          Submit
        </Button>
      </Box>
    </Box>
  );
};
