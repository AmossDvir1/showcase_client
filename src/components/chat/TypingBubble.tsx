import React from "react";
import { Box } from "@mui/material";
import Typography from "../sharedComponents/Typography";

// Using Tailwind's built-in `@keyframes` for dot animation
const TypingBubble: React.FC = () => {
  return (
    <Box className="mb-2 w-full">
      <div className="flex justify-start items-start w-64">
        <div className="mr-[0px] py-1"></div>
        <div className="flex flex-col items-start">
          <div className="py-3 px-3 flex justify-start bg-gray-200 rounded-[18px] max-w-[70%] w-fit">
            <Typography sx={{ overflowWrap: "anywhere" }} className="text-wrap text-sm">
              <div className="flex space-x-1">
                <div className="w-1.5 h-1.5 bg-gray-600 rounded-full animate-dot1"></div>
                <div className="w-1.5 h-1.5 bg-gray-600 rounded-full animate-dot2"></div>
                <div className="w-1.5 h-1.5 bg-gray-600 rounded-full animate-dot3"></div>
              </div>
            </Typography>
          </div>
        </div>
      </div>

      {/* Inline styles for animation */}
      <style>{`
        @keyframes dot1 {
          0%, 100% {
            opacity: 0;
          }
          50% {
            opacity: 1;
          }
        }
        
        @keyframes dot2 {
          0%, 100% {
            opacity: 0;
          }
          50% {
            opacity: 1;
          }
        }
        
        @keyframes dot3 {
          0%, 100% {
            opacity: 0;
          }
          50% {
            opacity: 1;
          }
        }

        .animate-dot1 {
          animation: dot1 1.2s infinite ease-in-out;
        }
        
        .animate-dot2 {
          animation: dot2 1.2s infinite ease-in-out 0.4s; /* Delay */
        }
        
        .animate-dot3 {
          animation: dot3 1.2s infinite ease-in-out 0.8s; /* Delay */
        }
      `}</style>
    </Box>
  );
};

export default TypingBubble;
