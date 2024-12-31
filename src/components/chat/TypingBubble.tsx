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
          <div className="py-3 px-3 flex justify-start dark:bg-dark-paper-light bg-gray-200 rounded-[18px] max-w-[70%] w-fit">
            <Typography
              sx={{ overflowWrap: "anywhere" }}
              className="text-wrap text-sm"
            >
              <div className="flex space-x-1">
                <div className="w-1.5 h-1.5 dark:bg-paper bg-gray-600 rounded-full animate-dot1"></div>
                <div className="w-1.5 h-1.5 dark:bg-paper bg-gray-600 rounded-full animate-dot2"></div>
                <div className="w-1.5 h-1.5 dark:bg-paper bg-gray-600 rounded-full animate-dot3"></div>
              </div>
            </Typography>
          </div>
        </div>
      </div>

      {/* Inline styles for animation */}
      <style>{`
        @keyframes dot1 {
          0%, 100% {
            opacity: 0.1;
            transform: translateY(3px);
          }
          50% {
            opacity: 1;
            transform: translateY(-3px) ;
          }
        }
        
        @keyframes dot2 {
          0%, 100% {
            opacity: 0.1;
            transform: translateY(3px);
          }
          50% {
            opacity: 1;
            transform: translateY(-3px) ;
          }
        }
        
        @keyframes dot3 {
          0%, 100% {
            opacity: 0.1;
            transform: translateY(3px);
          }
          50% {
            opacity: 1;
            transform: translateY(-3px) ;
          }
        }

        .animate-dot1 {
          animation: dot1 1.5s infinite ease-in-out;
        }
        
        .animate-dot2 {
          animation: dot2 1.4s infinite ease-in-out 0.2s; /* Delay */
        }
        
        .animate-dot3 {
          animation: dot3 1.3s infinite ease-in-out 0.4s; /* Delay */
        }
      `}</style>
    </Box>
  );
};

export default TypingBubble;
