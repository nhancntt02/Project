import { useEffect, useRef, useState } from "react";
import axiosClient from "../axios-client";
import { useLocation, useParams } from "react-router-dom";
import { useStateContext } from "../contexts/ContextProvider";

export default function Checkout() {
    const [orderProduct, setOrderProduct] = useState([]);
    const [images, setImages] = useState([]);
    const { user, products, setCart } = useStateContext();
    const location = useLocation();
    const [loading, setLoading] = useState(true);
    const data = location.state;

    const [address, setAddress] = useState([]);

    useEffect(() => {
        getImages();
        getAddress();
        if (data.order_product) {
            setOrderProduct(data.order_product);
        }
    }, [])


    const getImages = () => {
        axiosClient.get('/images')
            .then(({ data }) => {
                setImages(data.data);

            })
            .catch(error => {
                console.error('Error fetching image:', error);

            });
    }

    const getAddress = () => {
        axiosClient.get('/address')
            .then(({ data }) => {
                setAddress(data.data);

            })
            .catch(error => {
                console.error('Error fetching address:', error);

            });
    }


    return (
        <div className="container">
            <div className="">
                <div className="">
                    <h2 className="text-xl font-semibold mb-4">Thanh toán</h2>

                    <div>
                        <div>Địa chỉ giao hàng</div>
                        <div>
                            {user.name} - {user.phone} - {user.address}
                        </div>
                    </div>

                    <table className="min-w-full bg-white border border-gray-300 rounded-lg shadow-md">
                        <thead>
                            <tr className="bg-gray-200 text-gray-600 uppercase text-sm leading-normal">
                                <th className="py-1 px-6 text-left">Tên sản phẩm</th>
                                <th className="py-1 px-6 text-center">Hình ảnh</th>
                                <th className="py-1 px-6 text-center">Đơn giá</th>
                                <th className="py-1 px-6 text-center">Số lượng</th>
                                <th className="py-1 px-6 text-center">Thành tiền</th>
                            </tr>
                        </thead>
                        <tbody className="text-gray-700 text-sm">
                            {orderProduct.map((item, index) => (
                                <tr key={item.product_id} className="border-b border-gray-200 hover:bg-gray-100">
                                    <td className="py-1 px-6 text-left">
                                        {products.find(p => p.product_id === item.product_id)?.product_name}
                                    </td>
                                    <td className="py-1 px-6 text-center">
                                        <img
                                            src={images.find(image => image.product_id == item.product_id)?.image_value || 'N/A'}
                                            alt="product"
                                            className="w-[50px] h-auto max-w-xs mx-auto rounded-lg shadow-md object-cover transition duration-300 ease-in-out transform hover:scale-105"
                                        />
                                    </td>
                                    <td className="py-1 px-6 text-center">
                                        {new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(products.find(p => p.product_id === item.product_id)?.product_price)}
                                    </td>
                                    <td className="py-1 px-6 text-center">{item.cart_quantity}</td>

                                    <td className="py-1 px-6 text-center">
                                        {new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(products.find(p => p.product_id === item.product_id)?.product_price * item.cart_quantity)}
                                    </td>

                                </tr>
                            ))}
                        </tbody>
                    </table>


                </div>
            </div>
        </div>
    )
}