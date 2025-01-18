import React, { useRef } from "react";
import { Box, IconButton } from "@mui/material";
import Typography from "../sharedComponents/Typography";
import Loader from "./Loader";
import AutoAwesomeIcon from "@mui/icons-material/AutoAwesome";
import CloseIcon from "@mui/icons-material/Close";
import CheckIcon from "@mui/icons-material/Check"; // Import the Check icon
import GenAiIcon from "../../assets/GenAI.png";
import AILoader from "./AILoader";

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
  onExpandedChange,
}) => {
  const suggestionRef = useRef<HTMLDivElement>(null);

  if (!suggestions && !loading) return <></>;

  return (
    <Box className="z-50" ref={suggestionRef}>
      <Box
        className={`relative py-1 px-2  bg-gray-100 dark:bg-dark-paper-light rounded-3xl flex items-start justify-between`}
      >
        {/* {loading && <AILoader loading={loading} />} */}
        <div className="flex items-center">
          {/* {!loading && suggestions && ( */}
            <Typography className="relative z-10 font-light text-sm">
              <div className="flex items-center">
                <div className="px-2">
                <AILoader loading={loading}></AILoader></div>
                {<div className="w-full">
                {!loading && suggestions && suggestions}
                </div>}
              </div>
            </Typography>
          {/* )} */}
        </div>
        {!loading && suggestions && (
          <div className="flex items-center">
            <IconButton
              size="small"
              onClick={() => {
                onDiscard();
                onExpandedChange(false);
              }}
            >
              <CloseIcon fontSize="small" />
            </IconButton>
            <IconButton
              size="small"
              onClick={() => {
                onAccept(suggestions);
                onExpandedChange(false);
              }}
            >
              <CheckIcon fontSize="small" />
            </IconButton>
          </div>
        )}
      </Box>
    </Box>
  );
};

export default AiSuggestions;
