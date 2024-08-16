import { NavLink, Navigate, createBrowserRouter } from "react-router-dom";
import Brand from "./views/AddBrand";
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
import InfoPermiss from "./views/Employee/AddInfoPermiss";
import Login from "./views/Login";
import Signup from "./views/SignUp";
import Add from "./views/Add";
import Add2 from "./views/Add2";
import EditProduct from "./views/EditProduct";
import FormAddProducts from "./views/FormAddProducts";
import AddForm from "./views/AddForm";
import AddDetailForm from "./views/AddDetailForm";
import AddSupplier from "./views/AddSupplier";
import InfoForm from "./views/InfoForm";
import EditForm from "./views/EditForm";
import InfoProduct from "./views/InfoProduct";


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
                path: '/editproduct/:product_id',
                element: <EditProduct />
            },
            {
                path: '/add',
                element: <Add />,
                children: [
                    {
                        path: '/add',
                        element: <Brand />
                    },
                    {
                        path: '/add/cpu',
                        element: <Cpu />
                    },
                    {
                        path: '/add/ram',
                        element: <Ram />
                    },
                    {
                        path: '/add/rom',
                        element: <Rom />
                    },
                    {
                        path: '/add/pin',
                        element: <Pin />
                    },
                    {
                        path: '/add/screen',
                        element: <Screen />
                    },
                    {
                        path: '/add/cam',
                        element: <Cam />
                    },
                    {
                        path: '/add/os',
                        element: <Os />
                    },
                    {
                        path: '/add/product',
                        element: <Product />
                    },
                    {
                        path: '/add/image',
                        element: <Image />
                    },

                ]
            },
            {
                path: '/addinfo',
                element: <Add2/>,
                children: [
                    {
                        path: '/addinfo',
                        element: <Payment />
                    },
                    {
                        path: '/addinfo/permiss',
                        element: <Permiss />
                    },
                    {
                        path: '/addinfo/infopermiss',
                        element: <InfoPermiss />
                    },
                    {
                        path: '/addinfo/supplier',
                        element: <AddSupplier/>
                    }

                ]

            },
            {
                path: '/fap',
                element: <FormAddProducts />,
                children: [
                    {
                        path: '/fap/add',
                        element: <AddForm />
                    },
                ]
            },
            {
                path: '/add/detail/:id',
                element: <AddDetailForm />
            },
            {
                path: '/infoform/:fap_id',
                element: <InfoForm/>
            },
            {
                path: '/editform/:fap_id',
                element: <EditForm/>
            },
            {
                path: '/infoproduct/:product_id',
                element: <InfoProduct/>
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