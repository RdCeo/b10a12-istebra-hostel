import { useEffect } from "react";
import { useLocation } from "react-router-dom";

const Scroller = () => {
  const { pathname } = useLocation();
  useEffect(() => {
    window.screenTop({
      top: 0,
      behavior: "smooth",
    });
  }, [pathname]);
  return null;
};

export default Scroller;
