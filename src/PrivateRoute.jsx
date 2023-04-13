import {useNavigate} from "react-router-dom";
import {useEffect} from "react";

const PrivateRoute = (element) => {
    const navigate = useNavigate();
    const isAuthenticated = !!sessionStorage.getItem("user");

    useEffect(() => {
        if (!isAuthenticated) {
            navigate("/");
        }
    }, [isAuthenticated, navigate]);


    return isAuthenticated ? element.children : null;
}

export default PrivateRoute;
