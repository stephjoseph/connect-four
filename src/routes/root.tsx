import { useEffect, useState } from "react";
import { Outlet, useLocation } from "react-router-dom";

const Root = () => {
  const location = useLocation();
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);

  const handleBackgroundColor = () => {
    if (location.pathname === "/" && windowWidth < 768) {
      document.body.style.backgroundColor = "#7945FF";
    } else {
      switch (location.pathname) {
        case "/":
          document.body.style.backgroundColor = "#5C2DD5";
          break;
        case "/game":
          document.body.style.backgroundColor = "#7945FF";
          break;
        case "/rules":
          document.body.style.backgroundColor = "#7945FF";
          break;
        default:
          null;
      }
    }
  };

  const handleResize = () => {
    setWindowWidth(window.innerWidth);
  };

  useEffect(() => {
    window.addEventListener("resize", handleResize);

    // Clean up the event listener on component unmount
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  useEffect(() => {
    handleBackgroundColor();
  }, [location, windowWidth]);
  return (
    <>
      <Outlet />
    </>
  );
};

export default Root;
