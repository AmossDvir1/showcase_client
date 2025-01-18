import React from "react";
import GenAiStar from "../../assets/AiStar.png";

interface AILoader {
  loading?: boolean;
}
const StarLoader: React.FC<AILoader> = ({ loading }) => {
  // Define fixed sizes and animation properties for each star
  const stars = [
    {
      size: 10,
      animationDelay: 0,
      animationDuration: 2,
      top: "0%",
      left: "10%",
      rotate: 'rotate(50deg)'
    },
    {
      size: 16,
      animationDelay: 0,
      animationDuration: 3,
      top: "55%",
      left: "60%",
      rotate: 'rotate(20deg)'
    },
    {
      size: 14,
      animationDelay: 0,
      animationDuration: 1.5,
      top: "15%",
      left: "50%",
      rotate: 'rotate(80deg)'
    },
    {
      size: 18,
      animationDelay: 0,
      animationDuration: 2.5,
      top: "35%",
      left: "0%",
      rotate: 'rotate(0deg)'
    },
  ];

  return (
    <div className="flex justify-center items-center relative w-8 h-8 bg-transparent">
      {/* Inline Keyframes in the component */}
      {loading && (
        <style>
          {`
          @keyframes pulse {
            0% { transform: scale(0.7); }
            50% { transform: scale(1.3); }
            100% { transform: scale(0.7); }
          }
        `}
        </style>
      )}

      {stars.map((star, index) => (
        <img
          key={index}
          src={GenAiStar}
          alt="Star"
          className="absolute"
          style={{
            width: `${star.size}px`,
            // transform: star.rotate,
            height: `${star.size}px`,
            top: star.top,
            left: star.left,
            animation: loading ? `pulse ${star.animationDuration}s ease-in-out infinite` : '',
          }}
        />
      ))}
    </div>
  );
};

export default StarLoader;
