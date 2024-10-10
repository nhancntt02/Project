import { useEffect, useRef, useState } from "react"
import axiosClient from "../axios-client";
import { FaEdit, FaTrash, FaTimes, FaCheck } from "react-icons/fa";
import AddDiscount from "./AddDiscount";
export default function Discount() {
    const [discount, setDiscount] = useState([]);
    const [discounts, setDiscounts] = useState([]);
    const [isvisible, setIsvisible] = useState(false);
    const searchRef = useRef();

    useEffect(() => {
        getDisCount()
    }, [])

    const getDisCount = async () => {
        try {
            const { data } = await axiosClient.get('/discount');
            const filterDs = data.data.filter(i => i.ds_id != 0);

            console.log(filterDs);
            setDiscount(filterDs);
            setDiscounts(filterDs);
        } catch (error) {
            console.log(error);
        }
    }


    const removeVietnameseTones = (str) => {
        return str
            .normalize('NFD') 
            .replace(/[\u0300-\u036f]/g, '') 
            .replace(/[Đđ]/g, 'd'); 
    }

    const searchDiscount = () => {
        const search = removeVietnameseTones(searchRef.current.value.toLowerCase());

        if (data == "") {
            setSupplier(arr);
        } else {
            const filtered = arr.filter(item => removeVietnameseTones(item.supplier_name.toLowerCase()).includes(search));
            setSupplier(filtered);
        }
    }

    const addDiscount = () => {
        setIsvisible(true);
    }

    return (
        <div className="container h-screen">
            <div className="h-[10%] border-b flex justify-center items-center bg-bgheader-200">
                <div className="text-bgheader-300 text-center text-4xl my-4 font-semibold">Quản lý mã giảm giá</div>
            </div>
            <div className="m-2">
                <div>
                    <div className="flex justify-between items-center px-4">
                        <div className="text-2xl font-bold">
                            Danh sách tất cả mã giảm giá
                        </div>
                        <div className="my-4  flex gap-2">
                            <div className="flex items-center space-x-2">
                                <input
                                    type="text"
                                    placeholder=""
                                    className="p-2 border min-w-[100px] border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    ref={searchRef}
                                />
                                <button
                                    onClick={searchDiscount}
                                    className="bg-blue-500 text-white p-2 rounded-lg hover:bg-blue-600"
                                >
                                    Tìm kiếm
                                </button>
                            </div>
                            <div className="flex items-center">
                                <button
                                    onClick={() => addDiscount}
                                    className="bg-blue-500 text-white p-2 rounded-lg shadow-md hover:bg-blue-600 transition duration-300"
                                >Thêm mã giảm giá</button>
                            </div>
                        </div>
                    </div>
                    <div>
                        <div className="overflow-x-auto">
                            <table className="min-w-full table-auto border-collapse border border-gray-300 rounded-lg">
                                <thead>
                                    <tr className="bg-blue-600 text-left text-white">
                                        <th className="px-4 py-2 border border-gray-300">ID</th>
                                        <th className="px-4 py-2 border border-gray-300">Tên mã giảm giá</th>
                                        <th className="px-4 py-2 border border-gray-300">Mã giảm giá</th>
                                        <th className="px-4 py-2 border border-gray-300">Số lượng mã</th>
                                        <th className="px-4 py-2 border border-gray-300">Loại mã giảm giá</th>
                                        <th className="px-4 py-2 border border-gray-300">Giá trị</th>
                                        <th className="px-4 py-2 border border-gray-300">Ngày bắt đầu</th>
                                        <th className="px-4 py-2 border border-gray-300">Ngày hết hạn</th>
                                        <th className="px-4 py-2 border border-gray-300">Trạng thái</th>
                                        <th className="px-4 py-2 border border-gray-300">Thao tác</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {
                                        discount.map((item, index) => {
                                            const currentDate = new Date();
                                            const endDate = new Date(item.ds_end);

                                            let status;
                                            if (item.ds_quantity <= 0) {
                                                status = <span className="text-red-500 ">Hết số lượng</span>;
                                            } else if (currentDate > endDate) {
                                                status = <span className="text-red-500 ">Hết hạn</span>;
                                            } else {
                                                status = <span className="text-green-500 ">Khả dụng</span>;
                                            }

                                            return (
                                                <tr key={index} className="hover:bg-gray-100">
                                                    <td className="px-4 py-2 border border-gray-300">{item.ds_id}</td>
                                                    <td className="px-4 py-2 font-bold border border-gray-300">{item.ds_name}</td>
                                                    <td className="px-4 py-2 border border-gray-300">{item.ds_code}</td>
                                                    <td className="px-4 py-2 border border-gray-300">{item.ds_quantity}</td>
                                                    <td className="px-4 py-2 border border-gray-300">{item.ds_type}</td>
                                                    <td className="px-4 py-2 border text-red-500 border-gray-300">{item.ds_type == 'Giảm giá theo tiền' ? new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(item.ds_value) : (item.ds_value * 100) + '%'}</td>
                                                    <td className="px-4 py-2 border text-center border-gray-300">{item.ds_start}</td>
                                                    <td className="px-4 py-2 border text-center border-gray-300">{item.ds_end}</td>
                                                    <td className="px-4 py-2 border font-bold border-gray-300">{status}</td>
                                                    <td className="px-4 py-2 border border-gray-300 text-center">
                                                        <button onClick={() => { }} className="text-yellow-500 hover:text-yellow-700 focus:outline-none mr-2">
                                                            <FaEdit />
                                                        </button>
                                                        <button onClick={() => { }} className="text-red-500 hover:text-red-700 focus:outline-none">
                                                            <FaTrash />
                                                        </button>
                                                    </td>
                                                </tr>
                                            );
                                        })
                                    }
                                </tbody>
                            </table>
                        </div>

                    </div>
                </div>
                <div>
                    <AddDiscount/>
                </div>
            </div>
        </div>
    )
}