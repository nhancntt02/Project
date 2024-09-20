import { useRef, useState, useEffect } from "react";
import axiosClient from "../axios-client";
import { FaArrowLeft } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import ErrorNotification from "../components/ErrorNotification";
export default function Home() {
    const [oss, setOss] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const idRef = useRef();
    const valueRef = useRef();
    const navigate = useNavigate();
    const [addError, setAddError] = useState(null);
    useEffect(() => {
        getOss();
    }, []);

    const getOss = () => {
        setLoading(true);
        axiosClient.get('/oss')
            .then(({ data }) => {
                setOss(data.data);
                setLoading(false);
            })
            .catch(error => {
                console.error('Error fetching operating system:', error);
                setError(error);
                setLoading(false);
            });
    }

    const onSubmit = async (ev) => {
        ev.preventDefault();
        const payload = {
            os_id: idRef.current.value,
            os_value: valueRef.current.value
        }
        try {
            const res = await axiosClient.post('/add/os', payload);
            console.log(res);
            alert(res.data.message);
            idRef.current.value = "";
            valueRef.current.value = "";
            getOss();
        } catch (err) {
            handleError();
            idRef.current.value = "";
            valueRef.current.value = "";
            console.error(err);
        }
    }




    const handleError = () => {
        setAddError(true);
        setTimeout(() => {
            setAddError(false);
        }, 3000); // Ẩn thông báo sau 3 giây
    };


    return (
        <div className="">
            {addError && <ErrorNotification/>}
            <div className="ml-2">
                <button onClick={() => navigate(-1)}><FaArrowLeft className="text-2xl" /></button>
            </div>
            <div className="flex justify-center items-center">
                <div className="w-96 p-6 shadow-lg rounded-md">
                    <h1 className="text-center font-bold text-xl ">
                        Thêm giá trị cho hệ điều hành
                    </h1>
                    <hr className="mt-3" />
                    <div className="mt-3">
                        <label htmlFor="idos" className="block text-base mb-2 ">Mã hệ điều hành</label>
                        <input id="idos" className="ct-input" ref={idRef} placeholder="Nhập mã hệ điều hành" />
                    </div>
                    <div className="mt-3">
                        <label htmlFor="valueos" className="block text-base mb-2 ">Giá trị hệ điều hành</label>
                        <input id="valueos" className="ct-input" ref={valueRef} placeholder="Nhập giá trị của hệ điều hành" />
                    </div>
                    <div className="mt-3 flex justify-center items-center">
                        <button onClick={onSubmit} className="rounded-md bg-green-500 w-20 mx-auto">Lưu</button>
                    </div>

                </div>

                <div className="ml-[30px]">
                    {loading ? (
                        <p>Loading...</p>
                    ) : error ? (
                        <p>Error: {error.message}</p>
                    ) : (
                        <table className=" border-collapse border border-slate-400 ... ">
                            <thead>
                                <tr>
                                    <th className="border border-slate-300 px-2">Mã hệ điều hành</th>
                                    <th className="border border-slate-300 px-2">Giá trị hệ điều hành</th>
                                </tr>
                            </thead>
                            <tbody className="">
                                {oss.map(b => (
                                    <tr className="text-center">
                                        <td className="border border-slate-300 px-2" key={b.os_id}>
                                            {b.os_id}
                                        </td>
                                        <td className="border border-slate-300 px-2">
                                            {b.os_value}
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    )}
                </div>
            </div>

        </div>
    );
}