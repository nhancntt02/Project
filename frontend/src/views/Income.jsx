import { useEffect, useRef, useState } from "react"
import axiosClient from "../axios-client";
import { useAsyncError } from "react-router-dom";


export default function Income() {
    const [orders, setOrders] = useState([]);
    const [order, setOrder] = useState([]);
    const [products, setProducts] = useState([]);
    const [infoOrder, setInfoOrder] = useState([]);
    const [visibleContent, setVisibleContent] = useState(null);
    const [users, setUsers] = useState([]);
    const [payment, setPayment] = useState([]);
    const [shippers, setShipers] = useState([]);
    const [images, setImages] = useState([]);
    const [address, setaddress] = useState([]);
    const [income, setIncome] = useState(0);
    const dateRef = useRef();

    useEffect(() => {
        axiosClient.get('/users').then(({ data }) => setUsers(data.users));
        getProduct();
        getImage();
        getPayment();
        getShipper();
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
    
    const showDetail = async (order_id, index, address_id) => {
        getAddress(address_id);
        const res = await axiosClient.get(`/info/order/${order_id}`);
        setInfoOrder(res.data.data);
        console.log(res.data.data);
        setVisibleContent(visibleContent === index ? null : index);
    }

    useEffect(() => {
        if (orders) {
          let temp = 0;
          const currentMonth = new Date().getMonth() + 1; // tháng hiện tại (0-11)
          const currentYear = new Date().getFullYear(); // năm hiện tại
          orders.forEach(order => {
            const orderDate = new Date(order.order_date_comple);
            const orderMonth = orderDate.getMonth() + 1; // tháng trong order.order_date_comple (0-11)
            const orderYear = orderDate.getFullYear(); // năm trong order.order_date_comple
            if (orderYear === currentYear && orderMonth === currentMonth) {
              temp += order.order_total_money;
            }
          })
          setIncome(temp);
        }
      }, [orders]);

    return (
        <div>
            <div className="container">
                <h1>Doanh thu cửa hàng</h1>
                <div>
                    <div>
                        Doanh thu tháng này: {new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(income)}
                    </div>
                    <div>
                        <div>
                            <input type="date" name="" id="" ref={dateRef} />
                        </div>
                    </div>
                    <div>
                        <div>
                            Danh sách đơn hàng
                        </div>
                        <div className="h-[500px] overflow-auto">
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

                                                <div className="text-gray-700">Tên khách hàng: <span className="font-semibold">{users.find(u => u.id == order.user_id)?.name}</span></div>
                                                <div className="text-gray-700">Địa chỉ: <span className="font-semibold">{address.address_note} - {address.address_phuong} - {address.address_quan} - {address.address_tinh}</span></div>
                                                <div className="text-gray-700">Trạng thái: <span

                                                    className="font-semibold text-green-500"

                                                > {order.order_status || 'Chưa xác nhận'}
                                                </span>
                                                </div>
                                                <div className="text-gray-700">Nhân viên xác nhận: <span className="font-semibold">{users.find(u => u.id == order.employee_id)?.name || 'Chưa xác nhận'}</span></div>
                                                <div className="text-gray-700">Phương thức thanh toán: <span className="font-semibold">{payment.find(p => p.payment_id == order.payment_id)?.payment_name}</span></div>
                                                {
                                                    (order.shipper_id) && (
                                                        <div className="text-gray-700">Shipper giao hàng: <span className="font-semibold">{shippers.find(s => s.shipper_id == order.shipper_id)?.shipper_name}</span></div>
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

                                ))
                            }
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}