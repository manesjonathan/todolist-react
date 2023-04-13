import React, {useState} from 'react';
import axios from "axios";
import {useNavigate} from "react-router-dom";
import {loginFunction} from "./backend.js";


const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();
    const [error, setError] = useState(null);
    const handleLogin = (event) => {
        event.preventDefault();
        // Here you can write the logic to check if the email and password are correct
        // make API call to authenticate user and set user state
        console.log(email + " " + password)
        try {
            loginFunction(email, password, navigate).catch(() => {
                setError("Invalid email or password");
            })
        } catch (e) {
            console.error(e);
            setError("An error occurred");
        }
    }

    return (
        <div>
            <h1>Login</h1>
            <form onSubmit={handleLogin}>
                <label>
                    Username:
                    <input type="text" value={email} onChange={(e) => setEmail(e.target.value)}/>
                </label>
                <br/>
                <label>
                    Password:
                    <input type="password" value={password} onChange={(e) => setPassword(e.target.value)}/>
                </label>
                <br/>
                <button type="submit">Log In</button>
            </form>
        </div>
    );
}

export default Login;
