import React, { useState, useEffect } from "react";
// import TextField from "@mui/material/TextField";
import { TextField as MuiTextField } from "@mui/material";
import InputAdornment from "@mui/material/InputAdornment";
import Tooltip from "@mui/material/Tooltip";
import ErrorIcon from "@mui/icons-material/Error";
import { colors } from "../../utils/theme";

interface ValidatedTextFieldProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  type?: string;
  validation?: (value: string) => boolean;
  errorText?: string;
  Icon?: React.ElementType; // Optional icon to show inside the input
}

const ValidatedTextField: React.FC<ValidatedTextFieldProps> = ({
  value,
  onChange,
  placeholder,
  type = "text",
  validation,
  errorText = "Invalid input",
  Icon,
}) => {
  const [isValid, setIsValid] = useState<boolean>(true);

  useEffect(() => {
    if (validation) {
      setIsValid(validation(value));
    }
  }, [value, validation]);

  return (
    <Tooltip
      title={!isValid ? errorText : ""}
      placement="top-end"
      disableHoverListener={isValid}
      arrow
    >
      {/* <TextField
        value={value}
        className="rounded-full mb-6 dark:bg-dark-paper-light dark:text-dark-text"
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        // type={type}
        fullWidth
        variant="outlined"
        error={!isValid}
        InputProps={{
            sx: { borderRadius: "100px", cursor: "default" },
            inputProps: {
              className: `rounded-full input-no-ring lg:text-sm xs:text-xs dark:bg-dark-paper-light
              dark:placeholder:text-neutral-400 dark:text-dark-text
              text-black 
              `,
            },
          startAdornment: Icon ? (
            <InputAdornment position="start">
              <Icon />
            </InputAdornment>
          ) : null,
          endAdornment: !isValid ? (
            <InputAdornment position="end">
              <ErrorIcon color="error" />
            </InputAdornment>
          ) : null,
        }}
        sx={{
          "& .MuiOutlinedInput-root": {
            "&.Mui-error fieldset": {
              borderColor: "#f44336", // Error color
            },
          },
          "& .MuiFormHelperText-root": {
            color: "#f44336",
          },
        }}
      /> */}
      <MuiTextField
                onChange={(e) => onChange(e.target.value)}
                value={value}
                type={type}
                placeholder="Write a comment..."
                fullWidth
                InputProps={{
                    startAdornment: Icon ? (
                        <InputAdornment position="start">
                          <Icon />
                        </InputAdornment>
                      ) : null,
                      endAdornment: !isValid ? (
                        <InputAdornment position="end">
                          <ErrorIcon color="error" />
                        </InputAdornment>
                      ) : null,
                  sx: { borderRadius: "100px", cursor: "default" },
                  inputProps: {
                    className: `input-no-ring lg:text-sm xs:text-xs dark:bg-dark-paper-light
                      dark:placeholder:text-neutral-400 dark:text-dark-text
                      text-black 
                      `,
                    style: {
                      borderTopLeftRadius: "100px",
                      borderBottomLeftRadius: "100px",
                    },
                  },
                }}
              />
    </Tooltip>
  );
};

export default ValidatedTextField;
