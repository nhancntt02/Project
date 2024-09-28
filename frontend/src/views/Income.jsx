import { useEffect, useRef, useState } from "react"
import axiosClient from "../axios-client";
import { useAsyncError, useNavigate, Outlet } from "react-router-dom";
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
        setLoading(true);
        getProduct();
        getImage();
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
            //setIncome(temp);
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
                    <div className="container h-screen">
                        <div className="h-[16%] border-b flex justify-center items-center bg-bgheader-200">
                            <div className="text-bgheader-300 text-center text-4xl my-4 font-semibold">Quản lý doanh thu</div>
                        </div>
                        <div className="mb-6">
                            <div className="flex">
                                {/* <div className="basis-1/2">
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
                                </div> */}
                                {/* Phieu nhap cu */}
                                {/* <div className="basis-1/2">
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


                                </div> */}
                            </div>
                            <div className="flex space-x-4 mb-4">

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
                            {/* <div className="mt-6">
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
                            </div> */}

                        </div>
                    </div>
                )
            }

        </div>
    )
}