import React from "react";
import MiniProfilePicture from "./MiniProfilePicture";

interface AvatarGroupProps {
  total: number;
  spacing?: "small" | "medium" | "large";
  children: React.ReactNode;
}

const AvatarGroup: React.FC<AvatarGroupProps> = ({ total, spacing = "small", children }) => {
  const spacingMap = {
    small: -10,
    medium: -15,
    large: -20,
  };
  const overlapSpacing = spacingMap[spacing];

  const childCount = React.Children.count(children); // Count children properly

  return (
    <div className="flex items-center">
      <div className="relative flex">
        {React.Children.map(children, (child, index) => (
          <div
            style={{
              position: "relative",
              marginLeft: index > 0 ? overlapSpacing : 0,
              zIndex: childCount - index, // Use childCount here
            }}
          >
            {child}
          </div>
        ))}
      </div>
      {total > childCount && (
        <div
          style={{
            position: "relative",
            marginLeft: overlapSpacing,
            zIndex: 0,
            backgroundColor: "#ddd",
            width: 40,
            height: 40,
            borderRadius: "50%",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            fontSize: "14px",
            fontWeight: "bold",
          }}
        >
          +{total - childCount}
        </div>
      )}
    </div>
  );
};

export default AvatarGroup;
