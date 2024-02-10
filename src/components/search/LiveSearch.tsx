import { useCallback, useEffect, useRef, useState } from "react";
import { InputBase } from "@mui/material";
import ResultItem from "./resultItem/ResultItem";
import SearchValueItem from "./resultItem/itemsTypes/SearchValueItem";
import { useNavigate } from "react-router-dom";

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
    onSelect?.(selectedItem);
    navigate(`/${selectedItem.type}/${selectedItem.urlMapping}`);
    setIsExpanded(false);
    setShowResults(false);
  };
  const onResultItemClick = () => {
    navigate(`/search/${value}`);
    setIsExpanded(false);
    setShowResults(false);
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
    if (key === "ArrowUp"){
      nextIndexCount = (focusedIndex + results.length) % (results.length + 1);
console.log(nextIndexCount)
    }

    // hide search results
    if (key === "Escape") {
      resetSearchComplete();
    }

    // select the current item
    if (key === "Enter") {
      e.preventDefault();
      if (focusedIndex >= 0 && focusedIndex < results.length){
        onItemClick(focusedIndex);
      }
      else if(focusedIndex === results.length){
        onResultItemClick();
      }
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
          isExpanded || (value && value.length > 10) ? "xs:w-[40vw] lg:w-[20vw]" : "xs:w-[20vw] lg:w-[15vw]"
        } bg-opacity-15 transition-width duration-300 rounded-full min-w-[115px] max-w-[40vw] z-10`}
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
              className:"input-no-ring text-sm",
              style: {
                borderRadius: "100px",
                paddingTop: 0,
                paddingBottom: 0,
                height: "28px",
              },
            }}
          />
        </div>

        {showResults && value && value.length > 0 && (
          <div className="absolute mt-1 w-full py-2 bg-white shadow-lg rounded-2xl max-h-96 overflow-y-auto z-10">
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
                onItemClick={onResultItemClick}
                index={results.length}
                containerRef={
                  // resultContainer
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
