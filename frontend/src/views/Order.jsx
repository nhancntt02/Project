import { useEffect, useState } from "react";
import axiosClient from "../axios-client";

export default function Order() {
    const [orders, setOrders] = useState([]);
    const [products, setProducts] = useState([]);
    const [images, setImages] = useState([]);
    const [address, setaddress] = useState(false);
    const [infoOrder, setInfoOrder] = useState([]);
    const [visibleContent, setVisibleContent] = useState(null);
    const [users, setUsers] = useState([]);
    const [user, setUser] = useState([]);
    const [order, setOder] = useState([]);
    const [payment, setPayment] = useState([]);

    useEffect(() => {
        axiosClient.get('/user').then(({ data }) => setUser(data.data));
        axiosClient.get('/users').then(({ data }) => setUsers(data.users));
        getOrder();
        getProduct();
        getImage();
        getPayment();
    }, []);

    const getProduct = async () => {
        const res = await axiosClient.get('/products');
        setProducts(res.data.data);
    }

    const getImage = async () => {
        const res = await axiosClient.get('/images');
        setImages(res.data.data);
    }

    const getOrder = async () => {
        try {
            const res = await axiosClient.get('/orders');
            setOrders(res.data.data);
            setOder(res.data.data);
            console.log(res.data.data);
        } catch (error) {
            console.log(error);
        }
    }

    const getAddress = async (address_id) => {
        try {
            const res = await axiosClient.get(`/address/${address_id}`);
            setaddress(res.data.data);
            console.log(res.data.data);
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

    const typeOrder = (check) => {
        console.log(order);
        if(check == 1) {
            const a = order.filter(i => (i.order_status == "Khởi tạo") || (i.order_status == "Đã nhận hàng"));
            setOrders(a);
        }
        if(check == 2) {
            const a = order.filter(i => i.order_status == "Đã xác nhận");
            setOrders(a);
        }
        if(check == 3) {
            const a = order.filter(i => i.order_status == "Đang vận chuyển");
            setOrders(a);
        }
        if(check == 4) {
            const a = order.filter(i => i.order_status == "Hủy");
            console.log(a);
            setOrders(a);
        }
        if(check == 5) {
            const a = order.filter(i => i.order_status == "Hoàn thành");
            setOrders(a);
        }
    }

    const showDetail = async (order_id, index, address_id) => {
        getAddress(address_id);
        const res = await axiosClient.get(`/info/order/${order_id}`);
        setInfoOrder(res.data.data);
        console.log(res.data.data);
        setVisibleContent(visibleContent === index ? null : index);
    }

    const orderConfirm = async (order_id) => {
        const now = new Date();
        try {
            let payload = order.filter(o => o.order_id == order_id);
            payload[0].order_status = "Đã xác nhận";
            payload[0].order_date_confirm = now.toISOString().substr(0, 10);
            payload[0].employee_id = user.id;
            await axiosClient.put(`update/order/${order_id}`, payload[0]);
            getOrder();
        } catch (error) {
            console.log(error);
        }
    }

    const orderTransport = async (order_id) => {
        try {
            let payload = order.filter(o => o.order_id == order_id);
            payload[0].order_status = "Đang vận chuyển";
            await axiosClient.put(`update/order/${order_id}`, payload[0]);
            getOrder();
        } catch (error) {
            console.log(error);
        }
    }

    const orderComlete = async (order_id) => {
        try {
            let payload = order.filter(o => o.order_id == order_id);
            payload[0].order_status = "Hoàn thành";
            await axiosClient.put(`update/order/${order_id}`, payload[0]);
            getOrder();
        } catch (error) {
            console.log(error);
        }
    }


    return (
        <div className="container">
            <div className="p-4">
                <h1 className="text-2xl font-bold text-center mb-6 text-gray-800">DANH SÁCH ĐƠN HÀNG</h1>

                <div className="grid grid-cols-3 md:grid-cols-6  gap-4">
                    <div>
                        <button
                            onClick={() => setOrders(order)}
                            className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition">
                            Tất cả đơn hàng
                        </button>
                    </div>
                    <div>
                        <button
                            onClick={() => typeOrder(1)}
                            className="w-full bg-yellow-500 text-white py-2 rounded-lg hover:bg-yellow-600 transition">
                            Chưa xác nhận
                        </button>
                    </div>
                    <div>
                        <button
                            onClick={() => typeOrder(2)}
                            className="w-full bg-green-600 text-white py-2 rounded-lg hover:bg-green-700 transition">
                            Đã xác nhận
                        </button>
                    </div>
                    <div>
                        <button
                            onClick={() => typeOrder(3)}
                            className="w-full bg-indigo-500 text-white py-2 rounded-lg hover:bg-indigo-600 transition">
                            Đang vận chuyển
                        </button>
                    </div>
                    <div>
                        <button
                            onClick={() => typeOrder(4)}
                            className="w-full bg-red-500 text-white py-2 rounded-lg hover:bg-red-600 transition">
                            Đã hủy
                        </button>
                    </div>
                    <div>
                        <button
                            onClick={() => typeOrder(5)}
                            className="w-full bg-gray-600 text-white py-2 rounded-lg hover:bg-gray-700 transition">
                            Đã hoàn thành
                        </button>
                    </div>
                </div>
                <div className="flex mt-5 justify-center">
                    <div className="">
                        {
                            orders.map((order, index) => (
                                <div className="" key={index}>
                                    <div onClick={() => showDetail(order.order_id, index, order.address_id)} className="flex gap-8 border p-3 hover:cursor-pointer">
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
                                                order.order_date_confirm || 'Chưa xác nhận'
                                            }
                                        </div>
                                        <div>
                                            Tổng số tiền: {
                                                new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(order.order_total_money)
                                            }
                                        </div>
                                        <div>

                                            Trạng thái: {
                                                order.order_status
                                            }
                                        </div>
                                    </div>
                                    <div className={visibleContent === index ? "flex border-t mt-4 gap-2 justify-center" : "hidden"}>
                                        <div className="border-r p-4 space-y-1 bg-white shadow-lg">
                                            <div className="text-center font-bold text-lg text-gray-800 border-b pb-2">Chi tiết đơn hàng</div>

                                            <div className="text-gray-700">Tên khách hàng: <span className="font-semibold">{users.find(u => u.id == order.user_id)?.name}</span></div>
                                            <div className="text-gray-700">Địa chỉ: <span className="font-semibold">{address.address_note} - {address.address_phuong} - {address.address_quan} - {address.address_tinh}</span></div>
                                            <div className="text-gray-700">Trạng thái: <span className={`font-semibold ${order.order_status ? 'text-green-600' : 'text-red-600'}`}>{order.order_status || 'Chưa xác nhận'}</span></div>
                                            <div className="text-gray-700">Nhân viên xác nhận: <span className="font-semibold">{users.find(u => u.id == order.employee_id)?.name || 'Chưa xác nhận'}</span></div>
                                            <div className="text-gray-700">Phương thức thanh toán: <span className="font-semibold">{payment.find(p => p.payment_id == order.payment_id)?.payment_name}</span></div>
                                            <div className="text-gray-700">Tiền hàng: <span className="font-semibold">{new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(order.order_product_money)}</span></div>
                                            <div className="text-gray-700">Tiền vận chuyển: <span className="font-semibold">{new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(order.order_transport_money)}</span></div>
                                            <div className="text-gray-700">Tiền khuyến mãi: <span className="font-semibold">{new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(order.order_discount_money)}</span></div>
                                            <div className="text-gray-800 font-bold">Tổng tiền: <span>{new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(order.order_total_money)}</span></div>

                                            {
                                                order.order_status === 'Khởi tạo' && (
                                                    <div className="pt-4">
                                                        <button onClick={() => orderConfirm(order.order_id)} className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition">Xác nhận đơn hàng</button>
                                                    </div>
                                                )
                                            }
                                            {
                                                order.order_status === 'Đã xác nhận' && (
                                                    <div className="pt-4">
                                                        <button onClick={() => orderTransport(order.order_id)} className="w-full bg-gray-600 text-white py-2 rounded-lg hover:bg-gray-700 transition">Chuyển cho đơn vị vận chuyển</button>
                                                    </div>
                                                )
                                            }
                                            {
                                                order.order_status === 'Đã nhận hàng' && (
                                                    <div className="pt-4">
                                                        <button onClick={() => orderComlete(order.order_id)} className="w-full bg-green-600 text-white py-2 rounded-lg hover:bg-green-700 transition">Hoàn thành</button>
                                                    </div>
                                                )
                                            }
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

                            ))
                        }
                    </div>
                </div>

            </div>
        </div>
    )
}