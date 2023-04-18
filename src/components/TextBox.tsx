import React, { useState, useEffect, TextareaHTMLAttributes } from "react";

interface Props extends TextareaHTMLAttributes<HTMLTextAreaElement> {
  // onChange?: (str: any) => void;
  defaultValue?: string;
  [rest: string]: any;
  resizable?: boolean;
  rows?: number;
  cols?: number;
  register?: any;
  name?: string;

}

export const TextBox: React.FC<Props> = ({
  defaultValue,
  // onChange,
  placeholder,
  resizable,
  rows,
  cols,
  register,
  name,
  ...rest
}) => {
  const [value, setValue] = useState<string>(defaultValue ?? "");

  // useEffect(() => onChange && onChange(value ?? ""), [onChange, value]);
  return (
    <textarea
      // value={value}
      placeholder={placeholder ?? ""}
      // onChange={(e) => {
      //   setValue(e.currentTarget.value);
      // }}
      {...rest}
      className={`${cols ? "" : "w-full"} font-sans ${
        resizable ? "" : "resize-none"
      } rounded-3xl border-0 py-1 focus:ring-inset focus:ring-indigo-600 hover:ring-indigo-400 text-gray-900 ring-1 ring-gray-300 placeholder:text-gray-400 focus:ring-2 sm:text-sm sm:leading-6 `}
      rows={rows ?? 4}
      cols={cols ?? 4}
      {...(name && {...register(name)})}

    />
  );
};
