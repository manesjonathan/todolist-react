import React, {useState} from 'react';
import {useNavigate} from "react-router-dom";
import {loginFunction} from "./../backend/backend.js";

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();
    const [error, setError] = useState(null);

    const handleLogin = (event) => {
        event.preventDefault();
        try {
            loginFunction(email, password, navigate).catch(() => {
                setError("Email ou mot de passe incorrect");
            })
        } catch (e) {
            console.error(e);
            setError("Une erreur est survenue");
        }
    }

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
            <div className="max-w-md w-full space-y-8">
                <div>
                    <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">Bonjour!</h2>
                    <h2 className="text-center text-3xl font-extrabold text-gray-900">Connecte toi d'abord!</h2>
                </div>
                <form className="mt-8 space-y-6" onSubmit={handleLogin}>
                    <input type="hidden" name="remember" defaultValue="true"/>
                    <div className="rounded-md shadow-sm -space-y-px">
                        <div>
                            <label htmlFor="email-address" className="sr-only">
                                Email address
                            </label>
                            <input
                                id="email-address"
                                name="email"
                                type="email"
                                autoComplete="email"
                                required
                                className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                                placeholder="Adresse email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                            />
                        </div>
                        <div>
                            <label htmlFor="password" className="sr-only">
                                Password
                            </label>
                            <input
                                id="password"
                                name="password"
                                type="password"
                                autoComplete="current-password"
                                required
                                className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                                placeholder="Mot de passe"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                            />
                        </div>
                    </div>
                    <div className="flex items-center justify-end text-end">
                        <div className="text-sm flex flex-col">
                            <a href="/register" className="font-medium text-indigo-600 hover:text-indigo-500">
                                Créer un compte
                            </a>
                            {error && <p className="text-red-500 animate-pulse">{error}</p>}

                        </div>
                    </div>
                    <div>
                        <button
                            type="submit"
                            className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
                            Se connecter
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default Login;



