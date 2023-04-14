import {useNavigate} from "react-router-dom";
import {useEffect} from "react";
import {logout} from "../backend/backend.js";

const Logout = () => {
    const navigate = useNavigate()

    useEffect(() => {
        logout();
        sessionStorage.removeItem('user');
        navigate('/');
    }, [])
}

export default Logout
