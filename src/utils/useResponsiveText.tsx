import { useState, useEffect } from "react";

function useResponsiveText(text: string, size:Sizes): string {
  const [responsiveText, setResponsiveText] = useState(text);

  useEffect(() => {
    function calculateResponsiveText() {
      const hypotenuse = Math.sqrt(window.innerWidth ** 2 + window.innerHeight ** 2);
      const textLength = text.length;

      const fontSize = Math.floor(hypotenuse / textLength);

      if (fontSize < 12) {
        setResponsiveText(text.substring(0, Math.floor(hypotenuse / 12)) + "...");
      } else {
        setResponsiveText(text);
      }
    }

    calculateResponsiveText();

    window.addEventListener("resize", calculateResponsiveText);

    return () => {
      window.removeEventListener("resize", calculateResponsiveText);
    };
  }, [text]);

  return responsiveText;
}

export default useResponsiveText;