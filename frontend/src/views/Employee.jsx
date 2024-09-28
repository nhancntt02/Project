import { useState } from "react"
import axiosClient from "../axios-client";
import { useEffect } from "react";
import { useRef } from "react";

export default function Employee() {
    const [employees, setEmployees] = useState([]);
    const [change, setChange] = useState(false);
    const [indexC, setIndexC] = useState();
    const [permiss, setPermiss] = useState([]);
    const [isVisible, setIsVisible] = useState(false);
    const permissRef = useRef();

    const nameRef = useRef();
    const emailRef = useRef();
    const passwordRef = useRef();
    const passwordConfirmationRef = useRef();
    const phoneRef = useRef();
    const [errors, setErrors] = useState(null);

    useEffect(() => {
        getEmployee();
        getPermiss();
    }, []);

    const getEmployee = () => {
        axiosClient.get('/employees').then(({ data }) => { console.log(data.data); setEmployees(data.data) });
    }

    const getPermiss = async () => {
        const res = await axiosClient.get('/permiss');
        setPermiss(res.data.data);
    }

    const changePermiss = async (e) => {
        const payload = {
            id: employees[indexC]?.id,
            employee_id: employees[indexC]?.employee_id,
            permiss_id: permissRef.current.value
        }
        console.log(payload);
        if (e.key == 'Enter') {
            const res = await axiosClient.put(`/update/permiss/${employees[indexC]?.employee_id}`, payload);

            if (res.status == 200) {

                getEmployee();

            }
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
            .then(({ data }) => {
                getEmployee();
                setIsVisible(false);
                // add infopermiss
            })
            .catch(err => {
                const response = err.response;
                if (response && response.status == 422) {

                    setErrors(response.data.errors);

                }
            })

    }

    return (
        <div onDoubleClick={(e) => { e.stopPropagation(); setChange(false); }} className="container mx-auto h-screen ">
            {isVisible && (
                <div
                    className="fixed inset-0 flex items-center justify-center w-full h-full bg-black bg-opacity-50 z-[100px]"
                >
                    <div className="w-full max-w-md p-6 bg-white rounded-lg shadow-md">
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
            <div>
                <div className="h-[16%] border-b flex justify-center items-center bg-bgheader-200">
                    <div className="text-bgheader-300 text-center text-4xl my-4 font-semibold">Quản lý nhân viên</div>
                </div>
                <div>
                    <div className="flex items-center">
                        <button
                            onClick={() => setIsVisible(true)}
                            className="bg-blue-500 text-white p-2 rounded-lg shadow-md hover:bg-blue-600 transition duration-300"
                        >Thêm nhân viên</button>
                    </div>
                </div>
                <div className="mb-4 text-lg font-semibold">
                    Danh sách nhân viên
                </div>
                <div className="overflow-x-auto">
                    <table className="min-w-full bg-white border border-gray-200">
                        <thead>
                            <tr className="bg-gray-200 text-gray-600 uppercase text-sm leading-normal">
                                <th className="py-3 px-6 text-left">STT</th>
                                <th className="py-3 px-6 text-left">Tên</th>
                                <th className="py-3 px-6 text-left">Email</th>
                                <th className="py-3 px-6 text-left">Số điện thoại</th>
                                <th className="py-3 px-6 text-left">Ngày sinh</th>
                                <th className="py-3 px-6 text-left">Giới tính</th>
                                <th className="py-3 px-6 text-left">Quyền</th>
                            </tr>
                        </thead>
                        <tbody className="text-gray-600 text-sm font-light">
                            {
                                employees.map((item, index) => (
                                    <tr key={index} className="border-b border-gray-200 hover:bg-gray-100">
                                        <td className="py-3 px-6 text-left whitespace-nowrap">
                                            {index + 1}
                                        </td>
                                        <td className="py-3 px-6 text-left">
                                            {item.employee?.name}
                                        </td>
                                        <td className="py-3 px-6 text-left">
                                            {item.employee?.email}
                                        </td>
                                        <td className="py-3 px-6 text-left">
                                            {item.employee?.phone}
                                        </td>
                                        <td className="py-3 px-6 text-left">
                                            {item.employee?.birthday || "Chưa nhập"}
                                        </td>
                                        <td className="py-3 px-6 text-left">
                                            {item.employee?.gender}
                                        </td>
                                        <td
                                            onDoubleClick={(e) => { e.stopPropagation(); setChange(true); setIndexC(index); }}
                                            //onBlur={() => setChange(false)}
                                            className="py-3 px-6 text-left cursor-pointer z-10"
                                        >
                                            {
                                                change && index === indexC ? (
                                                    <div
                                                        onKeyDown={(e) => changePermiss(e)}
                                                        className="flex items-center"
                                                    >
                                                        <select name="" ref={permissRef} id="">
                                                            <option value={item.permiss?.permiss_id}>{item.permiss?.permiss_name}</option>
                                                            {
                                                                permiss.map((p, i) => (
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