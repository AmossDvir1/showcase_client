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
  const getRandomWidth = () => `${Math.max(40, Math.random() * 100)}%`;

  return numOfLines === 1 ? (
    <Skeleton
      animation="wave"
      className={clsx("w-[40%]", className)}
      {...rest}
    ></Skeleton>
  ) : (
    <div>
      {Array.from({ length: numOfLines }).map((_, index) => (
        <Skeleton
          key={index}
          animation="wave"
          className={clsx("", className)}
          style={{ width: getRandomWidth() }}
          {...rest}
        ></Skeleton>
      ))}
    </div>
  );
};

export default LinesSkeleton;
