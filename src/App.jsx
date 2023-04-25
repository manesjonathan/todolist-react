import {BrowserRouter, Route, Routes} from "react-router-dom";
import PrivateRoute from "./pages/PrivateRoute.jsx";
import Login from "./pages/Login.jsx";
import Register from "./pages/Register.jsx";
import Navbar from "./components/Navbar.jsx";
import Logout from "./components/Logout.jsx";
import React, {lazy} from "react";

const Calendar = lazy(() => import('./pages/CalendarView.jsx'));
const TodoList = lazy(() => import('./pages/TodoList.jsx'));
const CourseList = lazy(() => import('./pages/ShoppingList.jsx'));
const PromiseList = lazy(() => import('./pages/PromiseList.jsx'));
const WeatherApp = lazy(() => import('./components/WeatherApp.jsx'));

const App = () => {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/login" element={<Login/>}/>
                <Route path="/register" element={<Register/>}/>
                <Route path="/" element={
                    <PrivateRoute>
                        <Navbar/>
                        <WeatherApp/>
                        <TodoList/>
                    </PrivateRoute>
                }/>
                <Route path="/calendar" element={
                    <PrivateRoute>
                        <Navbar/>
                        <Calendar/>
                    </PrivateRoute>
                }/>
                <Route path="/courses" element={
                    <PrivateRoute>
                        <Navbar/>
                        <CourseList/>
                    </PrivateRoute>
                }/>
                <Route path="/promises" element={
                    <PrivateRoute>
                        <Navbar/>
                        <PromiseList/>
                    </PrivateRoute>
                }/>
                <Route path={"/logout"} element={<Logout/>}/>
            </Routes>
        </BrowserRouter>
    );
}

export default App;
