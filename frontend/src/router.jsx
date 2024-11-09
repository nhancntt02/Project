import {Navigate, createBrowserRouter } from "react-router-dom";
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
import AddNotify from "./views/AddNotify";
import Notify from "./views/Notify";
import Order from "./views/Order";
import InCome from "./views/Income";
import Comment from "./views/Comment";
import ListComment from "./views/ListComment";
import Employee from "./views/Employee";
import Dashbord from "./views/Dashboard";
import ProductTable from "./components/ProductTable";
import Revenue from "./components/Revenue";
import Infomation from "./views/Infomation";
import Supplier from "./views/Supplier";
import Discount from "./views/Discount";
import Customer from "./views/Customer";
import News from "./views/News";
import Chat from "./components/Chat";
import ChartProduct from "./views/ChartProduct";
import NotifyE from "./components/NotifyE";
const router = createBrowserRouter([
    {
        path: "/",
        element: <DefaultPlayout />,
        children: [
            {
                path: "/",
                element: <Navigate to='/dashbord' />,
            },
            {
                path: '/home',
                element: <Home />,
            },
            {
                path: '/chatbox',
                element: <Chat />,
            },
            {
                path: '/notifye',
                element: <NotifyE />,
            },
            {
                path: '/dashbord',
                element: <Dashbord />,
            },
            {
                path: '/editproduct/:product_id',
                element: <EditProduct />
            },
            {
                path: '/add',
                element: <Add />,    
            },
            {
                path: '/add/product',
                element: <Product />
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
                path: '/add/brand',
                element: <Brand />
            },
            {
                path: '/add/image',
                element: <Image />
            },
            {
                path: '/addinfo/payment',
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
            },
            {
                path: '/addinfo',
                element: <Add2/>,
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
            },
            {
                path: '/notify',
                element: <Notify />

            },
            {
                path: '/addnotify',
                element: <AddNotify />
            }, 
            {
                path: '/order',
                element: <Order />
            },
            {
                path: '/news',
                element: <News />
            },
            {
                path: '/income',
                element: <InCome />,
                children: [
                    {
                        path: '/income/product/table',
                        element: <ProductTable />
                    },
                    {
                        path: '/income/revenue',
                        element: <Revenue />
                    },
                    {
                        path: '/income/product/table/:product_id',
                        element: <ChartProduct />
                    }
                ]
            },
            {
                path: '/comment',
                element: <Comment />
            },
            {
                path: '/listcomment/:product_id',
                element: <ListComment />
            },
            {
                path: '/employee',
                element: <Employee />
            },
            {
                path: '/infomation',
                element: <Infomation />
            },
            {
                path: '/supplier',
                element: <Supplier />
            },
            {
                path: '/discount',
                element: <Discount />
            },
            {
                path: '/customer',
                element: <Customer />
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