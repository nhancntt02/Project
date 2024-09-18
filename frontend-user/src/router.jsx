import { Navigate, createBrowserRouter } from "react-router-dom";
import DefaultPlayout from "./components/DefaultPlayout"
import EmployeePlayout from "./components/EmployeePlayout"
import NotFound from "./views/NotFound";
import Home from "./views/Home";
import Login from "./views/Login";
import Signup from "./views/SignUp";
import Cart from "./views/Cart";
import Customer from "./views/Customer";
import Order from "./views/Order";
import InfoOrder from "./views/InfoOrder";
import Notify from "./views/Notify";
import InfoProduct from "./views/InfoProduct";
import Checkout from "./views/Checkout";
import PaymentReturn from "./views/PaymentReturn";

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
            },
            {
                path: '/cart',
                element: <Cart />,
            },
            {
                path: '/checkout/',
                element: <Checkout />,
            },
            {
                path: '/order',
                element: <Order />,
            },
            {   path: '/infoorder/:order_id',
                element: <InfoOrder />,

            },
            {
                path: '/customer',
                element: <Customer />,
            },
            {
                path: '/notify',
                element: <Notify />,
            },
            {
                path: '/infoproduct/:product_id',
                element: <InfoProduct />,
            },
            {
                path: '/payment-return',
                element: <PaymentReturn />,
            },
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