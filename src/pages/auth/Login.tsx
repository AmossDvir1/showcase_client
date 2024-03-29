import React, { useState, useEffect, FormEvent } from "react";
import { Box, Typography } from "@mui/material";
import { TextField } from "../../components/sharedComponents/TextField";
import PersonIcon from "@mui/icons-material/Person";
import PasswordIcon from "@mui/icons-material/Password";
import { Button } from "../../components/sharedComponents/Button";
import {
  validatePassword,
  validateUsername,
} from "../../utils/stringValidation";
import { useNavigate } from "react-router-dom";
import { login } from "../../controllers/auth/loginUser";
import { saveToLocalStorage } from "../../API/utils/saveToLocalStorage";
import { showToast } from "../../utils/toast";
import { useAuth } from "../../controllers/auth/useAuth";

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
    const res = await login({ username, password });
    if (res && res?.success) {
      showToast("Successfully Logged In", "Login Success", "success");
      console.log("successful login");
      saveToLocalStorage("auth", {
        accessToken: res.accessToken,
        isLoggedIn: true,
      });
      auth.setIsAuthenticated(true);
      navigate("/");
      navigate(0);
    } else {
      console.error("error", res);
    }
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
    <Box className="flex-col w-96 h-96 bg-white rounded-[50px] text-center p-10 mt-28 flex">
      <Typography className="text-black text-3xl mt-7 mb-7">
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
        <Box className="pt-12">
          <Button
            disabled={!formValid ?? true}
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
