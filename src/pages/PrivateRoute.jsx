import {useNavigate} from "react-router-dom";
import {useEffect} from "react";
import Cookies from 'js-cookie';

const PrivateRoute = (element) => {
    const navigate = useNavigate();
    const isAuthenticated = !!Cookies.get("jwt");

    useEffect(() => {
        if (!isAuthenticated) {
            navigate("/login");
        }
    }, [isAuthenticated, navigate]);


    return isAuthenticated ? element.children : null;
}

export default PrivateRoute;
