import { useEffect, useState } from "react";
function useWindowSize() {
  let [windowSize, setWindowSize] = useState([
    window.innerHeight,
    window.innerWidth,
  ]);

  function setSize() {
    console.log("Resized");
    setWindowSize([window.innerHeight, window.innerWidth]);
  }

  useEffect(() => {
    window.addEventListener("resize", setSize);
    return () => {
      window.removeEventListener("resize", setSize);
    };
  }, []);

  return windowSize;
}
export default useWindowSize;
