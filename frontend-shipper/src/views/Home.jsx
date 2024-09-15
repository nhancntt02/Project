import { useEffect, useRef, useState } from "react";
import axiosClient from "../axios-client";
import { useNavigate } from "react-router-dom";
import { FaPlus } from "react-icons/fa";
import { useStateContext } from "../contexts/ContextProvider";
export default function Home() {
    const [orders, setOrders] = useState([]);
    const [orderTrans, setOrderTrans] = useState([]);
    const [images, setImages] = useState([]);
    const [shipper, setShipper] = useState([]);
    const navigate = useNavigate();
    const shipper_id = localStorage.getItem('shipperId');
    const [users, setUSers] = useState([]);
    const [address, setaddress] = useState([]);
    const [products, setProducts] = useState([]);
    const [infoOrder, setInfoOrder] = useState([]);
    const [visibleContent, setVisibleContent] = useState(null);

    useEffect(() => {
        getShipper();
        getOrder();
        getUser();
        getAddress();
        getProduct();
        getImage();
    }, []);

    const getUser = () => {
        axiosClient.get('/users').then(({data}) => {setUSers(data.users)});
    }

    const getProduct = async () => {
        const res = await axiosClient.get('/products');
        setProducts(res.data.data);
    }

    const getImage = async () => {
        const res = await axiosClient.get('/images');
        setImages(res.data.data);
    }

    const getShipper = () => {

        axiosClient.get(`/shipper/${shipper_id}`)
            .then(({ data }) => {
                setShipper(data.data);
                //console.log(data.data);
            })
            .catch(err => {
                console.log(err);
            })
    }

    const getOrder = () => {

        axiosClient.get('/orders')
            .then(({ data }) => {
                const arr = data.data;
                //console.log(arr);
                const arr2 = arr.filter(a => ((a.order_status == "Chờ vận chuyển") && (a.shipper_id == shipper_id)));
                const arr3 = arr.filter(a => ((a.order_status == "Đang vận chuyển") && (a.shipper_id == shipper_id)));
                setOrders(arr2);
                setOrderTrans(arr3);
            })
            .catch(err => {
                console.log(err);
            })
    }


    const getAddress = async () => {
        try {
            const res = await axiosClient.get(`/address`);
            setaddress(res.data);

        } catch (error) {
            console.log(error);
        }
    }
    const showDetail = async (order_id, index) => {
        const res = await axiosClient.get(`/info/order/${order_id}`);
        setInfoOrder(res.data.data);
        setVisibleContent(visibleContent === index ? null : index);
    }

    return (
        <div className="min-h-[85vh] p-5 bg-bgheader-100">
            <div>
                <h1 className="text-3xl font-bold text-center">Thông tin shipper</h1>
                <div className="">
                    <div>Tên: <span>{shipper.shipper_name}</span></div>
                    <div>Địa chỉ: <span>{shipper.shipper_address}</span></div>
                    <div>Điện thoại: <span>{shipper.shipper_phone}</span></div>
                </div>
            </div>
            <div>
                <h1 className="text-3xl font-bold text-center">Danh sách đơn hàng xác nhận</h1>
                <div>
                    {
                        orders.length > 0 ? (
                            orders.map((order, index) => (
                                <div key={index}>
                                    <div onClick={() => {showDetail(order.order_id, index)}} className="flex gap-8 border p-3 hover:cursor-pointer">
                                        <div>
                                            Mã đơn hàng: {
                                                order.order_id
                                            }
                                        </div>
                                        <div>
                                            Tên khách hàng: {users.find(u => u.id == order.user_id)?.name}
                                        </div>
                                        <div>
                                            Địa chỉ giao hàng: {address.find(a => a.address_id == order.address_id)?.address_note} - {address.find(a => a.address_id == order.address_id)?.address_phuong} - {address.find(a => a.address_id == order.address_id)?.address_quan} - {address.find(a => a.address_id == order.address_id)?.address_tinh}
                                        </div>
                                        <div>
                                            Số điện thoại liên hệ: {address.find(a => a.address_id == order.address_id)?.address_phone}
                                        </div>
                                        <div>
                                            Tổng số tiền: {
                                                new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(order.order_total_money)
                                            }
                                        </div>
                                    </div>
                                    <div className={visibleContent === index ? "flex border-t mt-4 gap-2 justify-center" : "hidden"}>
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
                        ) : (
                            <div>
                                Bạn Không có đơn hàng nào cần chấp nhận
                            </div>
                        )
                    }
                </div>
            </div>
            <div>
                <h1 className="text-3xl font-bold text-center">Danh sách đơn hàng cần giao</h1>
                <div>
                    {
                        orderTrans.length > 0 ? (
                            orderTrans.map((order, index) => (
                                <div key={index}>
                                    <div onClick={() => {showDetail(order.order_id, index)}} >
                                        <div>
                                            Mã đơn hàng: {
                                                order.order_id
                                            }
                                        </div>
                                        <div>
                                            Tên khách hàng: {users.find(u => u.id == order.user_id)?.name}
                                        </div>
                                        <div>
                                            Địa chỉ giao hàng: {address.find(a => a.address_id == order.address_id)?.address_note} - {address.find(a => a.address_id == order.address_id)?.address_phuong} - {address.find(a => a.address_id == order.address_id)?.address_quan} - {address.find(a => a.address_id == order.address_id)?.address_tinh}
                                        </div>
                                        <div>
                                            Số điện thoại liên hệ: {address.find(a => a.address_id == order.address_id)?.address_phone}
                                        </div>
                                        <div>
                                            Tổng số tiền: {
                                                new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(order.order_total_money)
                                            }
                                        </div>
                                    </div>
                                    <div className={visibleContent === index ? "flex border-t mt-4 gap-2 justify-center" : "hidden"}>
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
                        ) : (
                            <div>
                                Bạn không có đơn hàng nào chấp nhận giao
                            </div>
                        )
                    }
                </div>
            </div>
        </div>
    );
}