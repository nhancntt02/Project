import { useEffect, useRef, useState } from "react"
import axiosClient from "../axios-client";
import { useNavigate } from "react-router-dom";
import { FaSearch } from 'react-icons/fa';
export default function Revenue() {
    const [orders, setOrders] = useState([]);
    const [order, setOrder] = useState([]);
    const [products, setProducts] = useState([]);
    const [infoOrder, setInfoOrder] = useState([]);
    const [visibleContent, setVisibleContent] = useState(null);
    const [images, setImages] = useState([]);
    const [totalRevenue, setTotalRevenue] = useState(0);
    const navigate = useNavigate();
    const [loading, setLoading] = useState(true);
    const dayStart = useRef();
    const dayEnd = useRef();

    useEffect(() => {
        setLoading(true);
        //getProduct();
        getImage();
        getOrderComple();
    }, []);



    const getProduct = async () => {
        const res = await axiosClient.get('/products');
        setProducts(res.data.data);
    }

    const getImage = async () => {
        const res = await axiosClient.get('/images');
        setImages(res.data.data);
    }
    const getOrderComple = async () => {
        try {
            const res = await axiosClient.get('/ordercomple');
            setOrders(res.data.data);
            setOrder(res.data.data);
            const data1 = res.data.data;
            let total = 0;
            data1.forEach(i => {
                total += i.order_total_money;
            });
            setTotalRevenue(total);


        } catch (error) {
            console.log(error);
        }
    }


    const showDetail = async (order_id, index) => {
        const res = await axiosClient.get(`/info/order/${order_id}`);
        setInfoOrder(res.data.data);
        console.log(res.data.data);
        setVisibleContent(visibleContent === index ? null : index);
    }




    const revenue = () => {
        const dS = new Date(dayStart.current.value);
        const dE = new Date(dayEnd.current.value);
        let temp = 0;
        let arr = [];

        if (dS > dE) {
            alert('Ngày bắt đầu không thể lớn hơn ngày kết thúc');
        }
        // Kiểm tra nếu tháng và năm của dS và dE bằng nhau
        else {
            const diffInTime = dE - dS; // Sự khác biệt thời gian tính bằng milliseconds
            const diffInDays = diffInTime / (1000 * 3600 * 24); // Chuyển đổi sang ngày

            // Kiểm tra nếu số ngày lớn hơn 30
            if (diffInDays > 30) {
                alert('Khoảng thời gian giữa ngày bắt đầu và ngày kết thúc không thể lớn hơn 30 ngày');
            } else {
                // Lấy dữ liệu từ database
                order.forEach(order => {
                    const orderDate = new Date(order.order_date_comple);
                    if ((orderDate >= dS) && (orderDate <= dE)) {
                        temp += order.order_total_money;
                        arr.push(order);
                    }
                })
                setOrders(arr);
                setTotalRevenue(temp);
            }
        }
        // Nếu không cùng tháng và năm


    }

    return (
        <div className="container">
            <div className="border-t-2">
                <div className="flex justify-between items-center mt-2">
                    <div className="">
                            Doanh thu: <span className="font-semibold text-blue-600">

                                {new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(totalRevenue)}
                            </span>
                    </div>
                    <div className="flex gap-4 items-center py-4">
                        <div>
                            <label htmlFor="dateS">Ngày bắt đầu: <input type="date" id="dateS" ref={dayStart} />

                            </label>

                        </div>
                        <div>
                            <label htmlFor="dateE">Ngày kết thúc: <input type="date" id="dateE" ref={dayEnd} />

                            </label>
                        </div>
                        <button
                            className="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-700 flex gap-2 items-center"
                            onClick={() => {
                                revenue();
                            }
                            }
                        >
                            <FaSearch /> <span>Tìm kiếm</span>
                        </button>
                    </div>
                </div>
                <div>
                    <div className="text-2xl text-center mb-4 border-t-2 mt-2 pt-2">
                        Danh sách đơn hàng
                    </div>
                    <div className="h-[390px] overflow-auto w-fit mx-auto">
                        {
                            orders.length > 0 ?
                                (orders.map((order, index) => (
                                    <div className="" key={index}>
                                        <div onClick={() => showDetail(order.order_id, index)} className="grid grid-cols-5 gap-8 border p-3 hover:cursor-pointer">
                                            <div>
                                                Mã đơn hàng: {
                                                    order.order_id
                                                }
                                            </div>
                                            <div>
                                                Ngày tạo: {
                                                    order.order_date_create
                                                }
                                            </div>
                                            <div>
                                                Ngày xác nhận: {
                                                    order.order_date_confirm
                                                }
                                            </div>
                                            <div>
                                                Ngày thanh toán: {
                                                    order.order_date_payment
                                                }
                                            </div>
                                            <div>
                                                Tổng số tiền: {
                                                    new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(order.order_total_money)
                                                }
                                            </div>
                                        </div>
                                        <div className={visibleContent === index ? "flex border-t mt-4 gap-2 justify-center" : "hidden"}>
                                            <div className="border-r p-4 space-y-1 bg-white shadow-lg">
                                                <div className="text-center font-bold text-lg text-gray-800 border-b pb-2">Chi tiết đơn hàng</div>

                                                <div className="text-gray-700">Tên khách hàng: <span className="font-semibold">{order.customer?.name}</span></div>
                                                <div className="text-gray-700">Địa chỉ: <span className="font-semibold">{order.address?.address_note} - {order.address?.address_phuong} - {order.address?.address_quan} - {order.address?.address_tinh}</span></div>
                                                <div className="text-gray-700">Trạng thái: <span

                                                    className="font-semibold text-green-500"

                                                > {order.order_status || 'Chưa xác nhận'}
                                                </span>
                                                </div>
                                                <div className="text-gray-700">Nhân viên xác nhận: <span className="font-semibold">{order.employee?.name || 'Chưa xác nhận'}</span></div>
                                                <div className="text-gray-700">Phương thức thanh toán: <span className="font-semibold">{order.payment?.payment_name}</span></div>
                                                {
                                                    (order.shipper_id) && (
                                                        <div className="text-gray-700">Shipper giao hàng: <span className="font-semibold">{order.shipper?.shipper_name}</span></div>
                                                    )

                                                }
                                                <div className="text-gray-700">Tiền hàng: <span className="font-semibold">{new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(order.order_product_money)}</span></div>
                                                <div className="text-gray-700">Tiền vận chuyển: <span className="font-semibold">{new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(order.order_transport_money)}</span></div>
                                                <div className="text-gray-700">Tiền khuyến mãi: <span className="font-semibold">{new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(order.order_discount_money)}</span></div>
                                                <div className="text-gray-800 font-bold">Tổng tiền: <span>{new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(order.order_total_money)}</span></div>
                                            </div>

                                            <div className="border-r p-4 space-y-1 bg-white shadow-lg">
                                                <div className="text-center font-bold text-lg text-gray-800 border-b pb-2">Danh sách sản phẩm</div>
                                                <table>
                                                    <tbody>
                                                        <tr>
                                                            <th>STT</th>
                                                            <th>Hình ảnh</th>
                                                            <th>Tên sản phẩm</th>
                                                            <th>Giá</th>
                                                            <th>Số lượng</th>
                                                        </tr>

                                                        {
                                                            infoOrder.map((item, index1) => (

                                                                <tr key={index1} className="border-b hover:bg-gray-100">
                                                                    <td className="p-2 text-gray-800">{index1 + 1}</td>
                                                                    <td className=" p-2">
                                                                        <img
                                                                            src={images.find(i => i.product_id == item.product_id)?.image_value || 'Na/n'}
                                                                            alt=""
                                                                            className="w-[60px] h-auto object-cover"
                                                                        />
                                                                    </td>
                                                                    <td className="p-2 text-gray-800">
                                                                        {item.product?.product_name}
                                                                    </td>
                                                                    <td className="p-2 text-gray-800">
                                                                        {new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(item.product?.product_price) || 'N/A'}
                                                                    </td>
                                                                    <td className="p-2 text-center text-gray-800">
                                                                        {item.io_quantity}
                                                                    </td>
                                                                </tr>

                                                            ))
                                                        }
                                                    </tbody>
                                                </table>
                                            </div>
                                        </div>
                                    </div>

                                ))) : (
                                    <div className="text-center text-gray-500 font-semibold mt-4 p-4 border border-gray-300 rounded bg-gray-100">
                                        Không có đơn hàng tương ứng
                                    </div>

                                )
                        }
                    </div>
                </div>
            </div>
        </div>
    )
}