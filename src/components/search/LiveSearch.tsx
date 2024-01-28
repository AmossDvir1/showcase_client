import { useCallback, useEffect, useRef, useState } from "react";
import { InputBase, Typography } from "@mui/material";
import { Search as SearchIcon } from "@mui/icons-material";
import ResultItem from "./resultItem/ResultItem";
import SearchValueItem from "./resultItem/itemsTypes/SearchValueItem";
import ResponsiveComponent from "../responsiveness/ResponsiveComponent";
import { Navigate, useNavigate } from "react-router-dom";

interface Props<T> {
  results?: T[];
  onChange: (value: string) => void;
  onSelect?: (item: T) => void;
  value?: string;
}

const LiveSearch = <T extends ResultsItem>({
  results = [],
  value,
  onChange,
  onSelect,
}: Props<T>): JSX.Element => {
  const navigate = useNavigate();
  const [focusedIndex, setFocusedIndex] = useState(-1);
  const resultContainer = useRef<HTMLDivElement>(null);
  const [showResults, setShowResults] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);

  const onItemClick = (index: number) => {
    const selectedItem = results[index];
    // if (!selectedItem) return resetSearchComplete();
    onSelect?.(selectedItem);
    // resetSearchComplete();
    navigate(`/${selectedItem.type}/${selectedItem.urlMapping}`);
    // onChange("") // reset the search bar
  };

  const resetSearchComplete = useCallback(() => {
    setFocusedIndex(-1);
    setShowResults(false);
  }, []);

  const handleBlur = () => {
    if (!value || value.length < 10) {
      setIsExpanded(false);
    }
  };

  const handleKeyDown: React.KeyboardEventHandler<HTMLInputElement> = (e) => {
    const { key } = e;
    let nextIndexCount = 0;

    // move down
    if (key === "ArrowDown")
      nextIndexCount = (focusedIndex + 1) % (results.length + 1);

    // move up
    if (key === "ArrowUp")
      nextIndexCount = (focusedIndex + results.length) % (results.length + 1);

    // hide search results
    if (key === "Escape") {
      resetSearchComplete();
    }

    // select the current item
    if (key === "Enter") {
      e.preventDefault();
      onItemClick(focusedIndex);
    }

    setFocusedIndex(nextIndexCount);
  };

  const handleChange: React.ChangeEventHandler<HTMLInputElement> = (e) => {
    onChange && onChange(e.target.value);
  };

  useEffect(() => {
    if (!resultContainer.current) return;

    resultContainer.current.scrollIntoView({
      block: "center",
    });
  }, [focusedIndex]);

  useEffect(() => setShowResults(true), [value]);

  return (
    <div className="flex items-center justify-center">
      <div
        tabIndex={1}
        onBlur={resetSearchComplete}
        onKeyDown={handleKeyDown}
        onFocus={() => setShowResults(true)}
        className={`relative ${
          isExpanded || (value && value.length > 10) ? "w-[17vw]" : "w-[13vw]"
        } bg-opacity-15 transition-width duration-300 rounded-full min-w-[135px] z-10`}
      >
        <div className="flex rounded-full mr-4 bg-gradient-to-r from-rose-400 via-fuchsia-500 to-indigo-500">
          <InputBase
            onKeyDown={handleKeyDown}
            onFocus={() => setIsExpanded(true)}
            onBlur={() => handleBlur()}
            value={value}
            onChange={handleChange}
            placeholder="Search..."
            className="w-full bg-transparent rounded-full focus:outline-none p-[3px] active:outline-none"
            inputProps={{
              "aria-label": "search",
              className:"input-no-ring",
              style: {
                borderRadius: "100px",
                paddingTop: 0,
                paddingBottom: 0,
                height: "32px",
              },
            }}
          />
        </div>

        {showResults && value && value.length > 0 && (
          <div className="absolute mt-1 w-full py-2 bg-white shadow-lg rounded-2xl max-h-96 overflow-y-auto">
            {showResults &&
              results?.length > 0 &&
              results?.map((res, index) => (
                <ResultItem
                  isFocused={index === focusedIndex}
                  key={index}
                  itemDetails={res}
                  onItemClick={onItemClick}
                  index={index}
                  containerRef={index === focusedIndex ? resultContainer : null}
                ></ResultItem>
              ))}
            {(showResults || results.length === 0) && value?.length > 0 && (
              <SearchValueItem
                isFocused={results.length === focusedIndex}
                value={value}
                handleSelection={onItemClick}
                index={results.length}
                containerRef={
                  results.length === focusedIndex ? resultContainer : null
                }
              ></SearchValueItem>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default LiveSearch;
