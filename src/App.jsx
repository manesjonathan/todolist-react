import TodoApp from "./TodoApp.jsx";
import {BrowserRouter, Route, Routes} from "react-router-dom";
import PrivateRoute from "./PrivateRoute.jsx";
import Login from "./Login.jsx";
import {AuthProvider} from './AuthContext';

const App = () => {

    return (
        <AuthProvider>
            <BrowserRouter>
                <Routes>
                    <Route path="/" element={<Login/>}/>
                    <Route path="/home" element={
                        <PrivateRoute>
                            <TodoApp/>
                        </PrivateRoute>
                    }/>
                </Routes>
            </BrowserRouter>
        </AuthProvider>
    );
}

export default App;
