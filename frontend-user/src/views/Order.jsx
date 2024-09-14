import { useEffect, useRef, useState } from "react"
import { FaSearch, FaTruck, FaTrash } from "react-icons/fa"
import { FiPackage } from 'react-icons/fi';
import axiosClient from "../axios-client";
import { useStateContext } from "../contexts/ContextProvider";
import { useNavigate } from "react-router-dom";


export default function Order() {
    const [orders, setOrder] = useState([]);
    const [arr, setArr] = useState([]);
    const { user, products, setUser } = useStateContext();
    const [isOpen, setIsOpen] = useState(false);
    const [isOpen2, setIsOpen2] = useState(false);
    const [images, setImages] = useState([]);
    const [isSearch, setIsSearch] = useState(true);
    const [orderId, setOrderId] = useState(null);
    const searchRef = useRef();
    const navigate = useNavigate();
    const user_id = localStorage.getItem('userId');

    useEffect(() => {
        axiosClient.get('/user')
            .then(({ data }) => {
                setUser(data);
            })
        getOrder();
    }, []);

    const getOrder = async () => {
        const res = await axiosClient.get(`/order/user/${user_id}`);
        //console.log(res.data.data);
        setOrder(res.data.data);
        setArr(res.data.data);
    }

    const searchOrder = async () => {
        const searchValue = searchRef.current.value;
        try {
            const res = await axiosClient.get(`/search/order/${searchValue}`);
            setOrder(res.data.data);
        } catch (error) {
            console.log();
        }
    }


    const checkBox = (order_id) => {
        setOrderId(order_id);
        setIsOpen(true);
    }

    const cancelOrder = async () => {
        try {
            const orderCancel = orders.filter(o => o.order_id == orderId);
            console.log(orderCancel);
            if (orderCancel) {
                orderCancel[0].order_status = "Hủy";
                console.log(orderCancel[0]);
                await axiosClient.put(`/update/order/${orderId}`, orderCancel[0]);
            }
            const res = await axiosClient.get(`/info/order/${orderId}`);
            console.log(res.data.data);
            res.data.data.forEach(async (item) => {
                await axiosClient.put(`/update/quantity/${item.product_id}/${item.io_quantity}/0`)
            });

        } catch (error) {
            console.log(error);
        }
        setOrderId(null);
        getOrder();
    }

    const goInfoOrder = (order_id) => {
        navigate(`/infoorder/${order_id}`);
    }

    const checkBox2 = (order_id) => {
        setOrderId(order_id);
        setIsOpen2(true);
    }

    const receiveProduct = async () => {
        try {
            const orderReveive = orders.filter(o => o.order_id == orderId);

            if (orderReveive) {
                orderReveive[0].order_status = "Đã nhận hàng";
                console.log(orderReveive[0]);
                await axiosClient.put(`/update/order/${orderId}`, orderReveive[0]);
            }
        } catch (error) {
            console.log(error);
        }
        setOrderId(null);
        getOrder();
    }

    return (
        <div className="">
            <div className="min-h-[80%] bg-gray-100">
                {/* Header */}
                <header className="bg-white shadow">
                    <div className="container mx-auto px-4 flex justify-between items-center bg-slate-200">
                        {
                            isSearch && (<div className="sm:hidden w-[35%] lg:flex gap-4 pl-2 ">
                                <input className="w-full p-1 border rounded" type="text" ref={searchRef} placeholder="Tìm kiếm theo tên sản phẩm hoặc ID đơn hàng " />
                                <FaSearch onClick={searchOrder} className="text-2xl hover:cursor-pointer mt-1" />
                            </div>
                            )
                        }

                        <div className="flex gap-4">
                            <div onClick={() => { setIsSearch(true); getOrder(); }} className="text-lg font-bold hover:cursor-pointer py-8 px-2 lg:px-4 hover:bg-slate-300">Tất cả</div>
                            <div
                                onClick={() => {
                                    setIsSearch(false);
                                    const order1 = arr.filter(o => o.order_status == "Khởi tạo");
                                    setOrder(order1);

                                }}
                                className="text-lg font-bold hover:cursor-pointer py-8 px-2 lg:px-4 hover:bg-slate-300"
                            >Chờ xác nhận</div>
                            <div
                                onClick={() => {
                                    setIsSearch(false);
                                    const order1 = arr.filter(o => o.order_status == "Đang vận chuyển");
                                    setOrder(order1);
                                }}
                                className="text-lg font-bold hover:cursor-pointer py-8 px-2 lg:px-4 hover:bg-slate-300"
                            >Đang giao hàng</div>
                            <div
                                onClick={() => {
                                    setIsSearch(false);
                                    const order1 = arr.filter(o => (o.order_status == "Hoàn thành") || (o.order_status == "Đã nhận hàng"));
                                    setOrder(order1);

                                }}
                                className="text-lg font-bold hover:cursor-pointer py-8 px-2 lg:px-4 hover:bg-slate-300"
                            >Hoàn thành</div>
                            <div
                                onClick={() => {
                                    setIsSearch(false);
                                    const order1 = arr.filter(o => o.order_status == "Hủy");
                                    setOrder(order1);
                                }}
                                className="text-lg font-bold hover:cursor-pointer py-8 px-2 lg:px-4 hover:bg-slate-300"
                            >Đã hủy</div>
                        </div>
                    </div>
                </header>

                <main className="mx-auto px-4 py-6">
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-2">

                        <div className="col-span-2 bg-white p-6 shadow rounded-lg lg:min-h-[500px]">
                            <h2 className="text-xl font-bold mb-4">Tóm tắt đơn hàng</h2>
                            {
                                orders.map((order, index) => (
                                    <ul className="divide-y divide-gray-200" key={order.order_id}>
                                        <li className="py-4 flex border border-gray-300 rounded-lg p-4 bg-white shadow-sm hover:bg-gray-50 hover:cursor-pointer">
                                            <div onClick={() => goInfoOrder(order.order_id)} className="basis-1/4">
                                                <span className="text-sm text-gray-500">ID: {order.order_id}</span>
                                            </div>
                                            <div onClick={() => goInfoOrder(order.order_id)} className="basis-1/4">
                                                <span className="text-sm text-gray-500">Ngày tạo: {order.order_date_create}</span>
                                            </div>
                                            <div onClick={() => goInfoOrder(order.order_id)} className="basis-1/4">
                                                <span className="text-sm text-gray-500">Trạng thái: {order.order_status}</span>
                                            </div>
                                            <div className="basis-1/4 flex justify-between">
                                                <span className="text-sm font-semibold text-gray-900">Giá: {new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(order.order_total_money)}</span>
                                                {order.order_status == 'Khởi tạo' && (
                                                    <div className=" flex items-center">
                                                        <span className="text-red-500">
                                                            <FaTrash onClick={() => checkBox(order.order_id)} />
                                                        </span>
                                                    </div>
                                                )}
                                                {
                                                    order.order_status == 'Đang vận chuyển' && (
                                                        <div className=" flex items-center">
                                                            <span className="text-green-500 text-2xl">
                                                                <FiPackage onClick={() => checkBox2(order.order_id)}/>
                                                            </span>
                                                        </div>
                                                    )
                                                }
                                            </div>

                                        </li>
                                    </ul>

                                ))
                            }
                        </div>

                        <div className="bg-white p-6 shadow rounded-lg">
                            <h2 className="text-xl font-bold mb-4">Thông tin khách hàng</h2>
                            <p><strong>Họ tên khách hàng:</strong> {user.name}</p>
                            <p><strong>Địa chỉ:</strong> {user.address}</p>
                            <p><strong>Số điện thoại:</strong> {user.phone}</p>
                        </div>
                    </div>
                </main>
            </div>
            {
                isOpen && (
                    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
                        <div className="bg-white p-6 rounded-lg shadow-lg max-w-md w-full">
                            <h1 className="text-xl font-semibold text-gray-800 mb-4">Bạn có chắc muốn hủy đơn hàng này?</h1>
                            <div className="flex justify-end space-x-4">
                                <button
                                    className="px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-600 transition"
                                    onClick={() => {
                                        setIsOpen(false);
                                        cancelOrder();
                                    }}
                                >
                                    Xóa
                                </button>
                                <button
                                    className="px-4 py-2 bg-gray-300 text-gray-800 rounded-md hover:bg-gray-400 transition"
                                    onClick={() => {
                                        setIsOpen(false);
                                        setOrderId(null);
                                    }}
                                >
                                    Hủy
                                </button>
                            </div>
                        </div>
                    </div>
                )
            }
                        {
                isOpen2 && (
                    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
                        <div className="bg-white p-6 rounded-lg shadow-lg max-w-md w-full">
                            <h1 className="text-xl font-semibold text-gray-800 mb-4">Bạn muốn xác nhận đã nhận được hàng?</h1>
                            <div className="flex justify-end space-x-4">
                                <button
                                    className="px-4 py-2 bg-green-500 text-white rounded-md hover:bg-green-600 transition"
                                    onClick={() => {
                                        setIsOpen2(false);
                                        receiveProduct();
                                    }}
                                >
                                    Đã nhận
                                </button>
                                <button
                                    className="px-4 py-2 bg-gray-300 text-gray-800 rounded-md hover:bg-gray-400 transition"
                                    onClick={() => {
                                        setIsOpen2(false);
                                        setOrderId(null);
                                    }}
                                >
                                    Hủy
                                </button>
                            </div>
                        </div>
                    </div>
                )
            }
        </div>
    )
}