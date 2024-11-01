import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom"
import axiosClient from "../axios-client";
import { useStateContext } from "../contexts/ContextProvider";
import { FaLessThan, FaTimes, FaStar } from 'react-icons/fa';

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
    const [ratings, setRatings] = useState([]);
    const [box, setBox] = useState(false);

    const [rating, setRating] = useState(0);
    const [hover, setHover] = useState(null);
    const [reviewText, setReviewText] = useState('');
    const [productRate, setProductRate] = useState(null);
    useEffect(() => {
        axiosClient.get('/user')
            .then(({ data }) => {
                setUser(data);
            })
            .catch(error => {
                console.log(error);
            })
        getImages();
        //getPayment();
        getOrder();
        getRating();
        getDetailOrder();
    }, [])


    const getPayment = () => {
        setLoading(true);
        axiosClient.get('/payments')
            .then(({ data }) => {
                setPayment(data.data);
                console.log(data.data)
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

    const getRating = async () => {
        setLoading(true);
        try {
            const res = await axiosClient.get(`/rating/order/${order_id}`);
            setRatings(res.data.data);
            setLoading(false);
        } catch (error) {
            console.log(error);
            setLoading(false);
        }

    }


    const getOrder = async () => {
        setLoading(true)
        //console.log(order_id);
        const res = await axiosClient.get(`/order/${order_id}`);
        setOrder(res.data.data);
        console.log(res.data.data);
        // const address_id = res.data.data.address_id;
        // const res1 = await axiosClient.get(`address/${address_id}`);
        // setAddress(res1.data.data);
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

    const ratingProduct = async () => {
        const now = new Date();
        const payload = {
            user_id: order.customer.id,
            order_id: order_id,
            product_id: productRate,
            rate_rating: rating,
            rate_comment: reviewText,
            rate_date: now.toISOString().substr(0, 10),
        }
        try {
            const res = await axiosClient.post('/add/rating', payload);
            getRating();
            setRating(0);
            setReviewText("");
            setProductRate(null);
        } catch (error) {
            console.log(error);
            setProductRate(null);
        }
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

                            <div className="flex mt-2 p-4 bg-gray-200">
                                <div className="basis-1/2">
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
                                        <div className="font-medium text-gray-900">{order.customer?.name}</div>
                                        <div className="text-gray-600">{order.customer?.phone}</div>
                                        <div className="text-gray-600">
                                            {order.address?.address_note} - {order.address?.address_phuong} - {order.address?.address_quan} - {order.address?.address_tinh}
                                        </div>
                                    </div>
                                </div>
                                <div className="basis-1/2 ">
                                    <p className="font-semibold text-gray-700 text-2xl text-center">Thông tin đơn hàng</p>
                                    <table className="table-auto w-full border-collapse">
                                        <tbody>
                                            <tr className="border-b">
                                                <th className="text-left  font-medium text-gray-600">Thời gian đặt hàng</th>
                                                <td className="">
                                                    {new Date(order.order_date_create).toLocaleDateString('vi-VN', { day: '2-digit', month: '2-digit', year: 'numeric' })}
                                                </td>
                                            </tr>
                                            <tr className="border-b">
                                                <th className="text-left  font-medium text-gray-600">Thời gian thanh toán</th>
                                                <td className="">
                                                    {
                                                        order.order_date_payment ?
                                                            (new Date(order.order_date_payment).toLocaleDateString('vi-VN', { day: '2-digit', month: '2-digit', year: 'numeric' }))
                                                            : (
                                                                " "
                                                            )
                                                    }
                                                </td>
                                            </tr>
                                            <tr className="border-b">
                                                <th className="text-left  font-medium text-gray-600">Thời gian giao cho vận chuyển</th>
                                                <td className="">
                                                    {
                                                        order.order_date_shipper_receive ?
                                                            (new Date(order.order_date_shipper_receive).toLocaleDateString('vi-VN', { day: '2-digit', month: '2-digit', year: 'numeric' }))
                                                            : (
                                                                " "
                                                            )
                                                    }
                                                </td>
                                            </tr>
                                            <tr className="border-b">
                                                <th className="text-left  font-medium text-gray-600">Thời gian hoàn thành</th>
                                                <td className="">
                                                    {
                                                        order.order_date_comple ?
                                                            (new Date(order.order_date_comple).toLocaleDateString('vi-VN', { day: '2-digit', month: '2-digit', year: 'numeric' }))
                                                            : (
                                                                " "
                                                            )
                                                    }
                                                </td>
                                            </tr>
                                        </tbody>
                                    </table>
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
                                                <div className="flex gap-4 items-center">
                                                    <div className="text-orange-700">
                                                        {new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(item.io_price)}
                                                    </div>
                                                    {
                                                        (new Date(order.order_date_rating) >= new Date()) && (order.order_status == "Hoàn thành") && !(ratings.find(r => r.product_id == item.product_id)) &&
                                                        (
                                                            <div>
                                                                <div onClick={() => { setBox(true); setProductRate(item.product_id) }} className="hover:cursor-pointer text-orange-300 hover:text-orange-500 hover:underline" >
                                                                    Đánh giá
                                                                </div>
                                                            </div>
                                                        )
                                                    }
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
                                                <td className="p-2 font-semibold text-gray-900 ">{order.payment?.payment_name}</td>
                                            </tr>
                                        </tbody>
                                    </table>

                                </div>
                            </div>

                        </div>
                    )
            }
            {
                box && (
                    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
                        <div className="bg-white p-6 rounded-lg shadow-lg max-w-md w-full relative">
                            <h1 className="text-xl font-semibold text-gray-800 mb-4">Đánh giá sản phẩm</h1>
                            <div>
                                <div className="mb-4">
                                    <label className="block mb-2 text-gray-700">Số sao</label>
                                    <div className="flex">
                                        {[...Array(5)].map((star, index) => {
                                            const starRating = index + 1;
                                            return (
                                                <FaStar
                                                    key={index}
                                                    className={`cursor-pointer text-2xl ${starRating <= (hover || rating) ? 'text-yellow-500' : 'text-gray-400'
                                                        }`}
                                                    onClick={() => {
                                                        setRating(starRating)
                                                        console.log(rating);
                                                    }}
                                                    onMouseEnter={() => setHover(starRating)}
                                                    onMouseLeave={() => setHover(null)}
                                                />
                                            );
                                        })}
                                    </div>
                                    <div className="mb-4">
                                        <label className="block mb-2 text-gray-700">Nội dung đánh giá</label>
                                        <textarea
                                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-blue-200"
                                            placeholder="Nhập nội dung đánh giá..."
                                            value={reviewText}
                                            onChange={(e) => setReviewText(e.target.value)}
                                        />
                                    </div>
                                    <div className="flex justify-end space-x-4">
                                        <button
                                            className="px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-600 transition"
                                            onClick={() => {
                                                if (rating > 0 && reviewText) {
                                                    ratingProduct();
                                                    setBox(false); // Close the box or perform another action
                                                } else {
                                                    alert('Vui lòng chọn số sao và nhập nội dung đánh giá');
                                                }
                                            }}
                                        >
                                            Đánh giá
                                        </button>
                                    </div>

                                </div>
                            </div>
                            <button
                                className="top-2 right-2 absolute "
                                onClick={() => {
                                    setBox(false);
                                    setProductRate(null);
                                }}
                            >
                                <FaTimes className="text-red-600 text-2xl" />
                            </button>
                        </div>
                    </div>
                )
            }


        </div>
    )
}