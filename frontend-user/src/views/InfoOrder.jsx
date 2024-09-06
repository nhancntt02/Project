import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom"
import axiosClient from "../axios-client";
import { useStateContext } from "../contexts/ContextProvider";
import { FaLessThan } from 'react-icons/fa';

export default function InfoOrder() {
    const navigate = useNavigate();
    const { products, user, setUser } = useStateContext();
    const order_id = useParams().order_id;
    const [order, setOrder] = useState({});
    const [address, setAddress] = useState([]);
    const [loading, setLoading] = useState(false);
    const [detailOrders, setDetailOrders] = useState([]);
    const [images, setImages] = useState([]);
    const [payment, setPayment] = useState(null);
    useEffect(() => {
        axiosClient.get('/user')
            .then(({ data }) => {
                setUser(data);
            })
            .catch(error => {
                console.log(error);
            })
        getImages();
        getPayment();
        getOrder();
        getDetailOrder();
    }, [])


    const getPayment = () => {
        setLoading(true);
        axiosClient.get('/payments')
            .then(({ data }) => {
                setPayment(data.data);
                setLoading(false);
            })
            .catch(error => {
                console.error('Error fetching payment:', error);
                setError(error);
                setLoading(false);
            });
    }

    const getImages = () => {
        setLoading(true);
        axiosClient.get('/images')
            .then(({ data }) => {
                setImages(data.data);

                setLoading(false);
            })
            .catch(error => {
                console.error('Error fetching image:', error);
                setError(error);
                setLoading(false);
            });
    }


    const getOrder = async () => {
        setLoading(true)
        //console.log(order_id);
        const res = await axiosClient.get(`/order/${order_id}`);
        setOrder(res.data.data);
       // console.log(res.data.data);
        const address_id = res.data.data.address_id;
        const res1 = await axiosClient.get(`address/${address_id}`);
        setAddress(res1.data.data);
        setLoading(false);
    }

    const getDetailOrder = async () => {
        const res = await axiosClient.get(`/info/order/${order_id}`);
        setDetailOrders(res.data.data);
    }

    const receiveProduct = async () => {
        try {
            let orderReveive = order;
            orderReveive.order_status = "Đã nhận hàng";
            console.log(orderReveive);
            await axiosClient.put(`/update/order/${order.order_id}`, orderReveive);
        } catch (error) {
            console.log(error);
        }
        getOrder();
    }

    return (
        <div className="min-h-screen px-[10%]">
            {
                loading ?
                    (
                        <div></div>
                    )
                    : (
                        <div className="gap-5">
                            <div className="bg-gray-100 flex justify-between p-4">

                                <div onClick={() => navigate(-1)} className="cursor-pointer text-2xl font-bold text-blue-400 flex gap-2 hover:text-blue-600">
                                    <FaLessThan className="mt-1" />
                                    <div>
                                        Trở về
                                    </div>
                                </div>
                                <div className={(order.order_status == "Đã nhận hàng" || order.order_status == "Hoàn thành") ? "text-green-600 text-xl" : "text-orange-600 text-xl"}>
                                    Trạng thái đơn hàng: {order.order_status}
                                </div>

                            </div>

                            <div className="mt-2 p-4 bg-gray-200">
                                <div className="mb-4 flex justify-between">
                                    <p className="font-semibold text-gray-700 text-2xl">Địa chỉ nhận hàng</p>
                                    {
                                        order.order_status == "Đang vận chuyển" && (
                                            <div>
                                                <button onClick={receiveProduct} className="bg-green-500 text-white font-semibold py-2 px-4 rounded-lg hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-opacity-75 transition duration-300 ease-in-out">
                                                    Xác nhận đã nhận hàng
                                                </button>
                                            </div>
                                        )
                                    }

                                </div>
                                <div className="space-y-1 ">
                                    <div className="font-medium text-gray-900">{user.name}</div>
                                    <div className="text-gray-600">{user.phone}</div>
                                    <div className="text-gray-600">
                                        {address.address_note} - {address.address_phuong} - {address.address_quan} - {address.address_tinh}
                                    </div>
                                </div>
                            </div>

                            <div className="">
                                <div className="mt-2">
                                    {
                                        detailOrders.map((item, index) => (
                                            <div key={index} className="bg-gray-100 py-2 px-10 border-b flex justify-between">
                                                <div className="flex gap-5">
                                                    <div className="border w-[70px] p-2">
                                                        <img src={images.find(image => image.product_id == item.product_id)?.image_value || 'N/A'} alt="" />
                                                    </div>
                                                    <div className="flex flex-col justify-center">
                                                        <div>
                                                            {
                                                                products.find(p => p.product_id == item.product_id)?.product_name
                                                            }
                                                        </div>
                                                        <div>
                                                            x{item.io_quantity}
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="flex items-center">
                                                    <div className="text-orange-700">
                                                        {new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(item.io_price)}
                                                    </div>
                                                </div>
                                            </div>
                                        ))
                                    }
                                </div>
                            </div>
                            <div className="flex p-4">
                                <div className="basis-1/2"></div>
                                <div className="basis-1/2">
                                    <table className="w-full text-right text-gray-700">
                                        <tbody>
                                            <tr className="border-b">
                                                <td className="p-2 w-[50%]">Tổng tiền hàng</td>
                                                <td className="p-2">{new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(order.order_product_money)}</td>
                                            </tr>
                                            <tr className="border-b">
                                                <td className="p-2">Phí vận chuyển</td>
                                                <td className="p-2">{new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(order.order_transport_money != null ? order.order_transport_money : 0)}</td>
                                            </tr>
                                            <tr className="border-b">
                                                <td className="p-2">Tiền giảm giá</td>
                                                <td className="p-2">{new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(order.order_discount_money != null ? order.order_discount_money : 0)}</td>
                                            </tr>
                                            <tr className="border-b">
                                                <td className="p-2">Thành tiền</td>
                                                <td className="p-2 font-semibold text-gray-900 ">{new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(order.order_total_money)}</td>
                                            </tr>
                                        </tbody>
                                    </table>
                                    <table className="w-full text-right text-gray-700 mt-2">
                                        <tbody>
                                            <tr className="border-y">
                                                <td className="p-2 w-[50%]">Thành tiền</td>
                                                <td className="p-2 text-xl font-semibold text-orange-700 ">{new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(order.order_total_money)}</td>
                                            </tr>
                                            <tr className="border-b">
                                                <td className="p-2">Phương thức thanh toán</td>
                                                <td className="p-2 font-semibold text-gray-900 ">{payment?.find(i => i.payment_id === order.payment_id)?.payment_name}</td>
                                            </tr>
                                        </tbody>
                                    </table>

                                </div>
                            </div>

                        </div>
                    )
            }

        </div>
    )
}