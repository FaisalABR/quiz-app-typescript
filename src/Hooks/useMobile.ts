import { useEffect, useState } from "react";

export const useMobile = () => {
  const [isMobile, setIsMobile] = useState<boolean>(false);

  useEffect(() => {
    const handleScreen = () => {
      setIsMobile(window.innerWidth <= 768);
    };

    window.addEventListener("resize", handleScreen);
    handleScreen();

    return window.removeEventListener("resize", handleScreen);
  }, [window.innerWidth]);

  return { isMobile };
};
