import { useEffect, useRef, useState } from "react";
import axiosClient from "../axios-client";
import { Link } from "react-router-dom"

import { FaPlus, FaMinus, FaLeaf } from "react-icons/fa";
import { useStateContext } from "../contexts/ContextProvider";

export default function Cart() {
    const [cart, setCarts] = useState([]);
    const [images, setImages] = useState([]);
    const [editCheck, setEditCheck] = useState(false);
    const [cartQuantity, setCartQuantity] = useState(0);
    const quantityRef = useRef(null);
    const [productEdit, setProductEdit] = useState(null);
    const { products, setCart } = useStateContext();
    const user_id = localStorage.getItem('userId');
    const [totalSelectedProducts, setTotalSelectedProducts] = useState(0);
    const [totalAmount, setTotalAmount] = useState(0);
    const [redurePrice, setRedurePrice] = useState(0);
    const [discounts, setDiscounts] = useState([]);
    const discountRef = useRef();
    const addressRef = useRef();
    const paymentRef = useRef();
    const [address, setAddress] = useState([]);
    const [payment, setPayment] = useState([]);
    const [isOpen, setIsOpen] = useState(false);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        getCart();
        getImages();
        getDiscount();
    }, []);

    const getCart = async () => {
        setLoading(true);
        try {
            const res = await axiosClient.get(`/cart/${user_id}`);
            const updatedCart = res.data.data.map(item => ({
                ...item,
                selected: false
            }));
            setCarts(updatedCart);
            localStorage.setItem('sl', res.data.data.length);
            setLoading(false);
        } catch (error) {
            console.log(error);
            setLoading(false);
        }
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
                setLoading(false);
            });
    }

    const getAddress = async () => {
        setLoading(true);
        const res = await axiosClient.get(`/address/user/${user_id}`);
        setAddress(res.data.data);
        setLoading(false);
    }

    const getDiscount = async () => {
        setLoading(true);
        try {
            const res = await axiosClient.get('/discount');
            setDiscounts(res.data.data);
            setLoading(false);
        } catch (error) {
            console.log(error.message);
            setLoading(false);
        }

    }

    const getPayment = async () => {
        setLoading(true);
        const res = await axiosClient.get(`/payments`);
        setPayment(res.data.data);
        setLoading(false);
    }

    const editCart = (product_id, cart_quantity) => {
        setCartQuantity(cart_quantity);
        setProductEdit(product_id);
        setEditCheck(!editCheck);
    }

    const saveCart = (product_id) => {
        const payload = {
            product_id: product_id,
            user_id: user_id,
            cart_quantity: quantityRef.current.value,
        };
        axiosClient.put('/update/cart', payload)
            .then(() => {
                getCart();
                setProductEdit("");
                setEditCheck(!editCheck);
            })
    }

    const cancelEdit = () => {
        setProductEdit("");
        setEditCheck(!editCheck);
    }

    const deleteCart = (product_id) => {
        axiosClient.delete(`/delete/cart/${product_id}/${user_id}`);
        getCart();
        setCart();
    }

    const plusQ = () => {
        setCartQuantity(prev => prev + 1);
    }

    const minusQ = () => {
        if (cartQuantity > 1) {
            setCartQuantity(prev => prev - 1);
        }
    }

    const handleSelectProduct = (index) => {
        const updatedCart = [...cart];
        updatedCart[index].selected = !updatedCart[index].selected;
        setCarts(updatedCart);
        updateTotals(updatedCart);
    }

    const updateTotals = (updatedCart) => {
        const selectedItems = updatedCart.filter(item => item.selected);
        setTotalSelectedProducts(selectedItems.length);

        const total = selectedItems.reduce((sum, item) => {
            const product = products.find(p => p.product_id === item.product_id);
            return sum + (product ? product.product_price * item.cart_quantity : 0);
        }, 0);

        setTotalAmount(total);
    }

    const handleSelectAll = (e) => {
        const updatedCart = cart.map(item => ({
            ...item,
            selected: e.target.checked
        }));
        setCarts(updatedCart);
        updateTotals(updatedCart);
    }

    const handleDiscountChange = (event) => {
        const selectedId = event.target.value;
        const selectedDiscount = discounts.find(d => d.ds_id == selectedId);
        if (selectedDiscount) {
            const price = totalAmount * selectedDiscount.ds_value
            setRedurePrice(price);
        } else {
            setRedurePrice(0);
        }
    };

    const createOrder = async (ev) => {

        ev.preventDefault();
        setIsOpen(false);

        const now = new Date();
        const payload = {
            order_date_create: now.toISOString().substr(0, 10),
            order_product_money: totalAmount,
            order_discount_money: redurePrice,
            order_total_money: totalAmount - redurePrice,
            order_status: "Khởi tạo",
            address_id: addressRef.current.value,
            user_id: localStorage.getItem('userId'),
            payment_id: paymentRef.current.value,
            ds_id: discountRef.current.value,
            shipper_id: 1
        };

        try {
            const res = await axiosClient.post('/add/order', payload);
            const order = res.data.data;
            const orderCart = cart.filter(c => c.selected == true);
            orderCart.forEach(async (cart, index) => {
                const payload2 = {
                    order_id: order.order_id,
                    product_id: cart.product_id,
                    io_quantity: cart.cart_quantity,
                    io_price: products.find(p => p.product_id === cart.product_id)?.product_price
                }
                try {
                    await axiosClient.post('/add/info/order', payload2);
                    await axiosClient.delete(`/delete/cart/${cart.product_id}/${user_id}`);
                } catch (error) {
                    console.log('Loi khi nhap thong tin order', error);
                }

            })

            getCart();
        } catch (error) {
            console.log(error);
        }






    }
    return (
        <div className="">
            {
                loading ? (
                    <div></div>
                ) :
                    (
                        <div>
                            <div>
                                <div className="py-4">
                                    <h2 className="text-center text-3xl text-gray-700">Giỏ hàng của bạn</h2>
                                </div>
                                {
                                    cart.length > 0 ? (
                                        <div>
                                            <table className="min-w-full bg-white border border-gray-300 rounded-lg shadow-md">
                                                <thead>
                                                    <tr className="bg-gray-200 text-gray-600 uppercase text-sm leading-normal">
                                                        <th className="py-1 px-6 text-left">
                                                            <input
                                                                type="checkbox"
                                                                id="selectAll"
                                                                onChange={handleSelectAll}
                                                            />
                                                        </th>
                                                        <th className="py-1 px-6 text-left">Tên sản phẩm</th>
                                                        <th className="py-1 px-6 text-center">Hình ảnh</th>
                                                        <th className="py-1 px-6 text-center">Đơn giá</th>
                                                        <th className="py-1 px-6 text-center">Số lượng</th>
                                                        <th className="py-1 px-6 text-center">Số tiền</th>
                                                        <th className="py-1 px-6 text-center">Thao tác</th>
                                                    </tr>
                                                </thead>
                                                <tbody className="text-gray-700 text-sm">
                                                    {cart.map((item, index) => (
                                                        <tr key={item.product_id} className="border-b border-gray-200 hover:bg-gray-100">
                                                            <td className="py-1 px-6 text-left whitespace-nowrap">
                                                                <input
                                                                    type="checkbox"
                                                                    checked={item.selected}
                                                                    onChange={() => handleSelectProduct(index)}
                                                                />
                                                            </td>
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
                                                            {editCheck && (productEdit == item.product_id) ? (
                                                                <td className="py-1 px-6 text-center">
                                                                    <div className="flex justify-between items-center">
                                                                        <FaPlus onClick={plusQ} className="hover:cursor-pointer" />
                                                                        <div className="flex justify-center">
                                                                            <input
                                                                                type="text"
                                                                                className="w-[40px] text-center border border-gray-300 rounded-md"
                                                                                ref={quantityRef}
                                                                                value={cartQuantity}
                                                                                readOnly
                                                                            />
                                                                        </div>
                                                                        <FaMinus onClick={minusQ} className="hover:cursor-pointer" />
                                                                    </div>
                                                                </td>
                                                            ) : (
                                                                <td className="py-1 px-6 text-center">{item.cart_quantity}</td>
                                                            )}
                                                            {editCheck && (productEdit == item.product_id) ? (
                                                                <td className="py-1 px-6 text-center">
                                                                    {new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(products.find(p => p.product_id === item.product_id)?.product_price * cartQuantity)}
                                                                </td>
                                                            ) : (
                                                                <td className="py-1 px-6 text-center">
                                                                    {new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(products.find(p => p.product_id === item.product_id)?.product_price * item.cart_quantity)}
                                                                </td>
                                                            )}
                                                            <td className="py-1 px-6 text-center">
                                                                {editCheck && (productEdit == item.product_id) ? (
                                                                    <>
                                                                        <button onClick={() => saveCart(item.product_id, item.cart_quantity)} className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 mr-3 rounded transition duration-300 ease-in-out">
                                                                            Lưu
                                                                        </button>
                                                                        <button onClick={cancelEdit} className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded transition duration-300 ease-in-out">
                                                                            Hủy
                                                                        </button>
                                                                    </>
                                                                ) : (
                                                                    <>
                                                                        <button onClick={() => editCart(item.product_id, item.cart_quantity)} className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 mr-3 rounded transition duration-300 ease-in-out">
                                                                            Sửa
                                                                        </button>
                                                                        <button onClick={() => deleteCart(item.product_id)} className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded transition duration-300 ease-in-out">
                                                                            Xóa
                                                                        </button>
                                                                    </>
                                                                )}
                                                            </td>
                                                        </tr>
                                                    ))}
                                                </tbody>
                                            </table>
                                            <div className="mt-6 bg-gray-100 p-4 rounded-lg shadow-md">
                                                <div className="flex justify-end gap-10 items-center mb-4">
                                                    <div className="text-gray-700 font-sans">
                                                        Số tiền giảm: <span>{new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(redurePrice)}</span>
                                                    </div>
                                                    <select
                                                        onChange={(e) => handleDiscountChange(e)}
                                                        className=""
                                                        name=""
                                                        id=""
                                                        ref={discountRef}
                                                    >
                                                        <option value="0">Chọn mã giảm giá</option>
                                                        {
                                                            discounts.map(d => {
                                                                if (d.ds_id > 0)
                                                                    return (
                                                                        <option key={d.ds_id} value={d.ds_id}>{d.ds_name}</option>
                                                                    )
                                                            }
                                                            )
                                                        }
                                                    </select>
                                                </div>
                                                <div className="flex justify-between items-center mb-4">
                                                    <div className="text-gray-700 font-bold">
                                                        Số sản phẩm đã chọn: <span>{totalSelectedProducts}</span>
                                                    </div>
                                                    <div className="text-gray-700 font-bold">
                                                        Tổng số tiền: <span>{new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(totalAmount)}</span>
                                                    </div>
                                                </div>
                                                <div className="flex justify-end">
                                                    <button
                                                        onClick={() => {
                                                            getAddress();
                                                            getPayment();
                                                            setIsOpen(true);
                                                        }}
                                                        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-6 rounded transition duration-300 ease-in-out"
                                                    >
                                                        Tạo đơn hàng
                                                    </button>
                                                </div>
                                            </div>
                                        </div>
                                    ) : (
                                        <div className="flex justify-center items-center gap-4 bg-gray-100 p-6 rounded-lg shadow-md">
                                            <p className="text-lg font-medium text-gray-700">Bạn chưa có sản phẩm nào trong giỏ hàng</p>
                                            <Link
                                                to="/"
                                                className="text-blue-500 hover:text-blue-700 hover:underline hover:decoration-blue-700 font-semibold transition duration-300"
                                            >
                                                Hãy đến mua sản phẩm
                                            </Link>
                                        </div>


                                    )
                                }


                            </div>
                            {
                                isOpen && (
                                    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
                                        <div className="bg-white p-6 rounded-lg shadow-lg max-w-md w-full">
                                            <h2 className="text-xl font-semibold mb-4">Thêm thông tin đơn hàng</h2>
                                            <div className="mb-4">
                                                <select name="" id="" ref={addressRef} className="ct-select-1">
                                                    <option value="">Hãy chọn địa chỉ giao hàng</option>
                                                    {
                                                        address.map(a => (
                                                            <option key={a.address_id} value={a.address_id}>{a.address_note} - {a.address_phuong} - {a.address_quan} - {a.address_tinh}</option>
                                                        ))
                                                    }
                                                </select>
                                            </div>
                                            <div className="mb-4">
                                                <select name="" id="" ref={paymentRef} className="ct-select-1">
                                                    <option value="">Hãy chọn phương thức thanh toán</option>
                                                    {
                                                        payment.map(a => (
                                                            <option key={a.payment_id} value={a.payment_id}>{a.payment_name}</option>
                                                        ))
                                                    }
                                                </select>
                                            </div>
                                            <div className="flex justify-between">
                                                <button
                                                    className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
                                                    onClick={createOrder}
                                                >
                                                    Xác nhận
                                                </button>
                                                <button
                                                    className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
                                                    onClick={() => setIsOpen(false)}
                                                >
                                                    Hủy
                                                </button>
                                            </div>

                                        </div>
                                    </div>
                                )
                            }
                        </div>
                    )
            }


        </div>
    );
}
