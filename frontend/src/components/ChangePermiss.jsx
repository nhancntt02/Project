import { useEffect, useState } from "react"
import axiosClient from "../axios-client";
import { FaBell, FaClipboardList, FaStar, FaNewspaper, FaUserShield, FaMinusCircle, FaShoppingCart, FaPlusCircle } from 'react-icons/fa';
export default function ChangePermiss({ employee_id }) {

    const [permiss, setPermiss] = useState({});

    useEffect(() => {
        getPermiss();
    }, [])

    const getPermiss = async () => {
        try {
            const res = await axiosClient.get(`/infopermiss/${employee_id}`);
            console.log(res.data.data);
            setPermiss(res.data.data);
        } catch (error) {
            console.log(error);
        }
    }

    const changePermiss = async (type) => {
        const fields = ["QNV", "QNVNK", "QNVTB", "QNVBH", "QNVBL", "QNVTT"];
        const field = fields[type - 1] || fields[fields.length - 1]; // Lấy trường phù hợp hoặc mặc định là QNVTT

        const updatedPermiss = {
            ...permiss,
            [field]: permiss[field] ? 0 : 1, // Đảo ngược giá trị 0/1
        };

        await axiosClient.put(`/update/permiss/${employee_id}`, updatedPermiss);
        setPermiss(updatedPermiss);
    };


    return (
        <div className="container">
            <div className="w-[500px] px-4">
                <div className="grid grid-cols-6 w-full h-full ">
                    <div className="border flex justify-center py-6 items-center"><FaUserShield size={24} /></div>
                    <div className="border flex justify-center py-6 items-center"><FaClipboardList size={24} /></div>
                    <div className="border flex justify-center py-6 items-center"><FaBell size={24} /></div>
                    <div className="border flex justify-center py-6 items-center"><FaShoppingCart size={24} /></div>
                    <div className="border flex justify-center py-6 items-center"><FaStar size={24} /></div>
                    <div className="border flex justify-center py-6 items-center"><FaNewspaper size={24} /></div>
                </div>
                <div className="grid grid-cols-6">
                    <div className="border flex justify-center py-6 items-center">
                        {
                            permiss.QNV == 1 ? (
                                <div onClick={() => { changePermiss(1) }} className="hover:cursor-pointer text-green-500 hover:text-green-700"><FaPlusCircle size={24} /></div>
                            ) : (
                                <div onClick={() => { changePermiss(1) }} className="hover:cursor-pointer text-red-500 hover:text-red-700"><FaMinusCircle size={24} /></div>
                            )
                        }
                    </div>
                    <div className="border flex justify-center py-6 items-center">
                        {
                            permiss.QNVNK == 1 ? (
                                <div onClick={() => { changePermiss(2) }} className="hover:cursor-pointer text-green-500 hover:text-green-700"><FaPlusCircle size={24} /></div>
                            ) : (
                                <div onClick={() => { changePermiss(2) }} className="hover:cursor-pointer text-red-500 hover:text-red-700"><FaMinusCircle size={24} /></div>
                            )
                        }
                    </div>
                    <div className="border flex justify-center py-6 items-center">
                        {
                            permiss.QNVTB == 1 ? (
                                <div onClick={() => { changePermiss(3) }} className="hover:cursor-pointer text-green-500 hover:text-green-700"><FaPlusCircle size={24} /></div>
                            ) : (
                                <div onClick={() => { changePermiss(3) }} className="hover:cursor-pointer text-red-500 hover:text-red-700"><FaMinusCircle size={24} /></div>
                            )
                        }
                    </div>
                    <div className="border flex justify-center py-6 items-center">
                        {
                            permiss.QNVBH == 1 ? (
                                <div onClick={() => { changePermiss(4) }} className="hover:cursor-pointer text-green-500 hover:text-green-700"><FaPlusCircle size={24} /></div>
                            ) : (
                                <div onClick={() => { changePermiss(4) }} className="hover:cursor-pointer text-red-500 hover:text-red-700"><FaMinusCircle size={24} /></div>
                            )
                        }
                    </div>
                    <div className="border flex justify-center py-6 items-center">
                        {
                            permiss.QNVBL == 1 ? (
                                <div onClick={() => { changePermiss(5) }} className="hover:cursor-pointer text-green-500 hover:text-green-700"><FaPlusCircle size={24} /></div>
                            ) : (
                                <div onClick={() => { changePermiss(5) }} className="hover:cursor-pointer text-red-500 hover:text-red-700"><FaMinusCircle size={24} /></div>
                            )
                        }
                    </div>
                    <div className="border flex justify-center py-6 items-center">
                        {
                            permiss.QNVTT == 1 ? (
                                <div onClick={() => { changePermiss(6) }} className="hover:cursor-pointer text-green-500 hover:text-green-700"><FaPlusCircle size={24} /></div>
                            ) : (
                                <div onClick={() => { changePermiss(6) }} className="hover:cursor-pointer text-red-500 hover:text-red-700"><FaMinusCircle size={24} /></div>
                            )
                        }
                    </div>
                </div>
            </div>
        </div>
    )
}