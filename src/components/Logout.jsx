import {useNavigate} from "react-router-dom";
import {useEffect} from "react";
import {logout} from "../backend/backend.js";

const Logout = () => {
    const navigate = useNavigate()

    useEffect(() => {
        logout(navigate);
    }, [])
}

export default Logout
