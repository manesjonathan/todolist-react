import TodoApp from "./pages/TodoApp.jsx";
import {BrowserRouter, Route, Routes} from "react-router-dom";
import PrivateRoute from "./pages/PrivateRoute.jsx";
import Login from "./pages/Login.jsx";
import Register from "./pages/Register.jsx";

const App = () => {

    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Login/>}/>
                <Route path="/register" element={<Register/>}/>
                <Route path="/home" element={
                    <PrivateRoute>
                        <TodoApp/>
                    </PrivateRoute>
                }/>
            </Routes>
        </BrowserRouter>
    );
}

export default App;
