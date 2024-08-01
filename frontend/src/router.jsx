import { NavLink, Navigate, createBrowserRouter } from "react-router-dom";
import Brand from "./views/ShowBrand";
import Payment from "./views/AddPayment";
import Cpu from "./views/AddCpu";
import DefaultPlayout from "./components/DefaultPlayout"
import NotFound from "./views/NotFound";
import Home from "./views/Home";
import Ram from "./views/AddRam";
import Rom from "./views/AddRom";
import Pin from "./views/AddPin";
import Screen from "./views/AddScreen";
import Cam from "./views/AddCam";
import Os from "./views/AddOs";
import Product from "./views/AddProduct";
import Image from "./views/AddImage";
import EmployeePlayout from "./components/EmployeePlayout";
import Permiss from "./views/Employee/AddPermiss";
import Employee from "./views/Employee/AddEmployee";
import InfoPermiss from "./views/Employee/AddInfoPermiss";

const router = createBrowserRouter([
    {
        path: "/",
        element: <DefaultPlayout />,
        children: [
            {
                path: "/",
                element: <Home/>,
            },
            {
                path: '/add/brand',
                element: <Brand />
            },
            {
                path: '/add/payment',
                element: <Payment/>
            },
            {
                path: '/add/cpu',
                element: <Cpu/>
            },
            {
                path: '/add/ram',
                element: <Ram/>
            },
            {
                path: '/add/rom',
                element: <Rom/>
            },
            {
                path: '/add/pin',
                element: <Pin/>
            },
            {
                path: '/add/screen',
                element: <Screen/>
            },
            {
                path: '/add/cam',
                element: <Cam/>
            },
            {
                path: '/add/os',
                element: <Os/>
            },
            {
                path: '/add/product',
                element: <Product/>
            },
            {
                path: '/add/image',
                element: <Image/>
            },
        ]
    },
    {
        path: '/employee',
        element: <EmployeePlayout/>,
        children: [
            {
                path: '/employee/',
                element: <Employee/>
            },
            {
                path: '/employee/permiss',
                element: <Permiss/>
            },
            {
                path: '/employee/infopermiss',
                element: <InfoPermiss/>
            }
        ]
    },
    {
        path: "*",
        element: <NotFound/>
    }
]);

export default router;