import TodoApp from "./TodoApp.jsx";
import {BrowserRouter, Route, Routes} from "react-router-dom";
import PrivateRoute from "./PrivateRoute.jsx";
import Login from "./Login.jsx";
import Register from "./Register.jsx";

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
