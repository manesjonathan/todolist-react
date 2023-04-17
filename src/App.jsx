import TodoList from "./pages/TodoList.jsx";
import {BrowserRouter, Route, Routes} from "react-router-dom";
import PrivateRoute from "./pages/PrivateRoute.jsx";
import Login from "./pages/Login.jsx";
import Register from "./pages/Register.jsx";
import Navbar from "./components/Navbar.jsx";
import Logout from "./components/Logout.jsx";
import CalendarView from "./pages/CalendarView.jsx";
import CourseList from "./pages/CourseList.jsx";
const App = () => {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Login/>}/>
                <Route path="/register" element={<Register/>}/>
                <Route path="/home" element={
                    <PrivateRoute>
                        <Navbar/>
                        <TodoList/>
                    </PrivateRoute>
                }/>
                <Route path="/calendar" element={
                    <PrivateRoute>
                        <Navbar/>
                        <CalendarView/>
                    </PrivateRoute>
                }/>
                <Route path="/courses" element={
                    <PrivateRoute>
                        <Navbar/>
                        <CourseList/>
                    </PrivateRoute>
                }/>
                <Route path={"/logout"} element={<Logout/>}/>
            </Routes>
        </BrowserRouter>
    );
}

export default App;
