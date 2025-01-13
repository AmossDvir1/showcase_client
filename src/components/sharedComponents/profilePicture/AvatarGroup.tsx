import React, {createContext, useContext} from "react";
import MiniProfilePicture from "./MiniProfilePicture";
import { Box } from "@mui/material";

interface AvatarGroupProps {
    total: number;
    spacing?: "small" | "medium" | "large";
    children: React.ReactNode;
}

export const AvatarGroupContext = createContext(false)

const AvatarGroup: React.FC<AvatarGroupProps> = ({
    total,
    spacing = "small",
    children
}) => {
    const spacingMap = {
        small: -10,
        medium: -15,
        large: -20,
    };
    const overlapSpacing = spacingMap[spacing];
    const childCount = React.Children.count(children); // Count children properly

    return (
      <AvatarGroupContext.Provider value={true}>
        <div className="flex items-center">
            <div className="relative flex">
                {React.Children.map(children, (child, index) => (
                    <div
                        style={{
                            position: "relative",
                            marginLeft: index > 0 ? overlapSpacing : 0,
                            zIndex: childCount - index, // Use childCount here
                        }}
                        key={index}
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
      </AvatarGroupContext.Provider>
    );
};

export default AvatarGroup;