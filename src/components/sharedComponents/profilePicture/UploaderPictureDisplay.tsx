import { Typography } from "@mui/material";
import React, { useState, useEffect, useCallback } from "react";

interface UploaderPictureDisplayProps {
  imageSrc: string;
  diameter?: number;
  setImagePosition: React.Dispatch<
    React.SetStateAction<ImageOffset>
  >;
}

const UploaderPictureDisplay = ({
  imageSrc,
  diameter = 350,
  setImagePosition,
}: UploaderPictureDisplayProps) => {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [dragStart, setDragStart] = useState({ x: 0, y: 0 });
  const [isDragging, setIsDragging] = useState(false);
  const [imageDimensions, setImageDimensions] = useState({
    width: 0,
    height: 0,
  });

  useEffect(() => {
    setImagePosition({x: Math.trunc(position.x)*5.14469453376, y: Math.trunc(position.y)*5.14469453376});
  }, [position]);

  useEffect(() => {
    const img = new Image();
    img.src = imageSrc;
    img.onload = () => {
      const aspectRatio = img.width / img.height;
      let newWidth, newHeight;

      if (aspectRatio > 1) {
        newHeight = diameter;
        newWidth = diameter * aspectRatio;
      } else {
        newWidth = diameter;
        newHeight = diameter / aspectRatio;
      }

      setImageDimensions({ width: newWidth, height: newHeight });
      setPosition({
        x: -(newWidth - diameter) / 2,
        y: -(newHeight - diameter) / 2,
      });
    };
  }, [imageSrc, diameter]);

  const constrainPosition = useCallback(
    (x: number, y: number) => {
      const maxX = 0;
      const minX = -(imageDimensions.width - diameter);
      const maxY = 0;
      const minY = -(imageDimensions.height - diameter);

      return {
        x: Math.min(Math.max(x, minX), maxX),
        y: Math.min(Math.max(y, minY), maxY),
      };
    },
    [diameter, imageDimensions]
  );

  const handleMouseDown = (e: React.MouseEvent) => {
    e.preventDefault();
    setIsDragging(true);
    setDragStart({
      x: e.clientX - position.x,
      y: e.clientY - position.y,
    });
  };

  const handleTouchStart = (e: React.TouchEvent) => {
    e.preventDefault();
    setIsDragging(true);
    setDragStart({
      x: e.touches[0].clientX - position.x,
      y: e.touches[0].clientY - position.y,
    });
  };

  const handleMouseMove = useCallback(
    (e: MouseEvent) => {
      if (!isDragging) return;

      const newPosition = constrainPosition(
        e.clientX - dragStart.x,
        e.clientY - dragStart.y
      );

      setPosition(newPosition);

    },
    [isDragging, dragStart, constrainPosition, ]
  );

  const handleTouchMove = useCallback(
    (e: TouchEvent) => {
      if (!isDragging) return;

      const newPosition = constrainPosition(
        e.touches[0].clientX - dragStart.x,
        e.touches[0].clientY - dragStart.y
      );

      setPosition(newPosition);
    },
    [isDragging, dragStart, constrainPosition]
  );

  const handleDragEnd = useCallback(() => {
    setIsDragging(false);
  }, []);

  useEffect(() => {
    if (isDragging) {
      window.addEventListener("mousemove", handleMouseMove);
      window.addEventListener("mouseup", handleDragEnd);
      window.addEventListener("touchmove", handleTouchMove);
      window.addEventListener("touchend", handleDragEnd);
    }

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mouseup", handleDragEnd);
      window.removeEventListener("touchmove", handleTouchMove);
      window.removeEventListener("touchend", handleDragEnd);
    };
  }, [isDragging, handleMouseMove, handleTouchMove, handleDragEnd]);

  return (
    <div
      className="relative cursor-move"
      style={{ width: diameter, height: diameter }}
      onMouseDown={handleMouseDown}
      onTouchStart={handleTouchStart}
    >
      {/* Container for both layers */}
      <div
        className="absolute inset-0"
        style={{
          width: imageDimensions.width,
          height: imageDimensions.height,
          transform: `translate(${position.x}px, ${position.y}px)`,
        }}
      >
        {/* Base layer - dimmed image */}
        <img
          src={imageSrc}
          alt="Profile background"
          className="absolute w-full h-full object-cover opacity-40"
          draggable={false}
        />

        {/* Circle layer - full opacity image */}
        <div
          className="absolute left-0 top-0 overflow-hidden rounded-full"
          style={{
            width: diameter,
            height: diameter,
            transform: `translate(${-position.x}px, ${-position.y}px)`,
          }}
        >
          <img
            src={imageSrc}
            alt="Profile"
            className="absolute w-full h-full object-cover"
            style={{
              width: imageDimensions.width,
              height: imageDimensions.height,
              transform: `translate(${position.x}px, ${position.y}px)`,
            }}
            draggable={false}
          />
        </div>
      </div>

      {/* Circle border */}
      <div className="absolute inset-0 rounded-full border-2 border-white pointer-events-none" />

      {/* Overlay to show drag indicator */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
        <div
          className={`bg-black bg-opacity-50 text-white px-4 py-2 rounded-lg transition-opacity duration-200 ${
            isDragging ? "opacity-0" : "opacity-100"
          }`}
        >
          <Typography>Drag to Reposition</Typography>
        </div>
      </div>
    </div>
  );
};

export default UploaderPictureDisplay;
