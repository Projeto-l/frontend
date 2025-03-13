import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const RestoreRoute = () => {
    const navigate = useNavigate();

    useEffect(() => {
        const lastRoute = localStorage.getItem("lastRoute");

        if (lastRoute && lastRoute !== window.location.pathname) {
            setTimeout(() => {
                navigate(lastRoute);
            }, 100);
        }
    }, []);

    return null;
};

export default RestoreRoute;
