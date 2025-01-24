import React, { useRef } from "react";
import { Box, IconButton } from "@mui/material";
import Typography from "../sharedComponents/Typography";
import CloseIcon from "@mui/icons-material/Close";
import CheckIcon from "@mui/icons-material/Check"; // Import the Check icon
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
        className={`relative py-1 px-2  bg-paper-dark dark:bg-dark-paper-light rounded-3xl flex items-start justify-between`}
      >
        <div className="flex items-center">
          <div className="flex items-center">
            <div className="p-2">
              <AILoader loading={loading}></AILoader>
            </div>
            {
              <div className="w-full">
                <Typography className="relative z-10 font-light text-sm">
                  {!loading && suggestions && suggestions}
                </Typography>
              </div>
            }
          </div>
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
