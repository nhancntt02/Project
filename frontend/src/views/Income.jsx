import { useEffect, useRef, useState } from "react"
import axiosClient from "../axios-client";
import { useAsyncError, useNavigate, Outlet } from "react-router-dom";
import ChartDashBoard from "../components/ChartDashBoard"
export default function Income() {
    const navigate = useNavigate();
    const [loading, setLoading] = useState(true);
    const [visible, setVisible] = useState(true);


    useEffect(() => {
        setLoading(false);
    }, []);

    useEffect(() => {
        // Check the URL every time it changes
        if (location.pathname != "/income") {
            setVisible(false);
        } else {
            setVisible(true);
        }
    }, [location.pathname]);




    return (
        <div>
            {
                loading ? (
                    <div>Loading......</div>
                ) : (
                    <div className="container h-screen">
                        <div className="h-[16%] border-b flex justify-center items-center bg-bgheader-200">
                            <div className="text-bgheader-300 text-center text-4xl my-4 font-semibold">Quản lý doanh thu</div>
                        </div>
                        <div className="mb-6 p-4">
                            <div className="flex">

                            </div>
                            <div className="flex space-x-4 mb-4">
                                <button
                                    className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
                                    onClick={() => {
                                        navigate('/income');
                                    }
                                    }
                                >
                                    Biều đồ thống kế doanh thu
                                </button>

                                <button
                                    className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
                                    onClick={() => {
                                        navigate('/income/revenue');
                                    }
                                    }
                                >
                                    Thống kê doanh thu
                                </button>
                                <button
                                    className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
                                    onClick={() => {
                                        navigate('/income/product/table');
                                    }
                                    }
                                >
                                    Thống kê nhập và bán hàng
                                </button>
                            </div>


                            <div>

                                <Outlet></Outlet>
                            </div>
                            {
                                visible && (
                                    <div className="h-[70vh] w-full flex">
                                        <div className="w-[70%]">
                                           <ChartDashBoard/> 
                                        </div>
                                        <div className="w-[30%] bg-black">
                                            <div>
                                                dasdasdasd
                                            </div>
                                        </div>
                                    </div>
                                )
                            }

                        </div>
                    </div>
                )
            }

        </div>
    )
}