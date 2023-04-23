import React, {
  useState,
  InputHTMLAttributes,
  useEffect,
  SetStateAction,
} from "react";
import { SvgIconComponent } from "@mui/icons-material";
import { Box } from "@mui/material";
import { Tooltip } from "./Tooltip";
import ErrorOutlineIcon from "@mui/icons-material/ErrorOutline";
import { FieldValues, UseFormRegister } from "react-hook-form";

interface Props extends InputHTMLAttributes<HTMLInputElement> {
  Icon?: SvgIconComponent;
  // onChange?: (str: any) => void;
  defaultValue?: string;
  validation?: (value: string | undefined) => boolean;
  errorText?: string;
  register?: UseFormRegister<FieldValues>;
  // name?: string
}

export const TextField: React.FC<Props> = ({
  defaultValue,
  // onChange,
  placeholder,
  Icon,
  type,
  validation,
  errorText,
  register,
  name,
  ...rest
}) => {
  const [isValid, setIsValid] = useState<SetStateAction<boolean>>(true);
  // const [value, setValue] = useState<string>(defaultValue ?? "");

  // useEffect(() => onChange && onChange(value ?? ""), [onChange, value]);
  return (
    <Box>
      <div className="relative">
        <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
          {Icon && <Icon className="text-gray-300 sm:text-md mr-6"></Icon>}
        </div>
        <div className={`cursor-default absolute inset-y-0 right-0 flex items-center ${type === "password" ? 'mr-8': ''}`}>
          {!isValid && (
            <Tooltip isError title={errorText} arrow>
              <ErrorOutlineIcon className="text-red-700 sm:text-md" />
            </Tooltip>
          )}
        </div>
        <input
        // autoFocus 
          // value={value}
          type={type ?? ""}
          // name={type?? ''}
          className={`font-sans block ${
            Icon ? "w-[calc(100%-2.75rem)]" : "w-[calc(100%-0.75rem)]"
          } rounded-full border-0 py-1 ${
            Icon ? "pl-11" : "pl-3"
          } ${
            !isValid
              ? "ring-red-700 hover:ring-2"
              : "focus:ring-inset focus:ring-indigo-600 hover:ring-indigo-400"
          }  ring-1 ring-gray-300 placeholder:text-gray-400 focus:ring-2 sm:text-sm sm:leading-6 `}
          placeholder={placeholder ?? ""}
          // onBlur={(e) =>
          //   validation && setIsValid(!!validation(e.currentTarget.value))
          // }
          // onChange={(e) => {
          //   setValue(e.currentTarget.value);
          // }}
          {...(name && register && {...register(name)})}
          {...rest}
        />
      </div>
    </Box>
  );
};
