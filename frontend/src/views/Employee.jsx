import { useState } from "react"
import axiosClient from "../axios-client";
import { useEffect } from "react";
import { useRef } from "react";
import { FaLock, FaLockOpen, FaRegEye, FaEdit, FaSave } from "react-icons/fa";

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

    useEffect(() => {
        getEmployee();
        getPermiss();
        //fetchDefaultImage();
        // getAvater();
    }, []);

    const getEmployee = () => {
        axiosClient.get('/employees').then(({ data }) => { setArr(data.data); setEmployees(data.data); console.log(data.data)});
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
        console.log(payload);

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


    useEffect(() => {
        const fetchImages = async () => {
            if (arr && arr.length > 0) {
                const employeeIds = arr.map(e => e.employee_id);

                try {
                    // Gọi API để lấy danh sách tên file tương ứng với employee_id
                    const response = await axiosClient.post('/files/employees', {
                        employee_ids: employeeIds
                    });

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
                    setImg(imageData); // Lưu URL ảnh vào state
                } catch (error) {
                    console.error('Error fetching images:', error);
                }
            }
        };

        fetchImages();
    }, [arr]);



    return (
        <div className="container mx-auto h-screen ">
            {isVisible && (
                <div
                    className="fixed inset-0 flex items-center justify-center w-full h-full bg-black bg-opacity-50 z-[100px]"
                >

                    <div className="relative w-full max-w-md p-6 bg-white rounded-lg shadow-md">
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

            <div className="h-[16%] border-b flex justify-center items-center bg-bgheader-200">
                <div className="text-bgheader-300 text-center text-4xl my-4 font-semibold">Quản lý nhân viên</div>
            </div>
            <div className="p-4">
                <div className="flex justify-between my-4 px-4 border items-center">
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
                                <th className="py-3 px-6 text-left border-r border-gray-200">Quyền</th>

                                <th className="py-3 px-6 text-center border-r border-gray-200">Trạng thái</th>
                                <th className="py-3 px-6 text-left">Hành động</th>
                            </tr>
                        </thead>
                        <tbody className="text-gray-600 text-sm font-light">
                            {
                                employees.map((item, index) => (
                                    <tr key={index} className="border-b border-gray-200 hover:bg-gray-100">
                                        <td className="py-3 px-6 text-left border-r border-gray-200 whitespace-nowrap">
                                            {item.id}
                                        </td>
                                        <td className="py-3 px-6 text-left border-r font-bold border-gray-200">
                                            {item.employee?.name}
                                        </td>
                                        <td className="border-gray-200 border-r">
                                            <div className="w-[80px] mx-auto">
                                                <img src={img.find(i => i.employee_id == item.employee_id)?.imageUrl} alt="" className="h-20 w-20 border rounded-full object-cover" />
                                            </div>
                                        </td>
                                        <td className="py-3 px-6 text-left border-r border-gray-200">
                                            {item.employee?.email}
                                        </td>

                                        <td className="py-3 px-6 text-left border-r border-gray-200">
                                            {item.employee?.phone}
                                        </td>
                                        <td className="py-3 px-6 text-left cursor-pointer z-10">
                                            {
                                                change && index === indexC ? (
                                                    <div
                                                        className="flex items-center"
                                                    >
                                                        <select name="" ref={permissRef} id="">
                                                            <option value={item.permiss?.permiss_id}>{item.permiss?.permiss_name}</option>
                                                            {
                                                                permiss.filter(a => a.permiss_id != 'QMAX').map((p, i) => (
                                                                    <option
                                                                        key={i}
                                                                        value={p.permiss_id}
                                                                        className="border border-gray-300 rounded px-2 py-1 focus:outline-none focus:ring-2 focus:ring-blue-500"
                                                                    >
                                                                        {p.permiss_name}
                                                                    </option>
                                                                ))
                                                            }
                                                        </select>
                                                    </div>
                                                ) : (
                                                    <div className="">{item.permiss?.permiss_name}</div>
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
                                                            change && index === indexC ? (
                                                                <FaSave onClick={() => { changePermiss(); setIndexC(null); }} className="hover:cursor-pointer text-green-500" />
                                                            ) : (
                                                                <FaEdit onClick={() => { setChange(true); setIndexC(index); }} className="hover:cursor-pointer text-yellow-500" />
                                                            )
                                                        }
                                                        {
                                                            item.employee?.status_lock == 1 ? (
                                                                <FaLockOpen onClick={() => { openAccount(item.id) }} className="text-blue-500 hover:cursor-pointer" />
                                                            ) : (
                                                                <FaLock onClick={() => { lockAccount(item.id) }} className="text-red-500 hover:cursor-pointer" />
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
                </div>
            </div>


        </div>


    )
}