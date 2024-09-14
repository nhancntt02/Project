import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom"
import axiosClient from "../axios-client";
import { useStateContext } from "../contexts/ContextProvider";

export default function PaymentReturn() {
    const location = useLocation();
    const { products, setCart } = useStateContext();
    const [isOrderCreated, setIsOrderCreated] = useState(false);
    const userId = localStorage.getItem('userId');


    const getQueryParams = (search) => {
        const params = new URLSearchParams(search);
        return {
            resultCode: params.get('resultCode'),
            message: params.get('message'),
            orderId: params.get('orderId'),
            amount: params.get('amount'),
            vnp_ResponseCode: params.get('vnp_ResponseCode')
            // Lấy thêm các tham số khác nếu cần
        };
    };


    // Lấy các tham số từ URL
    const queryParams = getQueryParams(location.search);
    const productOrder = JSON.parse(localStorage.getItem('cartData'));
    const order = JSON.parse(localStorage.getItem('order'));

    useEffect(() => {
        if (order && productOrder && products.length > 0 && !isOrderCreated) {
            createOrder();
            setIsOrderCreated(true);
        }
    }, [products])

    const createOrder = async () => {
        const payload = {
            ...order
        }

        try {
            const res = await axiosClient.post('/add/order', payload);
            const order_id = res.data.data.order_id;

            for (let i = 0; i < productOrder.length; i++) {
                const payload2 = {
                    order_id: order_id,
                    product_id: productOrder[i].product_id,
                    io_quantity: productOrder[i].cart_quantity,
                    io_price: products.find(p => p.product_id == productOrder[i].product_id)?.product_price
                }
                console.log(payload2);
                await axiosClient.post('/add/info/order', payload2);
                await axiosClient.delete(`/delete/cart/${productOrder[i].product_id}/${userId}`);

            }
            localStorage.removeItem('cartData');
            localStorage.removeItem('order');
            setCart();
        } catch (error) {
            console.log(error);
        }


    }



    return (
        <div className="container">
            {
                (queryParams.resultCode == 0) || (queryParams.vnp_ResponseCode == 0) ? (
                    <div className="flex justify-center items-center h-[80vh] bg-green-100">
                        <div className="bg-white p-6 rounded-lg shadow-lg text-center">
                            <h2 className="text-2xl font-bold text-green-600 mb-4">Thanh toán thành công!</h2>
                            <p className="text-gray-700">Cảm ơn bạn đã sử dụng dịch vụ của chúng tôi.</p>
                        </div>
                    </div>

                ) : (
                    <div>
                        <h2>Thanh toán thất bại!
                        </h2>
                    </div>
                )
            }
        </div>
    )
}
