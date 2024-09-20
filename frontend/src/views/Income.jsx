import { useEffect, useRef, useState } from "react"
import axiosClient from "../axios-client";
import { useAsyncError, useNavigate } from "react-router-dom";
import { AiFillEye, AiFillEyeInvisible } from "react-icons/ai";

export default function Income() {
    const [orders, setOrders] = useState([]);
    const [order, setOrder] = useState([]);
    const [products, setProducts] = useState([]);
    const [infoOrder, setInfoOrder] = useState([]);
    const [visibleContent, setVisibleContent] = useState(null);
    const [isVisible, setIsVisible] = useState(false);
    const [users, setUsers] = useState([]);
    const [payment, setPayment] = useState([]);
    const [shippers, setShipers] = useState([]);
    const [images, setImages] = useState([]);
    const [address, setaddress] = useState([]);
    const [income, setIncome] = useState(0);
    const [income2, setIncome2] = useState(0);
    const [choose, setChoose] = useState(null);
    const [totalRevenue, setTotalRevenue] = useState(0);
    const [inventoryCost, setInventoryCost] = useState(0);
    const [forms, setForms] = useState([]);
    const [formM, setFormM] = useState([]);
    const dateRef = useRef();
    const monthRef = useRef();
    const yearRef = useRef();
    const onlyYearRef = useRef();
    const navigate = useNavigate();
    const [loading, setLoading] = useState(true);



    useEffect(() => {
        //axiosClient.get('/users').then(({ data }) => setUsers(data.users));
        setLoading(true);
        getProduct();
        getImage();
        //getPayment();
        //getShipper();
        getOrderComple();
        getForm();
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
        } catch (error) {
            console.log(error);
        }
    }

    const getAddress = async (address_id) => {
        try {
            const res = await axiosClient.get(`/address/${address_id}`);
            setaddress(res.data.data);

        } catch (error) {
            console.log(error);
        }
    }

    const getPayment = async () => {
        try {
            const res = await axiosClient.get('/payments');
            setPayment(res.data.data);
        } catch (error) {
            console.log(error);
        }
    }

    const getShipper = async () => {
        try {
            const res = await axiosClient.get('/shippers');
            setShipers(res.data.data);
        } catch (error) {
            console.log(error);
        }
    }

    const getForm = async () => {
        try {
            const res = await axiosClient.get('/form');
            setForms(res.data.data);
            setLoading(false);
        } catch (error) {
            console.log(error);
        }
    }

    const showDetail = async (order_id, index, address_id) => {
        //getAddress(address_id);
        const res = await axiosClient.get(`/info/order/${order_id}`);
        setInfoOrder(res.data.data);
        console.log(res.data.data);
        setVisibleContent(visibleContent === index ? null : index);
    }

    useEffect(() => {
        if (order) {
            let temp2 = 0
            let temp3 = 0
            let temp = 0;
            let arr = [];
            const currentMonth = new Date().getMonth() + 1; // tháng hiện tại (0-11)
            const currentYear = new Date().getFullYear(); // năm hiện tại
            order.forEach(order => {
                const orderDate = new Date(order.order_date_comple);
                const orderMonth = orderDate.getMonth() + 1; // tháng trong order.order_date_comple (0-11)
                const orderYear = orderDate.getFullYear(); // năm trong order.order_date_comple
                if (orderYear === currentYear && orderMonth === currentMonth) {
                    temp += order.order_total_money;
                }
                temp2 += order.order_total_money;
            })
            setIncome(temp);
            setIncome2(temp2);
            setTotalRevenue(temp2);

            forms.forEach(form => {
                const formDate = new Date(form.fap_date_confirm);
                const formMonth = formDate.getMonth() + 1;
                const formYear = formDate.getFullYear();
                if (formYear == currentYear && formMonth == currentMonth) {
                    temp3 += form.fap_total_amount;
                    arr.push(form);
                }
            });
            setInventoryCost(temp3);
            setFormM(arr);
            
        }
        
    }, [order]);


    const revenueDay = () => {
        let temp = 0;
        const currentDay = new Date(dateRef.current.value);
        console.log(currentDay);
        const orderRD = order.filter((o, i) => {
            const orderDate = new Date(o.order_date_comple);
            if (currentDay.toDateString() === orderDate.toDateString()) {
                temp += o.order_total_money;
                return true;
            }
        })
        setOrders(orderRD);
        setTotalRevenue(temp);
    }

    const revenueMonth = () => {
        let temp = 0;
        const currentMonth = monthRef.current.value;
        const currentYear = yearRef.current.value;
        const orderRD = order.filter((o, i) => {
            const orderDate = new Date(o.order_date_comple);
            const orderMonth = orderDate.getMonth() + 1;
            const orderYear = orderDate.getFullYear();

            if (orderYear == currentYear && orderMonth == currentMonth) {
                temp += o.order_total_money;
                return true;
            }
        })
        setOrders(orderRD);
        setTotalRevenue(temp);
    }

    const revenueYear = () => {
        let temp = 0;
        const currentYear = onlyYearRef.current.value;
        const orderRD = order.filter((o, i) => {
            const orderDate = new Date(o.order_date_comple);
            const orderYear = orderDate.getFullYear();
            if (currentYear == orderYear) {
                temp += o.order_total_money;
                return true;
            }
        })
        setOrders(orderRD);
        setTotalRevenue(temp);
    }
    const infoForm = (fap_id) => {
        navigate(`/infoform/${fap_id}`);
    }

    const changeMForm = () => {
        const currentMonth = monthRef.current.value;
        console.log(currentMonth);
        let arr = [];
        let temp3 = 0
        forms.forEach(form => {
            const formDate = new Date(form.fap_date_confirm);
            const formMonth = formDate.getMonth() + 1;
            if (formMonth == currentMonth) {
                temp3 += form.fap_total_amount;
                arr.push(form);
            }
        });
        setInventoryCost(temp3);
        setFormM(arr);
    }



    return (
        <div>
            {
                loading ? (
                    <div>Loading......</div>
                ) : (
                    <div className="container mx-auto p-6">
                        <h1 className="text-2xl font-bold mb-4">Doanh thu cửa hàng</h1>
                        <div className="mb-6">
                            <div className="flex">
                                <div className="basis-1/2">
                                    <div className="mb-4">
                                        Doanh thu tháng này: <span className="font-semibold text-green-600">

                                            {new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(income)}
                                        </span>
                                    </div>

                                    <div className="mb-4">
                                        Tổng doanh thu: <span className="font-semibold text-blue-600">

                                            {new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(totalRevenue)}
                                        </span>
                                    </div>
                                </div>
                                <div className="basis-1/2">
                                    <div className="mb-2 flex gap-2 items-center">
                                        Tiền nhập hàng tháng này: <span className="font-semibold text-gray-600">
                                            {new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(inventoryCost)}
                                        </span>
                                        <span onClick={() => setIsVisible(!isVisible)} className="cursor-pointer">
                                            {isVisible ? <AiFillEye size={24} /> : <AiFillEyeInvisible size={24} />}
                                        </span>
                                        <div>
                                            <select onChange={() => {
                                                changeMForm();
                                            }} ref={monthRef} className="border rounded p-2">
                                                <option value="">Tháng</option>
                                                {[...Array(12).keys()].map((m) => (
                                                    <option value={m + 1} key={m}>{m + 1}</option>
                                                ))}
                                            </select>
                                        </div>
                                    </div>
                                    {
                                        isVisible && (
                                            <div className="mb-4">
                                                {formM.map((item, index) => (
                                                    <div key={index} className="p-1 border w-fit border-gray-300 rounded-lg bg-white shadow">
                                                        <div className="flex items-center">
                                                            <div>
                                                                Phiếu nhập: <span className="font-semibold">{index + 1}</span> - Số tiền:
                                                                <span className="font-semibold text-blue-600 mr-4"> {new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(item.fap_total_amount)}</span>
                                                                <span
                                                                    onClick={() => infoForm(item.fap_id)}
                                                                    className="text-blue-500 hover:text-blue-700 hover:cursor-pointer"
                                                                >
                                                                    Chi tiết
                                                                </span>
                                                            </div>

                                                        </div>
                                                    </div>
                                                ))}
                                            </div>
                                        )
                                    }


                                </div>
                            </div>
                            <div className="flex space-x-4 mb-4">
                                <button
                                    className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
                                    onClick={() => {
                                        setTotalRevenue(income2);
                                        setChoose(null);
                                        setOrders(order);
                                    }
                                    }
                                >
                                    Tất cả
                                </button>

                                <button
                                    className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
                                    onClick={() => setChoose(1)}
                                >
                                    Doanh thu ngày
                                </button>

                                <button
                                    className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
                                    onClick={() => setChoose(2)}
                                >
                                    Doanh thu tháng
                                </button>

                                <button
                                    className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
                                    onClick={() => setChoose(3)}
                                >
                                    Doanh thu năm
                                </button>
                            </div>

                            <div className="mt-6">
                                {
                                    choose === 1 && (
                                        <div id="day-month-year" className="space-x-4">
                                            <input
                                                type="date"
                                                id="date"
                                                ref={dateRef}
                                                className="border rounded p-2"
                                            />
                                            <button
                                                className="border px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600"
                                                onClick={() => { setChoose(null); revenueDay(); }}
                                            >
                                                OK
                                            </button>
                                        </div>
                                    )
                                }

                                {
                                    choose === 2 && (
                                        <div id="month-year" className="space-x-4">
                                            <select ref={monthRef} className="border rounded p-2">
                                                <option value="">Tháng</option>
                                                {[...Array(12).keys()].map((m) => (
                                                    <option value={m + 1} key={m}>{m + 1}</option>
                                                ))}
                                            </select>

                                            <select id="year" ref={yearRef} className="border rounded p-2 ">
                                                <option value="">Năm</option>
                                                {[2020, 2021, 2022, 2023, 2024, 2025].map((year) => (
                                                    <option value={year} key={year}>{year}</option>
                                                ))}
                                            </select>

                                            <button
                                                className="border px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600"
                                                onClick={() => { setChoose(null); revenueMonth(); }}
                                            >
                                                OK
                                            </button>
                                        </div>
                                    )
                                }

                                {
                                    choose === 3 && (
                                        <div id="year" className="space-x-4">
                                            <select id="year-only" ref={onlyYearRef} className="border rounded p-2 ">
                                                <option value="">Năm</option>
                                                {[2020, 2021, 2022, 2023, 2024, 2025].map((year) => (
                                                    <option value={year} key={year}>{year}</option>
                                                ))}
                                            </select>

                                            <button
                                                className="border px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600"
                                                onClick={() => { setChoose(null); revenueYear(); }}
                                            >
                                                OK
                                            </button>
                                        </div>
                                    )
                                }
                            </div>
                            <div>
                                <div className="text-2xl text-center mb-4 border-t-2 pt-2">
                                    Danh sách đơn hàng
                                </div>
                                <div className="h-[500px] overflow-auto">
                                    {
                                        orders.length > 0 ?
                                            (orders.map((order, index) => (
                                                <div className="" key={index}>
                                                    <div onClick={() => showDetail(order.order_id, index)} className="flex gap-8 border p-3 hover:cursor-pointer">
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
                                                                                    {products.find(p => p.product_id == item.product_id)?.product_name || 'N/A'}
                                                                                </td>
                                                                                <td className="p-2 text-gray-800">
                                                                                    {new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(products.find(p => p.product_id == item.product_id)?.product_price) || 'N/A'}
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

        </div>
    )
}