import React from "react";

interface Props {
  text: string;
}

export const Button: React.FC<Props> = ({ text }) => {
  return (
    <div className="bg-primary hover:bg-primary-light font-thin text-white text-center text-xl py-3.5 px-10 rounded-full w-fit cursor-default">
      {text.toUpperCase()}
    </div>
  );
};
