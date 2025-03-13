import { useEffect } from "react";
import { useLocation } from "react-router-dom";

const SaveRoute = () => {
  const location = useLocation();

  useEffect(() => {
    localStorage.setItem("lastRoute", location.pathname);
  }, [location]);

  return null;
};

export default SaveRoute;
