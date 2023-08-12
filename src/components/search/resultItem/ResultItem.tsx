import { FC, RefObject, useEffect } from "react";
import Profile from "./itemsTypes/Profile";
import Post from "./itemsTypes/Post";
import Project from "./itemsTypes/Project";

interface Props extends React.HTMLAttributes<HTMLDivElement> {
  handleSelection: (selectedIndex: number) => void;
  index: number;
  itemDetails: ResultsItem;
  containerRef: RefObject<HTMLDivElement> | null | undefined;
  isFocused?: boolean;
}

const ResultItem: FC<Props> = ({
  handleSelection,
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
    if (isFocused && containerRef && containerRef.current) {
      containerRef.current.scrollIntoView({
        block: "center",
      });
    }
  }, [isFocused, containerRef]);

  return (
    <div
      className="cursor-pointer hover:bg-gray-200 p-2"
      onMouseDown={() => handleSelection(index)}
      ref={containerRef}
      style={{
        backgroundColor: isFocused ? "rgba(40,0,0,0.1)" : "",
      }}
      {...rest}
    >
      {renderItem()}
    </div>
  );
};

export default ResultItem;
