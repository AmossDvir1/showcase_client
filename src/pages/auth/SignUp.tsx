import React, { useState, useEffect, useContext } from "react";
import { Box, Grid, Typography } from "@mui/material";
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
import { reduxForm } from "redux-form";
import { serverReq } from "../../API/utils/axiosConfig";
import { SignUpFormContext, SignUpFormProvider } from "../../context/SignUpFormContext";
import { signUp } from "../../controllers/auth/signUp";
import { saveToLocalStorage } from "../../API/utils/saveToLocalStorage";
import { useAuth } from "../../controllers/auth/useAuth";

interface Props {}

export const SignUp: React.FC<Props> = () => {
  const { setIsAuthenticated } = useAuth();

  const navigate = useNavigate();
  const { formData, setFormData } = useContext(SignUpFormContext);

  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [username, setUsername] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [firstName, setFirstName] = useState<string>("hh");
  const [lastName, setLastName] = useState<string>("hh");
  const [formValid, setFormValid] = useState<boolean>(false);
  const onSubmitForm = async () => {
    setIsLoading(true);

    const res = await signUp({username, email, password, firstName, lastName});
    if (res && res?.success) {
      console.log("success");
      saveToLocalStorage("auth", {accessToken: res.accessToken, isLoggedIn: true});
      setIsAuthenticated(true);
      navigate("/", { replace:true });
    } else {
      setIsAuthenticated(false);
      console.error("error", res);
    }
    setIsLoading(false);
  };

  const handleChange = (e: React.FormEvent<HTMLInputElement>): void => {
    console.log(e.currentTarget.name)
    setFormData({
      
      ...formData,
      [e.currentTarget.name]: e.currentTarget.value,
    });
  };

  useEffect(
    () =>
      setFormValid(
        validateUsername(username) &&
          validateEmail(email) &&
          validatePassword(password)
      ),
    [username, email, password]
  );
  return (
    <Grid container className="flex items-center sm:mt-28 xs:mt-12">
      <Grid
        item
        className="xl:p-24 lg:p-0 xs:pb-8"
        xs={12}
        sm={12}
        md={12}
        lg={5}
      >
        <Typography className="sm:text-xl xs:text-lg md:text-2xl lg:text-3xl">
          At Showcase, we're committed to fostering a supportive and inclusive
          environment for developers of all backgrounds and skill levels. Join
          us today and become a part of our community!
        </Typography>
      </Grid>
      <Grid
        item
        xs={4}
        sm={4}
        md={4}
        lg={5}
        className="min-w-fit flex justify-center"
      >
        <Box className="flex flex-col w-fit min-w-[20rem] max-w-[28rem] bg-white rounded-[50px] text-center p-10 ">
            <Typography className="text-black text-3xl mt-7 mb-7">
              Sign up to Showcase
            </Typography>
            <Box className="py-3">
              <TextField
                validation={validateUsername}
                placeholder="Username"
                name="username"
                value={username}
                // value={formData.username}
                onChange={(e:React.ChangeEvent<HTMLInputElement>) => setUsername(e.target.value)}
                // onChange={handleChange}
                Icon={PersonIcon}
                type="text"
                errorText="Must be Between 2 and 20 Characters in Length"
              ></TextField>
            </Box>
            <Box className="py-3">
              <TextField
                validation={validateEmail}
                placeholder="Email"
                name="email"
                onChange={(e:React.ChangeEvent<HTMLInputElement>) => setEmail(e.target.value)}
                value={email}
                // value={formData.email}
                // onChange={handleChange}
                Icon={EmailIcon}
                type="email"
                errorText="Not a Valid Email Address"
              ></TextField>
            </Box>
            <Box className="py-3">
              <TextField
                validation={validatePassword}
                placeholder="Password"
                name="password"
                value={password}
                // value={formData.password}
                onChange={(e:React.ChangeEvent<HTMLInputElement>) => setPassword(e.target.value)}
                // onChange={handleChange}
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
                // disabled={!formValid || isLoading}
                loading={isLoading}
                round
                className="w-64"
                textclassname=""
                onClick={onSubmitForm}
              >
                Submit
              </Button>
            </Box>
        </Box>
      </Grid>

      <Grid item xs={12} sm={12} md={6} lg={4} className="">
        <Box
          draggable={false}
          className="xs:w-[21rem] sm:w-[24rem] md:w-[27rem] lg:w-[30rem]"
          component="img"
          src={require("../../assets/signUp-img.png")}
          alt="signup-img"
        ></Box>
      </Grid>
    </Grid>
  );
};
