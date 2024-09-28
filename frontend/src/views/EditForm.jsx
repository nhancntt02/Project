import { useEffect, useRef, useState } from "react";
//import { useStateContext } from "../contexts/ContextProvider";
import axiosClient from "../axios-client";
import { useNavigate, useParams } from 'react-router-dom';

export default function EditForm() {
    const data = useParams();
    const [users, setUsers] = useState([])
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [form, setForm] = useState([]);
    const navigate = useNavigate();
    const contentRef = useRef();

    const employee_idRef = useRef();

    useEffect(() => {
        getForm();
        getUsers();
    }, [])


    const getUsers = async () => {
        setLoading(true);
        try {
            const res = await axiosClient.get(`/users`);
            setUsers(res.data.users);
            setLoading(false);
        } catch (error) {
            console.log(error);
            setLoading(false);
        }

    }

    const getForm = async () => {
        setLoading(true);
        try {
            const res = await axiosClient.get(`/form/${data.fap_id}`);
            setForm(res.data.data);
            setLoading(false);
        } catch (error) {
            console.log(error)
            setLoading(false);
        }
    }

    useEffect(() => {
        if (form) {
            contentRef.current.value = form[0]?.fap_content,
            employee_idRef.current.value = form[0]?.employee_id
        }

    }, [form])

    const onSubmit = async (ev) => {
        ev.preventDefault();
        const payload = {
            fap_content: contentRef.current.value,
            fap_status: form[0]?.fap_status,
            fap_total_amount: form[0]?.fap_total_amount,
            employee_id: employee_idRef.current.value,
        };

        try {
            const res = await axiosClient.put(`/update/form/${data.fap_id}`, payload);
            alert(res.data.message);
            navigate(-1);
        } catch (error) {
            console.log(error);
        }
    }

    return (
        <div className="">
            <div className="m-2">
                <button
                    onClick={() => navigate(-1)}  // Go back to the previous page
                    className="px-3 py-1 text-center bg-blue-300 text-white rounded hover:bg-blue-800 mt-3"
                >Trở về</button>
            </div>
            {
                loading ? (
                    <p>Loading.....</p>
                ) : (
                    <div className="flex justify-center items-center ">
                        <div className="w-96 p-6 shadow-lg rounded-md border"  >
                            <h1 className="text-center font-bold text-xl">
                                Chỉnh sửa thông tin phiếu nhập
                            </h1>
                            <hr className="mt-3" />
                            <div className="mt-3">
                                <label htmlFor="user" className="ct-label">Nhân viên tạo:</label>
                                <select id="user" className="ct-select-1" ref={employee_idRef}>
                                    <option className="text-sm text-gray-900 dark:text-white" value={form[0]?.employee_id} key={form[0]?.employee_id}>{users.find(user => user.id == form[0]?.employee_id)?.name}</option>
                                    {
                                        users.map(user => (
                                            <option className="text-sm text-gray-900 dark:text-white" value={user.id} key={user.id} >{user.name}</option>
                                        ))
                                    }
                                </select>
                            </div>
                            <div className="mt-3">
                                <label htmlFor="content" className="block text-base mb-2 ">Nội dung</label>
                                <textarea id="content" className="ct-input" ref={contentRef} />
                            </div>
                            <div className="mt-3 flex justify-center items-center">
                                <button onClick={onSubmit} className="rounded-md bg-blue-300 hover:bg-blue-600 w-20 mx-auto">Lưu</button>
                            </div>

                        </div>

                    </div>
                )
            }

        </div>
    )
}