import { useEffect, useRef, useState } from "react"
import axiosClient from "../axios-client";
import { useAsyncError, useNavigate, Outlet } from "react-router-dom";
import ChartRevenue from "../components/ChartRevenue"
import { FaArrowLeft, FaArrowRight } from "react-icons/fa";
export default function Income() {
    const navigate = useNavigate();
    const [loading, setLoading] = useState(true);
    const [visible, setVisible] = useState(true);
    const [orders, setOrders] = useState([]);
    const [order, setOrder] = useState([]);
    const [income, setIncome] = useState(0);
    const [slsp, setSlsp] = useState(0);
    const [sldh, setSldh] = useState(0);
    const [infoOrder, setInfoOrder] = useState([]);
    const [images, setImages] = useState([]);
    const [visibleContent, setVisibleContent] = useState(null);
    const [monthT, setMonT] = useState();
    const [ctChange, setCtChange] = useState(true);

    useEffect(() => {
        getOrderComple();
        getImage();
    }, []);

    const getOrderComple = async () => {
        try {
            const res = await axiosClient.get('/ordercomple');
            setOrders(res.data.data);

        } catch (error) {
            console.log(error);
        }
    }
    const getImage = async () => {
        const res = await axiosClient.get('/images');
        setImages(res.data.data);
    }
    useEffect(() => {
        if (orders) {
            let temp = 0;
            let sl = 0;
            let arr = [];
            const currentMonth = new Date().getMonth() + 1; // tháng hiện tại (0-11)
            const currentYear = new Date().getFullYear(); // năm hiện tại
            orders.forEach(order => {
                const orderDate = new Date(order.order_date_comple);
                const orderMonth = orderDate.getMonth() + 1; // tháng trong order.order_date_comple (0-11)
                const orderYear = orderDate.getFullYear(); // năm trong order.order_date_comple
                if (orderYear === currentYear && orderMonth === currentMonth) {
                    temp += order.order_total_money;
                    sl++;
                    arr.push(order);
                }

            })
            setSldh(sl);
            setOrder(arr);
            setIncome(temp);
        }

    }, [orders]);



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


    const changeMonth = (month) => {

        setMonT(month);
        let temp = 0;
        let sl = 0;
        let arr = [];
        const currentMonth = parseInt(month); // tháng hiện tại (0-11)
        const currentYear = new Date().getFullYear(); // năm hiện tại
        orders.forEach(order => {
            const orderDate = new Date(order.order_date_comple);
            const orderMonth = orderDate.getMonth() + 1; // tháng trong order.order_date_comple (0-11)
            const orderYear = orderDate.getFullYear(); // năm trong order.order_date_comple
            if (orderYear === currentYear && orderMonth === currentMonth) {
                temp += order.order_total_money;
                sl++;
                arr.push(order);
            }

        })
        setSldh(sl);
        console.log(arr);
        setOrder(arr);
        setIncome(temp);
    }

    const showDetail = async (order_id, index) => {
        const res = await axiosClient.get(`/info/order/${order_id}`);
        setInfoOrder(res.data.data);
        console.log(res.data.data);
        setVisibleContent(visibleContent === index ? null : index);
    }


    return (
        <div>
            {
                loading ? (
                    <div>Loading......</div>
                ) : (
                    <div className="container h-screen">
                        <div className="h-[10%] border-b flex justify-center items-center bg-bgheader-200">
                            <div className="text-bgheader-300 text-center text-4xl my-4 font-semibold">Quản lý doanh thu</div>
                        </div>
                        <div className="mb-6 p-4">
                            <div className="flex space-x-4 mb-4">
                                <button
                                    className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
                                    onClick={() => {
                                        navigate('/income');
                                    }
                                    }
                                >
                                    Doanh thu theo tháng
                                </button>

                                <button
                                    className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
                                    onClick={() => {
                                        navigate('/income/revenue');
                                    }
                                    }
                                >
                                    Doanh thu theo quý
                                </button>
                                <button
                                    className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
                                    onClick={() => {
                                        navigate('/income/product/table');
                                    }
                                    }
                                >
                                    Thống kê doanh thu theo sản phẩm
                                </button>
                            </div>
                            <div>

                                <Outlet></Outlet>
                            </div>
                            {
                                visible && (
                                    <div className="w-full">
                                        <div className="flex items-start space-y-2">
                                            <select
                                                id="month-select"
                                                className="p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
                                                onChange={(e) => { changeMonth(e.target.value) }}
                                                defaultValue={new Date().getMonth() + 1}
                                            >

                                                {Array.from({ length: 12 }, (_, index) => (
                                                    <option key={index} value={index + 1}>
                                                        Tháng {index + 1}
                                                    </option>
                                                ))}
                                            </select>
                                            <div className="px-4 flex gap-4">
                                                <div className=" flex justify-center gap-4">
                                                    <div className="text-center">
                                                        Doanh thu trong tháng:
                                                    </div>
                                                    <div className="text-center font-semibold  text-bgheader-300">
                                                        {new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(income)}
                                                    </div>
                                                </div>
                                                <div className=" flex justify-center gap-4 ">
                                                    <div className="text-center">
                                                        Số đơn hàng:
                                                    </div>
                                                    <div className="text-center font-semibold  text-bgheader-300">
                                                        {sldh}
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="">
                                            {
                                                ctChange ?
                                                    (<div className="overflow-auto mx-auto">
                                                        {

                                                            order.length > 0 &&
                                                            <div className="flex justify-end">
                                                                <div onClick={() => { setCtChange(false); }} className="flex gap-2 items-center hover:cursor-pointer">
                                                                    <div>Biểu đồ</div> <FaArrowRight size={20} />
                                                                </div>

                                                            </div>
                                                        }
                                                        {
                                                            order.length > 0 ?
                                                                (order.map((order, index) => (
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
                                                                    <div className="text-center text-2xl text-gray-500 font-semibold mt-4 p-4 border border-gray-300 rounded bg-gray-100">
                                                                        Tháng này chưa có đơn hàng nào
                                                                    </div>

                                                                )
                                                        }
                                                    </div>)
                                                    :
                                                    (<div className="w-[80%] mx-auto">
                                                        <div className="flex justify-start">
                                                            <div onClick={() => { setCtChange(true) }} className="flex gap-2 items-center hover:cursor-pointer">
                                                                <div>Đơn hàng</div> <FaArrowLeft size={20} />
                                                            </div>
                                                        </div>
                                                        {
                                                            order.length > 0 && (
                                                                <ChartRevenue orders={order} month={monthT} />
                                                            )
                                                        }
                                                    </div>)
                                            }
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