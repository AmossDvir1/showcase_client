import { useCallback, useEffect, useRef, useState } from "react";
import {
  IconButton,
  InputBase,
  Popper,
  ClickAwayListener,
  Slide,
} from "@mui/material";
import ResultItem from "./resultItem/ResultItem";
import SearchValueItem from "./resultItem/itemsTypes/SearchValueItem";
import { useNavigate } from "react-router-dom";
import SearchIcon from "@mui/icons-material/Search";
import Loader from "../sharedComponents/Loader";

interface Props<T> {
  results?: T[];
  onChange: (value: string) => void;
  onSelect?: (item: T) => void;
  value?: string;
  loading?: boolean;
}

const LiveSearch = <T extends ResultsItem>({
  results = [],
  value,
  onChange,
  onSelect,
  loading = false,
}: Props<T>): JSX.Element => {
  const navigate = useNavigate();
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

  const [focusedIndex, setFocusedIndex] = useState(-1);
  const resultContainer = useRef<HTMLDivElement>(null);
  const [showResults, setShowResults] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);
  const onSearchIconClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(anchorEl ? null : event.currentTarget);
    event.stopPropagation();
  };

  const onItemClick = (index: number) => {
    onChange("");
    setAnchorEl(null);
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
    if (key === "ArrowUp") {
      nextIndexCount = (focusedIndex + results.length) % (results.length + 1);
    }

    // hide search results
    if (key === "Escape") {
      resetSearchComplete();
    }

    // select the current item
    if (key === "Enter") {
      e.preventDefault();
      if (focusedIndex >= 0 && focusedIndex < results.length) {
        onItemClick(focusedIndex);
      } else if (focusedIndex === results.length) {
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
  const isOpen = Boolean(anchorEl);

  return (
    <div className="flex items-center justify-center">
      <IconButton
        onClick={onSearchIconClick}
        className="p-2 ml-2 rounded-full bg-gray-200 dark:bg-dark-paper-light md:hidden"
      >
        <SearchIcon />
      </IconButton>
      <div
        tabIndex={1}
        onBlur={resetSearchComplete}
        onKeyDown={handleKeyDown}
        onFocus={() => setShowResults(true)}
        className={`relative hidden md:block ${
          isExpanded || (value && value.length > 10)
            ? "xs:w-[12rem] lg:w-[20vw]"
            : "xs:w-[8rem] lg:w-[15vw]"
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
              className: "input-no-ring text-sm",
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
            {(showResults || results.length === 0) &&
              value?.length > 0 &&
              (loading ? (
                <div className="flex items-center justify-center">
                <Loader size="sm"></Loader></div>
              ) : (
                <SearchValueItem
                  isFocused={results.length === focusedIndex}
                  value={value}
                  onItemClick={onResultItemClick}
                  index={results.length}
                  containerRef={
                    // resultContainer
                    results.length === focusedIndex ? resultContainer : null
                  }
                />
              ))}
          </div>
        )}
      </div>

      {/* Popper for Mobile */}
      <ClickAwayListener
        onClickAway={(e) =>
          anchorEl ? setAnchorEl(null) : setAnchorEl(anchorEl)
        }
      >
        <Popper
          open={isOpen}
          anchorEl={anchorEl}
          placement="bottom"
          className="z-20 w-full hidden xs:max-md:block"
          modifiers={[
            {
              name: "offset",
              options: {
                offset: [0, 9], // Add some vertical spacing
              },
            },
          ]}
          transition
        >
          {({ TransitionProps }) => (
            <Slide
              {...TransitionProps}
              easing={{
                enter: "cubic-bezier(0.5, 1.2, 0.8, 1)",
                exit: "linear",
              }}
              timeout={{
                enter: 500, // Opening duration
                exit: 500, // Closing duration
              }}
            >
              <div className="bg-gradient-to-r from-rose-400 via-fuchsia-500 to-indigo-500 p-[3px] rounded-lg shadow-lg">
                <div className="bg-white rounded-lg shadow-lg">
                  <InputBase
                    value={value}
                    onChange={handleChange}
                    placeholder="Search..."
                    className="w-full bg-transparent rounded-full focus:outline-none"
                    inputProps={{
                      "aria-label": "search",
                      style: {
                        borderRadius: "8px",
                        boxShadow: "0 10px 15px -3px rgb(0 0 0 / 0.1)",
                      },
                    }}
                  />
                  {showResults && value && value.length > 0 && (
                    <div className="mt-2 py-2 bg-white shadow-lg rounded-2xl max-h-[30rem] overflow-y-auto z-10">
                      {results?.length > 0 &&
                        results.map((res, index) => (
                          <ResultItem
                            isFocused={index === focusedIndex}
                            key={index}
                            itemDetails={res}
                            onItemClick={onItemClick}
                            index={index}
                            containerRef={
                              index === focusedIndex ? resultContainer : null
                            }
                          />
                        ))}
                      {(showResults || results.length === 0) &&
                        value?.length > 0 && (
                          <SearchValueItem
                            isFocused={results.length === focusedIndex}
                            value={value}
                            onItemClick={onResultItemClick}
                            index={results.length}
                            containerRef={null}
                          />
                        )}
                    </div>
                  )}
                </div>
              </div>
            </Slide>
          )}
        </Popper>
      </ClickAwayListener>
    </div>
  );
};

export default LiveSearch;
