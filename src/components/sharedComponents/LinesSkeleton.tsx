import React from "react";
import { Skeleton, SkeletonProps } from "@mui/material";
import clsx from "clsx";

interface LinesSkeletonProps extends SkeletonProps {
  numOfLines?: number;
}

const LinesSkeleton: React.FC<LinesSkeletonProps> = ({
  numOfLines = 1,
  className,
  ...rest
}) => {
  const generateRandomWidths = () => {
    // Generate random start and end widths for animation
    const startWidth = Math.max(25, Math.random() * 80); // Between 40% and 80%
    const endWidth = Math.max(25, Math.random() * 80); // Between 40% and 80%
    return { startWidth, endWidth };
  };

  const animatedClass = `
    @keyframes pulseWidth {
      0% {
        width: var(--start-width);
      }
      50% {
        width: var(--end-width);
      }
      100% {
        width: var(--start-width);
      }
    }

    .animated-line {
      animation: pulseWidth 1.5s infinite ease-in-out;
    }
  `;

  return (
    <>
      <style>{animatedClass}</style>
      {numOfLines === 1 ? (
        (() => {
          const { startWidth, endWidth } = generateRandomWidths();
          return (
            <Skeleton
              animation="wave"
              className={clsx(
                "animated-line",
                className
              )}
              style={{
                "--start-width": `${startWidth}%`,
                "--end-width": `${endWidth}%`,
              } as React.CSSProperties}
              {...rest}
            />
          );
        })()
      ) : (
        <div>
          {Array.from({ length: numOfLines }).map((_, index) => {
            const { startWidth, endWidth } = generateRandomWidths();
            return (
              <Skeleton
                key={index}
                animation="wave"
                className={clsx(
                  "animated-line",
                  className
                )}
                style={{
                  "--start-width": `${startWidth}%`,
                  "--end-width": `${endWidth}%`,
                } as React.CSSProperties}
                {...rest}
              />
            );
          })}
        </div>
      )}
    </>
  );
};

export default LinesSkeleton;
