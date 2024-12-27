import { FC, RefObject, useEffect } from "react";
import Profile from "./itemsTypes/Profile";
import Post from "./itemsTypes/Post";
import Project from "./itemsTypes/Project";
import { colors } from "../../../utils/theme";

interface Props extends React.HTMLAttributes<HTMLDivElement> {
  onItemClick: (selectedIndex: number) => void;
  index: number;
  itemDetails: ResultsItem;
  containerRef: RefObject<HTMLDivElement> | null | undefined;
  isFocused?: boolean;
}

const ResultItem: FC<Props> = ({
  onItemClick,
  index,
  containerRef,
  itemDetails,
  isFocused = false,
  ...rest
}): JSX.Element => {
  const renderItem = () => {
    switch (itemDetails.type) {
      case "profile":
        return <Profile details={itemDetails}></Profile>;
      case "post":
        return <Post details={itemDetails}></Post>;
      case "project":
        return <Project details={itemDetails}></Project>;
    }
  };

  useEffect(() => {
    if (isFocused && containerRef?.current) {
      containerRef.current.scrollIntoView({
        block: "center",
      });
    }
  }, [isFocused, containerRef]);

  return (
    <div
      className="cursor-pointer bg-paper hover:bg-hover dark:hover:bg-dark-paper dark:bg-dark-paper-dark p-2"
      onMouseDown={() => onItemClick && onItemClick(index)}
      ref={containerRef}
      style={{
        backgroundColor: isFocused ? colors.hover : "",
      }}
      {...rest}
    >
      {renderItem()}
    </div>
  );
};

export default ResultItem;
