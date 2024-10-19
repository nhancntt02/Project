import { useState } from "react"
import axiosClient from "../axios-client";
import { useEffect } from "react";
import { useRef } from "react";
import { FaLock, FaLockOpen, FaRegEye } from "react-icons/fa";
export default function Customer() {
    const [customers, setCustomers] = useState([]);
    const [arr, setArr] = useState([]);
    const [address, setAddress] = useState([]);
    const [img, setImg] = useState([]);
    const searchRef = useRef();
    const [currentPage, setCurrentPage] = useState(1);
    const customersPerPage = 4;

    useEffect(() => {
        getCustomer();
        getAddress();
    }, []);

    const getCustomer = async () => {
        const res = await axiosClient.get('/customers');
        setCustomers(res.data);
        setArr(res.data);
    }

    const getAddress = async () => {
        const res = await axiosClient.get('/address');
        setAddress(res.data);

    }

    const totalPages = Math.ceil(customers.length / customersPerPage);

    // Get the customers for the current page
    const indexOfLastCustomer = currentPage * customersPerPage;
    const indexOfFirstCustomer = indexOfLastCustomer - customersPerPage;
    const currentCustomers = customers.slice(indexOfFirstCustomer, indexOfLastCustomer);

    const nextPage = () => {
        if (currentPage < totalPages) setCurrentPage(currentPage + 1);
    };

    const prevPage = () => {
        if (currentPage > 1) setCurrentPage(currentPage - 1);
    };


    const lockAccount = (id) => {
        // Create a copy of the original array to maintain immutability
        const updateCustomer = arr.map(emp => {
            if (emp.id === id) {

                // Create a copy of the employee object and update status_lock
                return {
                    ...emp,
                    status_lock: 1
                };
            }
            return emp; // Return unchanged employee if ID doesn't match
        });


        // Update the state with the new array
        setCustomers(updateCustomer);
        axiosClient.put(`/update/user/${id}`, updateCustomer)
            .then(
                setArr(updateCustomer)
            )

    };


    const openAccount = (id) => {
        // Create a copy of the original array to maintain immutability
        const updateCustomer = arr.map(emp => {
            if (emp.id === id) {

                // Create a copy of the employee object and update status_lock
                return {
                    ...emp,
                    status_lock: 0
                };
            }
            return emp; // Return unchanged employee if ID doesn't match
        });

        // Update the state with the new array
        setCustomers(updateCustomer);
        axiosClient.put(`/update/user/${id}`, updateCustomer)
            .then(
                setArr(updateCustomer)
            )
    };


    useEffect(() => {
        const fetchImages = async () => {
            if (arr && arr.length > 0) {
                const customerIds = arr.map(e => e.id);
                console.log(customerIds)

                try {
                    // Gọi API để lấy danh sách tên file tương ứng với employee_id
                    const response = await axiosClient.post('/files/employees', {
                        employee_ids: customerIds
                    });
                    console.log(response.data);
                    // Tạo mảng các promise để tải ảnh
                    const dataPromises = response.data.map(async (file) => {
                        const imageResponse = await axiosClient.get(`/file/${file.file_name}`, {
                            responseType: 'blob', // Tải ảnh dưới dạng blob
                        });
                        const imageUrl = URL.createObjectURL(imageResponse.data); // Tạo URL từ blob
                        return {
                            employee_id: file.employee_id,
                            imageUrl, // URL của ảnh được tạo từ blob
                        };
                    });

                    const imageData = await Promise.all(dataPromises); // Chờ tất cả các ảnh được tải về
                    console.log(imageData);
                    setImg(imageData); // Lưu URL ảnh vào state
                } catch (error) {
                    console.error('Error fetching images:', error);
                }
            }
        };

        fetchImages();
    }, [arr]);

    return (
        <div className="container h-screen bg-bgheader-400">
            <div className="h-[10%] border-b flex justify-center items-center bg-bgheader-200">
                <div className="text-bgheader-300 text-center text-4xl my-4 font-semibold">Quản lý khách hàng</div>
            </div>
            <div className="p-4">
                <div className="flex justify-between my-4 items-center border px-4 bg-white rounded">
                    <div className="text-2xl font-bold py-4">
                    Danh sách tất cả nhân viên
                    </div>
                    <div className="flex gap-4">
                        <input
                            type="text"
                            placeholder=""
                            className="p-2 border min-w-[300px] border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                            ref={searchRef}
                        />
                        <button
                            onClick={() => {}}
                            className="bg-blue-500 text-white p-2 rounded-lg hover:bg-blue-600"
                        >
                            Tìm kiếm
                        </button>
                    </div>
                </div>
                <div>
                    <table className="w-full bg-white">
                        <thead>
                            <tr className="bg-yellow-500 text-white uppercase text-sm leading-normal border-b border-gray-300">
                                <th className="py-3 px-1  text-center border-r border-gray-200">ID</th>
                                <th className="p-3  text-left border-r border-gray-200">Tên</th>
                                <th className="p-3  text-center border-r border-gray-200">Avatar</th>
                                <th className="p-3  text-left border-r border-gray-200">Email</th>
                                <th className="p-3  text-center border-r border-gray-200">Số điện thoại</th>
                                <th className="p-3  text-center border-r border-gray-200">Địa chỉ</th>
                                <th className="p-3  text-center border-r border-gray-200">Trạng thái</th>
                                <th className="py-3 px-1  text-center">Hành động</th>
                            </tr>
                        </thead>
                        <tbody className="text-gray-600 text-sm font-light">
                            {
                                currentCustomers.map((item, index) => (
                                    <tr key={index} className="border-b border-gray-200 hover:bg-gray-100">
                                        <td className="py-3 px-6 text-left border-r border-gray-200 whitespace-nowrap">
                                            {item.id}
                                        </td>
                                        <td className="p-3 text-left border-r font-bold border-gray-200">
                                            {item.name}
                                        </td>
                                        <td className="border-r border-gray-200 p-2">
                                            <div className=" mx-auto">
                                                <img src={img.find(i => i.employee_id == item.id)?.imageUrl} alt="" className="h-20 w-20 border rounded-full object-cover" />
                                            </div>
                                        </td>
                                        <td className="py-3 px-6 text-left border-r border-gray-200">
                                            {item.email}
                                        </td>

                                        <td className="py-3 px-6 text-left border-r border-gray-200">
                                            {item.phone}
                                        </td>
                                        <td className="p-3 text-left border-r border-gray-200">
                                            <select name="" id="">
                                                {
                                                    // Filter addresses for the current item and map them to options
                                                    address.length > 0 && (address
                                                        ?.filter(a => a.user_id === item.id) // Use strict equality
                                                        .map((add, index) => (
                                                            <option key={index} value={add.id}> {/* Use a unique value */}
                                                                {add.address_note} - {add.address_phuong} - {add.address_quan} - {add.address_tinh}
                                                            </option>
                                                        ))
                                                    )
                                                }
                                            </select>
                                        </td>
                                        {
                                            item.status_lock == 1 ? (
                                                <td className="py-3 px-6 text-center border-r border-gray-200">
                                                    <span className="bg-slate-700 text-white py-1 px-2 rounded font-semibold text-nowrap">Đang khóa</span>
                                                </td>
                                            ) : (
                                                <td className="py-3 px-6 text-center border-r border-gray-200 ">
                                                    <span className="bg-green-600 text-white py-1 px-2 rounded font-semibold text-nowrap"> Hoạt động</span>
                                                </td>
                                            )
                                        }
                                        <td className="py-3 px-6 text-left border-r border-gray-200">
                                            <div className="flex text-xl justify-center gap-6">
                                                {
                                                    item.id != 1 && (
                                                        item.status_lock == 1 ? (
                                                            <FaLockOpen onClick={() => { openAccount(item.id) }} className="text-blue-500 hover:cursor-pointer" />
                                                        ) : (
                                                            <FaLock onClick={() => { lockAccount(item.id) }} className="text-red-500 hover:cursor-pointer" />
                                                        )
                                                    )
                                                }
                                            </div>
                                        </td>
                                    </tr>
                                ))
                            }
                        </tbody>
                    </table>
                    <div className="flex justify-end gap-4 items-center mt-4">
                        <button
                            onClick={prevPage}
                            disabled={currentPage === 1}
                            className="bg-gray-300 hover:bg-gray-400 px-3 py-2 rounded disabled:opacity-50"
                        >
                            Trước
                        </button>
                        <span>{currentPage}</span>
                        <button
                            onClick={nextPage}
                            disabled={currentPage === totalPages}
                            className="bg-gray-300 hover:bg-gray-400 px-3 py-2 rounded disabled:opacity-50"
                        >
                            Sau
                        </button>
                    </div>
                </div>
            </div>
        </div>

    )
}