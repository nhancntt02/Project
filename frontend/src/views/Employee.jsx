import { useState } from "react"
import axiosClient from "../axios-client";
import { useEffect } from "react";
import { useRef } from "react";

export default function Employee() {
    const [employees, setEmployees] = useState([]);
    const [change, setChange] = useState(false);
    const [indexC, setIndexC] = useState();
    const [permiss, setPermiss] = useState([]);
    const permissRef = useRef();

    useEffect(() => {
        axiosClient.get('/employees').then(({ data }) => { console.log(data.data); setEmployees(data.data) });
        getPermiss();
    }, []);

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
        if (e.key === 'Enter') {

            setChange(false);
        }
    }

    return (
        <div onDoubleClick={(e) => {e.stopPropagation(); setChange(false); }} className="container mx-auto h-[100vh] p-4x z-0">
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
                                                    onKeyDown={() => changePermiss(indexC)}
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

    )
}