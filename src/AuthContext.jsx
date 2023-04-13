import {createContext, useContext, useState} from 'react';
import axios from 'axios';

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({children}) => {
    const [user, setUser] = useState(null);

    const login = (email, password) => {
        // make API call to authenticate user and set user state

        axios.post('https://api.jonathan-manes.be/mail/login', {
            email: email,
            password: password
        })
            .then(function (response) {
                console.log(response);
                setUser(response.data);
            });
    };

    const logout = () => {
        // make API call to log out user and clear user state
    };

    const value = {user, login, logout};

    return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
