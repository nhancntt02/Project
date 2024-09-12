import { useEffect, useRef, useState } from "react";
import axiosClient from "../axios-client";
import { useLocation, useParams } from "react-router-dom";
import { useStateContext } from "../contexts/ContextProvider";
import { FaMapMarkerAlt, FaPlus } from 'react-icons/fa';
export default function Checkout() {
    const [orderProduct, setOrderProduct] = useState([]);
    const [images, setImages] = useState([]);
    const { user, products, setCart } = useStateContext();
    const location = useLocation();
    const [loading, setLoading] = useState(true);
    const data = location.state;
    const [address, setAddress] = useState([]);
    const [addressP, setAddressP] = useState([]);
    const [changeAddress, setChangeAddress] = useState(false);
    const [formAddress, setFormAddress] = useState(false);
    const userId = localStorage.getItem('userId');
    const noteRef = useRef();
    const phuongRef = useRef();
    const quanRef = useRef();
    const tinhRef = useRef();
    const macdinhRef = useRef();
    const phoneRef = useRef();

    const [selectedAddressIndex, setSelectedAddressIndex] = useState(null);
    const [editAddressId, setEditAddressId] = useState(null);

    useEffect(() => {
        if (data.order_product) {
            setOrderProduct(data.order_product);
        }
        getImages();
        getAddress();
    }, [])


    const getImages = () => {
        setLoading(false);
        axiosClient.get('/images')
            .then(({ data }) => {
                setImages(data.data);

            })
            .catch(error => {
                console.error('Error fetching image:', error);

            });
    }

    const getAddress = async () => {
        setLoading(false); // Start loading

        try {
            const res = await axiosClient.get(`/address/user/${userId}`);
            const data = res.data.data;
            console.log(data);
            setAddress(data);
            if (data.length == 0) {
                setFormAddress(true);
            }

            setLoading(true);
        } catch (error) {
            console.log('Error fetching address:', error);
            setLoading(true);
        }
    };

    useEffect(() => {
        // if (address) {
        //     setLoading(true);
        // }
        const primaryIndex = address.findIndex(item => item.address_primary === 1);
        setAddressP(primaryIndex);

        if (primaryIndex !== -1) {
            setSelectedAddressIndex(primaryIndex);

        }
    }, [address]);


    const addAddress = async () => {
        const payload = {
            address_note: noteRef.current.value,
            address_phuong: phuongRef.current.value,
            address_quan: quanRef.current.value,
            address_tinh: tinhRef.current.value,
            user_id: userId,
            address_primary: macdinhRef.current.checked ? 1 : 0,
            address_phone: phoneRef.current.value
        }
        console.log(payload);
        try {
            const res = await axiosClient.post(`/add/address`, payload);
            setFormAddress(false);
            getAddress();
            setChangeAddress(true);
        } catch (error) {
            console.log(error);
        }
    }



    const handleRadioChange = (selectedIndex) => {
        // Update the address array so only the selected address has `address_primary: 1`
        const updatedAddress = address.map((item, index) => ({
            ...item,
            address_primary: index === selectedIndex ? 1 : 0,
        }));

        setAddress(updatedAddress); // Update the state
    };

    const editAddress = (index) => {
        // Get the address item at the specified index
        const addressEdit = address[index];
       
        if (addressEdit) {
            setEditAddressId(addressEdit.address_id);
            //console.log(addressEdit.address_id);
            // Update form fields with the address details
            if (noteRef.current) noteRef.current.value = addressEdit.address_note;
            if (phuongRef.current) phuongRef.current.value = addressEdit.address_phuong;
            if (quanRef.current) quanRef.current.value = addressEdit.address_quan;
            if (tinhRef.current) tinhRef.current.value = addressEdit.address_tinh;
            if (phoneRef.current) phoneRef.current.value = addressEdit.address_phone;
            if (macdinhRef.current) macdinhRef.current.checked = addressEdit.address_primary === 1;
            if(addressEdit.address_primary == 1) {
                const pri = document.getElementById('macdinh');
                pri.style.display = "none";
            } else {
                const pri = document.getElementById('macdinh');
                pri.style.display = "flex";
            }
            // Show the form
            const show = document.getElementById('edit');
            show.style.display = 'flex';

        }
    };

    const updateAddress = async () => {
        const payload = {
            address_note: noteRef.current.value,
            address_phuong: phuongRef.current.value,
            address_quan: quanRef.current.value,
            address_tinh: tinhRef.current.value,
            user_id: userId,
            address_primary: macdinhRef.current.checked ? 1 : 0,
            address_phone: phoneRef.current.value
        }
        console.log(payload);
        try {
            await axiosClient.put(`/update/address/${editAddressId}`, payload);
            getAddress();
        } catch (error) {
            console.log(error);
        }
    }

    return (
        <div className="container">
            {loading && (<div className="h-[80vh]">
                <div className="">
                    <h2 className="text-xl font-semibold mb-4">Thanh toán</h2>

                    <div>
                        <div className="text-xl text-blue-500 flex gap-2 items-center"><FaMapMarkerAlt className="" /> <div>Địa chỉ giao hàng</div> </div>
                        <div className="flex gap-4 text-lg mt-4">
                            <div className="font-bold">
                                {user.name} {address[addressP]?.address_phone}
                            </div>
                            <div>
                                {

                                    <div>
                                        {address[addressP]?.address_note}, {address[addressP]?.address_phuong}, {address[addressP]?.address_quan}, {address[addressP]?.address_tinh}
                                    </div>

                                }
                            </div>
                            <div>
                                <button onClick={() => { setChangeAddress(true) }} className="text-blue-500">Thay đổi</button>
                            </div>
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
            )}
            {
                changeAddress && (
                    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
                        <div className="bg-white p-6 rounded-lg shadow-xl space-y-4 w-[500px] h-[600px]">
                            <div className="text-gray-800 text-2xl font-medium">
                                Địa chỉ của tôi
                            </div>
                            <div className="border-t-2"></div>
                            <div>
                                {
                                    address?.length > 0 ?
                                        (
                                            <div>
                                                {address.map((item, index) => (
                                                    <div className="border-b py-4" key={index}>
                                                        <div className="flex justify-between">
                                                            {/* Radio Input for Primary Address */}
                                                            <div className="flex">
                                                                <div className="mr-4">
                                                                    <input
                                                                        type="radio"
                                                                        checked={selectedAddressIndex === index}
                                                                        onChange={() => {
                                                                            setSelectedAddressIndex(index);
                                                                            setAddressP(index);
                                                                        }}
                                                                        className="text-blue-500 focus:ring focus:ring-blue-300 rounded-full"
                                                                    />
                                                                </div>


                                                                <div className="flex flex-col">
                                                                    <div className="flex gap-2 border-b pb-2">
                                                                        <div className="font-medium text-gray-700">{user.name}</div>
                                                                        <div className="text-gray-500">{item.address_phone}</div>
                                                                    </div>


                                                                    <div className="mt-2">
                                                                        <div className="text-gray-600">{item.address_note}</div>
                                                                        <div className="text-gray-600">
                                                                            {item.address_phuong}, {item.address_quan}, {item.address_tinh}
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                            <div>
                                                                <button onClick={() => {
                                                                    setChangeAddress(false);
                                                                    editAddress(index);



                                                                }} className="text-blue-500">Cập nhật</button>
                                                            </div>

                                                        </div>
                                                        {item.address_primary ? (
                                                            <div className="w-fit text-sm text-green-500 border border-green-500 px-1">
                                                                Địa chỉ mặc định
                                                            </div>) : (
                                                            <div></div>
                                                        )}
                                                    </div>
                                                ))}

                                            </div>
                                        ) : (
                                            <div>
                                                Bạn chưa có địa chỉ nào cụ thể hãy thêm mới
                                            </div>
                                        )
                                }
                            </div>
                            <div onClick={() => {
                                setChangeAddress(false);
                                setFormAddress(true);
                            }} className=" w-fit border border-gray-400 py-2 px-4 text-gray-400 text-lg flex gap-2 items-center hover:cursor-pointer hover:text-gray-500 hover:border-gray-500">
                                <FaPlus /> <div>Thêm địa chỉ mới</div>
                            </div>

                            <div className="border-t-2"></div>
                            <button
                                className="bg-blue-500 hover:bg-blue-600 text-white  px-4 py-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
                                onClick={() => {
                                    setChangeAddress(false);
                                }}
                            >
                                Ok
                            </button>
                        </div>
                    </div>

                )
            }
            {
                formAddress && (
                    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
                        <div className="bg-white p-6 rounded-lg shadow-xl space-y-4 w-[500px] h-[500px]">
                            <div className="text-gray-800 text-2xl font-medium">
                                Thêm địa chỉ mới
                            </div>
                            <div className="border-t-2"></div>
                            <div>
                                <label className="block mb-2">
                                    Ghi chú:
                                    <input
                                        type="text"
                                        ref={noteRef}
                                        className="w-full px-4 py-2 text-gray-700 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
                                        placeholder="Nhập ghi chú"
                                    />
                                </label>
                                <div className="flex justify-between">
                                    <label className="block mb-2">
                                        Xã/ Phường:
                                        <input
                                            type="text"
                                            ref={phuongRef}
                                            className=" px-4 py-2 text-gray-700 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
                                            placeholder="Nhập phường"
                                        />
                                    </label>
                                    <label className="block mb-2">
                                        Huyện/ Quận:
                                        <input
                                            type="text"
                                            ref={quanRef}
                                            className="px-4 py-2 text-gray-700 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
                                            placeholder="Nhập quận"
                                        />
                                    </label>

                                </div>
                                <div className="flex gap-2 items-center mb-2">
                                    <label className="  ">
                                        Tỉnh/ Thành Phố:
                                    </label>
                                    <input
                                        type="text"
                                        ref={tinhRef}
                                        className=" w-[75%] px-4 py-2 text-gray-700 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
                                        placeholder="Nhập tỉnh"
                                    />
                                </div>
                                <div className="flex gap-2 items-center mb-2">
                                    <label className="  ">
                                        Số điện thoại:
                                    </label>
                                    <input
                                        type="text"
                                        ref={phoneRef}
                                        className="w-[75%] px-4 py-2 text-gray-700 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
                                        placeholder="Nhập số điện thoại liên hệ"
                                    />
                                </div>
                                <div className="flex gap-1 items-center mt-2">
                                    <label className="block mb-2">
                                        Địa chỉ mặc định:
                                    </label>
                                    <input
                                        type="checkbox"
                                        ref={macdinhRef}
                                        defaultChecked={address?.length === 0}
                                        className="w-4 h-4 text-blue-600 bg-gray-100 rounded border-gray-300 focus:ring-blue-400"
                                    />
                                </div>
                            </div>
                            <div className="border-t-2"></div>
                            <button
                                className="bg-blue-500 hover:bg-blue-600 text-white  px-4 py-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
                                onClick={() => {
                                    addAddress();



                                }}
                            >
                                Xác nhận
                            </button>
                            {
                                address.length > 0 && (
                                    <button 
                                    className="bg-blue-500 hover:bg-blue-600 text-white  px-4 py-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
                                    onClick={() => setFormAddress(false)}
                                    >Hủy</button>
                                )
                            }
                        </div>
                    </div>

                )
            }
                    <div id="edit" className="hidden fixed inset-0 items-center justify-center bg-black bg-opacity-50">
                        <div className="bg-white p-6 rounded-lg shadow-xl space-y-4 w-[500px] h-[500px]">
                            <div className="text-gray-800 text-2xl font-medium">
                                Chỉnh sửa địa chỉ
                            </div>
                            <div className="border-t-2"></div>
                            <div>
                                <label className="block mb-2">
                                    Ghi chú:
                                    <input
                                        type="text"
                                        ref={noteRef}
                                        className="w-full px-4 py-2 text-gray-700 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
                                        placeholder="Nhập ghi chú"
                                    />
                                </label>
                                <div className="flex justify-between">
                                    <label className="block mb-2">
                                        Xã/ Phường:
                                        <input
                                            type="text"
                                            ref={phuongRef}
                                            className=" px-4 py-2 text-gray-700 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
                                            placeholder="Nhập phường"
                                        />
                                    </label>
                                    <label className="block mb-2">
                                        Huyện/ Quận:
                                        <input
                                            type="text"
                                            ref={quanRef}
                                            className="px-4 py-2 text-gray-700 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
                                            placeholder="Nhập quận"
                                        />
                                    </label>

                                </div>
                                <div className="flex gap-2 items-center mb-2">
                                    <label className="  ">
                                        Tỉnh/ Thành Phố:
                                    </label>
                                    <input
                                        type="text"
                                        ref={tinhRef}
                                        className=" w-[75%] px-4 py-2 text-gray-700 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
                                        placeholder="Nhập tỉnh"
                                    />
                                </div>
                                <div className="flex gap-2 items-center mb-2">
                                    <label className="  ">
                                        Số điện thoại:
                                    </label>
                                    <input
                                        type="text"
                                        ref={phoneRef}
                                        className="w-[75%] px-4 py-2 text-gray-700 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
                                        placeholder="Nhập số điện thoại liên hệ"
                                    />
                                </div>
                                <div id="macdinh" className="flex gap-1 items-center mt-2">
                                    <label className="block mb-2">
                                        Địa chỉ mặc định:
                                    </label>
                                    <input
                                        type="checkbox"
                                        ref={macdinhRef}
                                        defaultChecked={address?.length === 0}
                                        className="w-4 h-4 text-blue-600 bg-gray-100 rounded border-gray-300 focus:ring-blue-400"
                                    />
                                </div>
                            </div>
                            <div className="border-t-2"></div>
                            <button
                                className="bg-blue-500 hover:bg-blue-600 text-white  px-4 py-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
                                onClick={() => {

                                    const show = document.getElementById('edit');
                                    show.style.display = 'none';

                                    updateAddress();

                                    

                                }}
                            >
                                Xác nhận
                            </button>
                            {
                                address.length > 0 && (
                                    <button 
                                    className="bg-blue-500 hover:bg-blue-600 text-white  px-4 py-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
                                    onClick={() => {
                                        const show = document.getElementById('edit');
                                        show.style.display = 'none';
                                    }}
                                    >Hủy</button>
                                )
                            }
                        </div>
                    </div>

        </div>
    )
}