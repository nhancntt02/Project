import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom"
import axiosClient from "../axios-client";

export default function InfoOrder() {
    const navigate = useNavigate();
    const order_id = useParams().order_id
    const [order, setOrder] = useState({});

    useEffect(() => {
        getOrder();
    }, [])

    const getOrder = async () => {
        const res = await axiosClient.get(`/order/${order_id}`);
        setOrder(res.data.data);
    }


    return (
        <div className="">
            <div className="min-h-screen ">
                <div className="bg-gray-100 flex justify-between">
                    <div onClick={() => navigate(-1)} className="">
                        Trở về
                    </div>
                    <div className="">
                       {
                        order.order_status
                       }
                    </div>
                </div>
                <div className="border">
                    {/* <div className="flex justify-between items-center my-8">
                        <div className="flex-1 flex flex-col items-center relative">
                            <div className="bg-green-500 text-white rounded-full w-16 h-16 flex justify-center items-center text-xs font-medium">
                                Đơn Hàng Đã Đặt
                            </div>
                            <div className="mt-2 text-xs text-gray-600">18:33 27-08-2024</div>
                            <div className="absolute top-1/2 left-full w-full h-0.5 bg-green-500 -z-10"></div>
                        </div>
                        <div className="flex-1 flex flex-col items-center relative">
                            <div className="bg-green-500 text-white rounded-full w-16 h-16 flex justify-center items-center text-xs font-medium">
                                Chờ Thanh Toán
                            </div>
                            <div className="absolute top-1/2 left-full w-full h-0.5 bg-gray-200 -z-10"></div>
                        </div>
                        <div className="flex-1 flex flex-col items-center relative">
                            <div className="bg-gray-200 text-gray-400 rounded-full w-16 h-16 flex justify-center items-center text-xs font-medium">
                                Vận Chuyển
                            </div>
                            <div className="absolute top-1/2 left-full w-full h-0.5 bg-gray-200 -z-10"></div>
                        </div>
                        <div className="flex-1 flex flex-col items-center relative">
                            <div className="bg-gray-200 text-gray-400 rounded-full w-16 h-16 flex justify-center items-center text-xs font-medium">
                                Chờ Giao Hàng
                            </div>
                            <div className="absolute top-1/2 left-full w-full h-0.5 bg-gray-200 -z-10"></div>
                        </div>
                        <div className="flex-1 flex flex-col items-center relative">
                            <div className="bg-gray-200 text-gray-400 rounded-full w-16 h-16 flex justify-center items-center text-xs font-medium">
                                Đánh Giá
                            </div>
                        </div>
                    </div> */}
                </div>
            </div>
        </div>
    )
}