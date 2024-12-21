import { FC, RefObject } from "react";
import Typography from "../../../sharedComponents/Typography";
import SearchIcon from "@mui/icons-material/Search";
import { colors } from "../../../../utils/theme";

interface Props extends React.HTMLAttributes<HTMLDivElement> {
  value: string;
  containerRef: RefObject<HTMLDivElement> | null | undefined;
  isFocused?: boolean;
  index: number;
  onItemClick: () => void;
}

const SearchValueItem: FC<Props> = ({
  value,
  index,
  containerRef,
  isFocused,
  onItemClick,
}): JSX.Element => {
  return (
    <div
      className="cursor-pointer hover:bg-hover p-2 flex items-center"
      onMouseDown={() => onItemClick && onItemClick()}
      ref={containerRef}
      style={{
        backgroundColor: isFocused ? colors.hover : "",
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
