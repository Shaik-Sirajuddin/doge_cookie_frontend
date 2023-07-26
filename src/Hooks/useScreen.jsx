import { useEffect, useState } from "react";

const useScreen = () => {
  const [screen, setScreen] = useState(0);

  const handleMobile = () => {
    const width = window.innerWidth;
    setScreen(width);
  };

  useEffect(() => {
    handleMobile();
    window.addEventListener("resize", handleMobile);
  }, []);

  return screen;
};

export default useScreen;
