import React, { useState, useEffect, FormEvent } from "react";
import { useAuth } from "../../context/AuthContext";
import { Box } from "@mui/material";
import Typography from "../../components/sharedComponents/Typography";
import { TextField } from "../../components/sharedComponents/TextField";
import PersonIcon from "@mui/icons-material/Person";
import PasswordIcon from "@mui/icons-material/Password";
import { Button } from "../../components/sharedComponents/Button";
import {
  validatePassword,
  validateUsername,
} from "../../utils/stringValidation";
import { useNavigate } from "react-router-dom";

interface Props {}

export const Login: React.FC<Props> = () => {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [username, setUsername] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [formValid, setFormValid] = useState<boolean>(false);
  const auth = useAuth();

  const onLogin = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);
    await auth.login(username, password);
    navigate("/");
    navigate(0);
    setIsLoading(false);
  };

  useEffect(
    () =>
      setFormValid(
        validateUsername(username) && validatePassword(password) && !isLoading
      ),
    [username, password, isLoading]
  );
  return (
    <Box className="flex items-center flex-col xs:m-auto lg:m-0 lg:mt-24 lg:w-96 lg:h-fit xs:w-56 xs:h-fit bg-white xs:rounded-[30px] lg:rounded-[50px] text-center p-10">
      <Typography className="text-black xs:text-lg lg:text-3xl lg:pt-7 xs:pt-0 lg:pb-7 xs:pb-3">
        Log in to Showcase
      </Typography>
      <form onSubmit={onLogin}>
        <Box className="py-3">
          <TextField
            validation={validateUsername}
            placeholder="Username/Email"
            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
              setUsername(e.target.value)
            }
            value={username}
            Icon={PersonIcon}
            type="text"
            errorText="Must be Between 2 and 20 Characters in Length"
          ></TextField>
        </Box>
        <Box className="py-3">
          <TextField
            validation={validatePassword}
            placeholder="Password"
            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
              setPassword(e.target.value)
            }
            value={password}
            Icon={PasswordIcon}
            type="password"
            errorText="Password Must Combine Lowercase Letters, Uppercase Letters, Numbers, And Special Characters"
          ></TextField>
        </Box>

        <Box>
          <Typography
            onClick={() => navigate("/sign_up")}
            className="text-black cursor-pointer"
          >
            Don't Have an Account? Sign Up
          </Typography>
        </Box>
        <Box className="xs:pt-4 lg:pt-12">
          <Button
            disabled={!formValid}
            loading={isLoading}
            round
            type="submit"
            className="w-72"
            textclassname=""
          >
            Submit
          </Button>
        </Box>
      </form>
    </Box>
  );
};
