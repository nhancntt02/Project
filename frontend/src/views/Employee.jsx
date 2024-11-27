import { useState } from "react"
import axiosClient from "../axios-client";
import { useEffect } from "react";
import { useRef } from "react";
import { FaLock, FaLockOpen, FaRegEye, FaEdit, FaSave, FaTimes } from "react-icons/fa";
import ChangePermiss from "../components/ChangePermiss";
export default function Employee() {
    const [employees, setEmployees] = useState([]);
    const [arr, setArr] = useState([]);
    const [img, setImg] = useState([]);
    const [indexC, setIndexC] = useState();
    const [permiss, setPermiss] = useState([]);
    const [isVisible, setIsVisible] = useState(false);
    const permissRef = useRef();
    const [defaultImageUrl, setDefaultImageUrl] = useState();
    const nameRef = useRef();
    const emailRef = useRef();
    const passwordRef = useRef();
    const passwordConfirmationRef = useRef();
    const phoneRef = useRef();
    const [errors, setErrors] = useState(null);
    const searchRef = useRef();
    const [change, setChange] = useState(false);
    const [currentPage, setCurrentPage] = useState(1);
    const customersPerPage = 4;
    useEffect(() => {
        getEmployee();
        getPermiss();
        //fetchDefaultImage();
        // getAvater();
        getFile();
    }, []);

    const getEmployee = () => {
        axiosClient.get('/employees').then(({ data }) => { setArr(data.data); setEmployees(data.data); console.log(data.data) });
    }

    const getPermiss = async () => {
        const res = await axiosClient.get('/permiss');
        setPermiss(res.data.data);
    }

    const changePermiss = async () => {
        const payload = {
            id: employees[indexC]?.id,
            employee_id: employees[indexC]?.employee_id,
            permiss_id: permissRef.current.value
        }
        const temp = employees.map((employee, i) =>
            i === indexC
                ? {
                    ...employee, // sao chép đối tượng employee
                    permiss_id: permissRef.current.value, // cập nhật thuộc tính permiss_id bên ngoài
                    permiss: {
                        ...employee.permiss, // sao chép đối tượng permiss
                        permiss_name: permiss.find(p => p.permiss_id == permissRef.current.value)?.permiss_name,
                        permiss_id: permissRef.current.value // cập nhật thuộc tính permiss_id bên trong
                    }
                }
                : employee // giữ nguyên các employee khác
        );


        setEmployees(temp)
        const res = await axiosClient.put(`/update/permiss/${employees[indexC]?.employee_id}`, payload);

        if (res.status == 200) {

            getEmployee();

        }

        setChange(false);
    }

    const onSubmit = (ev) => {
        ev.preventDefault();

        const payload = {
            name: nameRef.current.value,
            email: emailRef.current.value,
            password: passwordRef.current.value,
            password_confirmation: passwordConfirmationRef.current.value,
            phone: phoneRef.current.value,
            type: 1

        }
        console.log(payload);
        axiosClient.post('/signup', payload)
            .then(async ({ data }) => {
                const id = data.user.id;

                // add infopermiss
                const payload2 = {
                    permiss_id: 'QNV',
                    employee_id: id
                }
                await axiosClient.post(`/add/infopermiss`, payload2);
                getEmployee();
                setIsVisible(false);
            })
            .catch(err => {
                const response = err.response;
                if (response && response.status == 422) {

                    setErrors(response.data.errors);

                }
            })

    }

    const removeVietnameseTones = (str) => {
        return str
            .normalize('NFD')
            .replace(/[\u0300-\u036f]/g, '')
            .replace(/[Đđ]/g, 'd');
    }

    const searchEmployee = () => {
        const search = removeVietnameseTones(searchRef.current.value.toLowerCase());

        if (search === "") {
            setEmployees(arr); // Reset to the original array if search is empty
        } else {
            const filtered = arr.filter(item =>
                removeVietnameseTones(item.employee?.name.toLowerCase()).includes(search)
            );
            setEmployees(filtered); // Set the filtered results to state
        }
    }


    const lockAccount = (id) => {
        // Create a copy of the original array to maintain immutability
        let data = null;
        const updatedEmployees = arr.map(emp => {
            if (emp.id === id) {
                data = {
                    ...emp.employee,
                    status_lock: 1
                }

                // Create a copy of the employee object and update status_lock
                return {
                    ...emp,
                    employee: {
                        ...emp.employee,
                        status_lock: 1
                    }
                };
            }
            return emp; // Return unchanged employee if ID doesn't match
        });


        // Update the state with the new array
        setEmployees(updatedEmployees);
        axiosClient.put(`/update/user/${id}`, data)
            .then(
                setArr(updatedEmployees)
            )

    };


    const openAccount = (id) => {
        let data = null;
        // Create a copy of the original array to maintain immutability
        const updatedEmployees = arr.map(emp => {
            if (emp.id === id) {
                data = {
                    ...emp.employee,
                    status_lock: 0
                }
                // Create a copy of the employee object and update status_lock
                return {
                    ...emp,
                    employee: {
                        ...emp.employee,
                        status_lock: 0
                    }
                };
            }
            return emp; // Return unchanged employee if ID doesn't match
        });

        // Update the state with the new array
        setEmployees(updatedEmployees);
        axiosClient.put(`/update/user/${id}`, data)
            .then(
                setArr(updatedEmployees)
            )
    };


    const getFile = async () => {
        try {
            const res = await axiosClient.get('/full/file');
            const files = res.data.data;
            let arr = [];
            files.forEach(file => {
                arr.push({
                    user_id: file.user_id,
                    url: "http://localhost:8000/storage/avatars/" + file.file_name,
                })
            })

            setImg(arr);
        } catch (error) {
            console.log(error);
        }
    }

    const totalPages = Math.ceil(employees.length / customersPerPage);

    // Get the customers for the current page
    const indexOfLastEmployee = currentPage * customersPerPage;
    const indexOfFirstEmployee = indexOfLastEmployee - customersPerPage;
    const currentEmployees = employees.slice(indexOfFirstEmployee, indexOfLastEmployee);

    const nextPage = () => {
        if (currentPage < totalPages) setCurrentPage(currentPage + 1);
    };

    const prevPage = () => {
        if (currentPage > 1) setCurrentPage(currentPage - 1);
    };

    return (
        <div className="container mx-auto h-screen bg-bgheader-400">
            {isVisible && (
                <div
                    className="fixed inset-0 flex items-center justify-center w-full h-full bg-black bg-opacity-50 z-[100px]"
                >

                    <div className="relative w-full max-w-md p-6 bg-white  rounded-lg shadow-md">
                        <button onClick={() => setIsVisible(false)} className="absolute top-1 right-2 font-bold">X</button>
                        <form onSubmit={onSubmit} className="space-y-4">
                            <h1 className="text-2xl font-bold text-center text-gray-900">
                                Đăng ký tài khoản
                            </h1>

                            {/* Hiển thị lỗi nếu có */}
                            {errors && (
                                <div className="p-4 mb-4 text-sm text-red-700 bg-red-100 rounded-lg">
                                    {Object.keys(errors).map((key) => (
                                        <p key={key}>{errors[key][0]}</p>
                                    ))}
                                </div>
                            )}

                            {/* Input Họ và tên */}
                            <input
                                className="w-full mt-2 p-3 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-blue-200"
                                ref={nameRef}
                                placeholder="Họ và tên"
                            />

                            {/* Input Email */}
                            <input
                                className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-blue-200"
                                ref={emailRef}
                                type="email"
                                placeholder="Địa chỉ email"
                            />

                            {/* Input Mật khẩu */}
                            <input
                                className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-blue-200"
                                ref={passwordRef}
                                type="password"
                                placeholder="Mật khẩu"
                            />

                            {/* Input Nhập lại mật khẩu */}
                            <input
                                className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-blue-200"
                                ref={passwordConfirmationRef}
                                type="password"
                                placeholder="Nhập lại mật khẩu"
                            />

                            {/* Input Số điện thoại */}
                            <input
                                className="w-full mb-4 p-3 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-blue-200"
                                ref={phoneRef}
                                type="text"
                                placeholder="Số điện thoại"
                            />

                            {/* Button Đăng ký */}
                            <button className="w-full p-3 font-bold text-white bg-blue-500 rounded-md hover:bg-blue-600 focus:outline-none focus:ring focus:ring-blue-200">
                                Đăng ký
                            </button>

                        </form>
                    </div>
                </div>
            )}

            <div className="h-[10%] border-b flex justify-center items-center bg-bgheader-200">
                <div className="text-bgheader-300 text-center text-4xl my-4 font-semibold">Quản lý nhân viên</div>
            </div>
            <div className="px-4">
                <div className="flex justify-between my-4 px-4 border bg-bgheader-200 items-center">
                    <div className="text-2xl font-bold text-center py-4">
                        Danh sách nhân viên
                    </div>
                    <div className="flex gap-4">
                        <input
                            type="text"
                            placeholder=""
                            className="p-2 border min-w-[300px] border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                            ref={searchRef}
                        />
                        <button
                            onClick={searchEmployee}
                            className="bg-blue-500 text-white p-2 rounded-lg hover:bg-blue-600"
                        >
                            Tìm kiếm
                        </button>
                        <button
                            onClick={() => { setErrors(null); setIsVisible(true); }}
                            className="bg-blue-500 text-white p-2 rounded-lg shadow-md hover:bg-blue-600 transition duration-300"
                        >
                            Thêm nhân viên
                        </button>
                    </div>
                </div>
                <div className="overflow-x-auto">
                    <table className="min-w-full bg-white border border-gray-200">
                        <thead>
                            <tr className="bg-red-500 text-white uppercase text-sm leading-normal border-b border-gray-300">
                                <th className="py-3 px-6 text-left border-r border-gray-200">ID</th>
                                <th className="py-3 px-6 text-left border-r border-gray-200">Tên</th>
                                <th className="py-3 px-6 text-left border-r border-gray-200">Avatar</th>
                                <th className="py-3 px-6 text-left border-r border-gray-200">Email</th>
                                <th className="py-3 px-6 text-left border-r border-gray-200">Số điện thoại</th>
                                <th className="py-3 px-6 text-center border-r border-gray-200">Danh sách quyền</th>

                                <th className="py-3 px-6 text-center border-r border-gray-200">Trạng thái</th>
                                <th className="py-3 px-6 text-left">Hành động</th>
                            </tr>
                        </thead>
                        <tbody className="text-gray-600 text-sm font-light">
                            {
                                currentEmployees.map((item, index) => (
                                    <tr key={index} className="border-b border-gray-200 hover:bg-gray-100">
                                        <td className="py-3 px-6 text-left border-r border-gray-200 whitespace-nowrap">
                                            {item.id}
                                        </td>
                                        <td className="py-3 px-6 text-left border-r font-bold border-gray-200">
                                            {item.employee?.name}
                                        </td>
                                        <td className="border-gray-200 border-r">
                                            <div className="w-[80px] mx-auto">
                                                <img src={img.find(i => i.user_id == item.employee_id)?.url || "http://localhost:8000/storage/avatars/macdinh.jpg"} alt="" className="h-20 w-20 border rounded-full object-cover" />
                                            </div>
                                        </td>
                                        <td className="py-3 px-6 text-left border-r border-gray-200">
                                            {item.employee?.email}
                                        </td>

                                        <td className="py-3 px-6 text-left border-r border-gray-200">
                                            {item.employee?.phone}
                                        </td>
                                        <td className="py-3 px-6 text-center  border-r border-gray-200">
                                            {
                                                item.QMAX == 1 ? (
                                                    <div>Toàn quyền</div>
                                                ) : (
                                                    <select name="" id="" className="">
                                                        <option value="1">Quyền nhân viên</option>
                                                        <option hidden={!item.QNVNK} value="1">Quyền nhập kho</option>
                                                        <option hidden={!item.QNVBL} value="1">Quyền bình luận</option>
                                                        <option hidden={!item.QNVBH} value="1">Quyền duyệt đơn hàng</option>
                                                        <option hidden={!item.QNVTB} value="1">Quyền thông báo</option>
                                                        <option hidden={!item.QNVTT} value="1">Quyền thêm tin tức</option>
                                                    </select>
                                                )
                                            }
                                        </td>
                                        {
                                            item.employee?.status_lock == 1 ? (
                                                <td className="py-3 px-6 text-center border-r border-gray-200">
                                                    <span className="bg-slate-700 text-white py-1 px-2 rounded font-semibold">Đang khóa</span>
                                                </td>
                                            ) : (
                                                <td className="py-3 px-6 text-center border-r border-gray-200 ">
                                                    <span className="bg-green-600 text-white py-1 px-2 rounded font-semibold"> Hoạt động</span>
                                                </td>
                                            )
                                        }
                                        <td className="py-3 px-6 text-left border-r border-gray-200">
                                            {
                                                item.id != 1 ? (
                                                    <div className="flex text-xl justify-center gap-6">
                                                        {

                                                            <FaEdit onClick={() => { setChange(true); setIndexC(item.employee_id); }} className="hover:cursor-pointer text-yellow-500" />

                                                        }
                                                        {
                                                            item.employee?.status_lock == 1 ? (
                                                                <FaLockOpen onClick={() => { openAccount(item.id); }} className="text-blue-500 hover:cursor-pointer" />
                                                            ) : (
                                                                <FaLock onClick={() => { lockAccount(item.id); }} className="text-red-500 hover:cursor-pointer" />
                                                            )

                                                        }
                                                    </div>
                                                ) : (
                                                    <div className="text-xl font-bold text-center">
                                                        Admin
                                                    </div>
                                                )
                                            }

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
            {
                change && (
                    <div className="fixed inset-0 top-0 left-0 w-full h-full bg-gray-900 bg-opacity-50 z-10">

                        <div className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-white p-4 rounded shadow-md">
                            <div className="flex justify-end mb-4">
                                <button onClick={() => { setChange(false); getEmployee(); }}>
                                    <FaTimes />
                                </button>
                            </div>

                            <ChangePermiss employee_id={indexC} />
                        </div>
                    </div>
                )
            }

        </div>


    )
}