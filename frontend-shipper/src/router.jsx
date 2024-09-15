import { Navigate, createBrowserRouter } from "react-router-dom";
import DefaultPlayout from "./components/DefaultPlayout"
import EmployeePlayout from "./components/EmployeePlayout"
import NotFound from "./views/NotFound";
import Home from "./views/Home";
import Login from "./views/Login";
import Signup from "./views/SignUp";
const router = createBrowserRouter([
    {
        path: "/",
        element: <DefaultPlayout />,
        children: [
            {
                path: "/",
                element: <Navigate to='/home' />,
            },
            {
                path: '/home',
                element: <Home />,
            }
        ]
    },
    {
        path: '/',
        element: <EmployeePlayout />,
        children: [
            {
                path: '/login',
                element: <Login />,
            },
            {
                path: '/signup',
                element: <Signup />
            }
        ]
    },

    {
        path: "*",
        element: <NotFound />
    }
]);

export default router;