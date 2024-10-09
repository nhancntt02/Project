import { useEffect, useRef, useState } from "react"
import axiosClient from "../axios-client";
import { FaEdit, FaLeaf, FaTrash, FaTimes } from "react-icons/fa";
import AddSupplier from "./AddSupplier";
export default function Supplier() {
    const [supplier, setSupplier] = useState([]);
    const [isvisible, setIsvisible] = useState(false);
    const searchRef = useRef();
    useEffect(() => {
        getSupplier();
    }, []);

    const getSupplier = async () => {
        try {
            const res = await axiosClient.get('/suppliers');
            console.log(res.data.data);
            setSupplier(res.data.data);
        } catch (error) {
            console.log(error);
        }
    }

    const searchSupplier = () => {

    }

    const editSupplier = () => {

    }

    const deleteSupplier = async (supplier_id) => {
        try {
            const res = await axiosClient.delete(`/delete/supplier/${supplier_id}`);
            getSupplier();
        } catch (error) {
            console.log(error);
        }
    }

    const addSupplier = () => {
        setIsvisible(true);
    }

    return (
        <div className="container h-screen">
            <div className="h-[10%] border-b flex justify-center items-center bg-bgheader-200">
                <div className="text-bgheader-300 text-center text-4xl my-4 font-semibold">Quản lý nhà sản xuất</div>
            </div>
            <div className="m-2">
                <div>

                    <div className="flex justify-between items-center px-4">
                        <div className="text-2xl font-bold">
                            Danh sách nhà sản xuất
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
                                    onClick={searchSupplier}
                                    className="bg-blue-500 text-white p-2 rounded-lg hover:bg-blue-600"
                                >
                                    Tìm kiếm
                                </button>
                            </div>

                            <div className="flex items-center">
                                <button
                                    onClick={addSupplier}
                                    className="bg-blue-500 text-white p-2 rounded-lg shadow-md hover:bg-blue-600 transition duration-300"
                                >Thêm nhà sản xuất</button>
                            </div>


                        </div>
                    </div>
                    <div>
                        <div className="overflow-x-auto">
                            <table className="min-w-full border-collapse border border-gray-300 rounded">
                                <thead>
                                    <tr className="bg-blue-500 text-white">
                                        <th className="border border-gray-300 px-4 py-2">ID</th>
                                        <th className="border border-gray-300 px-4 py-2">Tên nhà sản xuất</th>
                                        <th className="border border-gray-300 px-4 py-2">Địa chỉ</th>
                                        <th className="border border-gray-300 px-4 py-2">Email</th>
                                        <th className="border border-gray-300 px-4 py-2">Số điện thoại</th>
                                        <th className="border border-gray-300 px-4 py-2 text-center">Hành động</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {
                                        supplier.map((item, index) => (
                                            <tr key={index} className="hover:bg-gray-100">
                                                <td className="border border-gray-300 px-4 py-2">{item.supplier_id}</td>
                                                <td className="border border-gray-300 px-4 py-2 font-bold">{item.supplier_name}</td>
                                                <td className="border border-gray-300 px-4 py-2">{item.supplier_address}</td>
                                                <td className="border border-gray-300 px-4 py-2">{item.supplier_email}</td>
                                                <td className="border border-gray-300 px-4 py-2">{item.supplier_phone}</td>
                                                <td className="border border-gray-300 px-4 py-2 text-center">
                                                    <button onClick={() => editSupplier(item.supplier_id)} className="text-yellow-500 hover:text-yellow-700">
                                                        <FaEdit />
                                                    </button>
                                                    <button onClick={() => deleteSupplier(item.supplier_id)} className="text-red-500 hover:text-red-700 ml-2">
                                                        <FaTrash />
                                                    </button>
                                                </td>
                                            </tr>
                                        ))
                                    }
                                </tbody>
                            </table>
                        </div>
                    </div>

                </div>
            </div>
            <div>
                {
                    isvisible && (
                        <div className="fixed inset-0 top-0 left-0 w-full h-full bg-gray-900 bg-opacity-50 z-10">

                            <div className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-white p-4 rounded shadow-md">
                                <div className="flex justify-end">
                                    <button onClick={() => {setIsvisible(false); getSupplier()}}>
                                        <FaTimes />
                                    </button>
                                </div>

                                <AddSupplier />
                            </div>
                        </div>
                    )
                }
            </div>
        </div>
    )
}