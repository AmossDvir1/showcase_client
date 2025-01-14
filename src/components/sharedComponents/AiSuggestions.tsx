import React, { useState, useRef, useEffect } from "react";
import { Box, Collapse, Fade } from "@mui/material";
import Typography from "../sharedComponents/Typography";
import { Button } from "../sharedComponents/Button";
import Loader from "./Loader";
import AutoAwesomeIcon from "@mui/icons-material/AutoAwesome";

interface AiSuggestionsProps {
  suggestions: string;
  onAccept: (suggestion: string) => void;
  onDiscard: () => void;
  loading: boolean;
  isExpanded: boolean;
  onExpandedChange: (value: boolean) => void;
  inputRef: React.RefObject<HTMLDivElement>;
}

const AiSuggestions: React.FC<AiSuggestionsProps> = ({
  suggestions,
  onAccept,
  onDiscard,
  loading,
  isExpanded,
  onExpandedChange,
  inputRef,
}) => {
  const [isHovered, setIsHovered] = useState(false);
  const suggestionRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    if (inputRef?.current && suggestionRef.current) {
      const inputElement = inputRef?.current.getBoundingClientRect();
      const suggestionElement = suggestionRef.current.getBoundingClientRect();
      const inputLeft = inputElement.left;
      const inputTop = inputElement.top;
      const inputHeight = inputElement.height;
      suggestionRef.current.style.left = `${inputLeft}px`;
      suggestionRef.current.style.top = `${
        inputTop - suggestionElement.height - 5
      }px`;
      suggestionRef.current.style.width = `${inputElement.width}px`;
    }
  }, [isExpanded, inputRef]);
  if (!isExpanded) return <></>;
  if (!suggestions && !loading) return <></>;

  return (
    <Box className="z-50" ref={suggestionRef}>
      <Box
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        className={`relative mt-1 py-2 px-2  bg-gray-100 dark:bg-dark-paper-light rounded-lg `}
      >
        {loading && <Loader></Loader>}
        {!loading && suggestions && (
          <Typography className="relative z-10">
            <div className="flex gap-2 items-center">
              <svg className="w-8 h-8" viewBox="0 0 24 24">
                <defs>
                  <linearGradient
                    id="ai-gradient"
                    x1="0%"
                    y1="0%"
                    x2="100%"
                    y2="100%"
                  >
                    <stop offset="0%" stopColor="#3b82f6" /> {/* Blue */}
                    <stop offset="50%" stopColor="#a855f7" /> {/* Purple */}
                    <stop offset="100%" stopColor="#ec4899" /> {/* Pink */}
                  </linearGradient>
                </defs>
                <AutoAwesomeIcon className=""
                  sx={{
                     
                    fill: "url(#ai-gradient)",
                  }}
                />
              </svg>
              {suggestions}
            </div>
          </Typography>
        )}
        {!loading && suggestions && (
          <Box className="flex justify-end mt-2">
            <Button
              btnsize="xs"
              bgcolor="bg-gray-400"
              bgcolorhover="hover:bg-gray-500"
              onClick={() => {
                onDiscard();
                onExpandedChange(false);
              }}
              className="mx-1"
            >
              Discard
            </Button>
            <Button
              btnsize="xs"
              bgcolor="bg-green-500"
              bgcolorhover="hover:bg-green-600"
              onClick={() => {
                onAccept(suggestions);
                onExpandedChange(false);
              }}
              className="mx-1"
            >
              Accept
            </Button>
          </Box>
        )}
      </Box>
    </Box>
  );
};

export default AiSuggestions;
