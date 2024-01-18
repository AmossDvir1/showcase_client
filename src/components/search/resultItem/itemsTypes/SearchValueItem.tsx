import { FC, RefObject } from "react";
import { Typography } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";

interface Props extends React.HTMLAttributes<HTMLDivElement> {
  value: string;
  containerRef: RefObject<HTMLDivElement> | null | undefined;
  isFocused?: boolean;
  index: number;
  handleSelection: (selectedIndex: number) => void;
}

const SearchValueItem: FC<Props> = ({
  value,
  index,
  containerRef,
  isFocused,
  handleSelection,
}): JSX.Element => {
  return (
    <div
      className="cursor-pointer hover:bg-gray-200 p-2 flex items-center"
      onClick={() => {
        console.log("Hi");
      }}
      ref={containerRef}
      style={{
        backgroundColor: isFocused ? "rgba(40,0,0,0.1)" : "",
      }}
    >
      <SearchIcon className="text-primary mr-2"></SearchIcon>

      <Typography className="flex flex-row text-black">
        {"Search for "}
      </Typography>
        <Typography className="font-medium text-black pl-[3px]">{value}</Typography>
    </div>
  );
};

export default SearchValueItem;
