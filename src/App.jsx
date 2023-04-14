import TodoApp from "./pages/TodoApp.jsx";
import {BrowserRouter, Route, Routes} from "react-router-dom";
import PrivateRoute from "./pages/PrivateRoute.jsx";
import Login from "./pages/Login.jsx";
import Register from "./pages/Register.jsx";
import Navbar from "./components/Navbar.jsx";
import Logout from "./components/Logout.jsx";

const App = () => {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Login/>}/>
                <Route path="/register" element={<Register/>}/>
                <Route path="/home" element={
                    <PrivateRoute>
                        <Navbar/>
                        <TodoApp/>
                    </PrivateRoute>
                }/>
                <Route path={"/logout"} element={<Logout/>}/>
            </Routes>
        </BrowserRouter>
    );
}

export default App;
