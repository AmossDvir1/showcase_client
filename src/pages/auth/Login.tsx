import React, { useState, useEffect, FormEvent } from "react";
import { useAuth } from "../../context/AuthContext";
import { Box } from "@mui/material";
import Typography from "../../components/sharedComponents/Typography";
import { TextField } from "../../components/sharedComponents/TextField";
import PersonIcon from "@mui/icons-material/Person";
import PasswordIcon from "@mui/icons-material/Password";
import { Button } from "../../components/sharedComponents/Button";
import CustomButton from "../../components/sharedComponents/CustomButton";
import {
  validatePassword,
  validateUsername,
} from "../../utils/stringValidation";
import { useNavigate } from "react-router-dom";
import ValidatedTextField from "../../components/sharedComponents/ValidatedTextField";

export const Login: React.FC = () => {
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

  useEffect(() => {
    setFormValid(
      validateUsername(username) && validatePassword(password) && !isLoading
    );
  }, [username, password, isLoading]);

  return (
    <Box
      className="flex items-center justify-center min-h-[calc(70vh)] md:mt-24 mt-16 bg-cover bg-center"
      style={{
        backgroundImage: `url('https://source.unsplash.com/1920x1080/?technology,futuristic')`,
      }}
    >
      <Box className="relative z-10 p-8 xs:w-80 lg:w-96 rounded-3xl shadow-lg backdrop-blur-md bg-paper-light dark:bg-dark-paper">
        <Typography className="text-primary dark:text-dark-text font-extrabold text-3xl text-center mb-4">
          Welcome Back
        </Typography>
        <Typography className="text-gray-500 dark:text-dark-text-muted text-center mb-8">
          Log in to access your account
        </Typography>
        <form onSubmit={onLogin}>
          <Box className="mb-4">
            <ValidatedTextField
              value={username}
              onChange={setUsername}
              placeholder="Username or Email"
              validation={validateUsername}
              errorText="Must be between 2 and 20 characters"
              Icon={PersonIcon}
            />
          </Box>
          <Box className="mb-4">
            <ValidatedTextField
              value={password}
              onChange={setPassword}
              placeholder="Password"
              validation={validatePassword}
              errorText="Password must contain uppercase, lowercase, numbers, and special characters"
              type="password"
              Icon={PasswordIcon}
            />
          </Box>
          <Typography
            onClick={() => navigate("/sign_up")}
            className="text-primary dark:text-dark-text-light text-sm cursor-pointer text-center mb-6 hover:underline"
          >
            Don't have an account? Sign Up
          </Typography>
          <CustomButton
            disabled={!formValid}
            variant="outlined"
            loading={isLoading}
            fullWidth
            type="submit"
            className="w-full py-3 font-normal rounded-full"
          >
            Log In
          </CustomButton>
        </form>
      </Box>
    </Box>
  );
};
