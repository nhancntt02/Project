import { useEffect, useRef, useState } from "react";
import axiosClient from "../axios-client";
import { FaArrowLeft } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import ErrorNotification from "../components/ErrorNotification";
export default function Home() {
    const [rams, setRams] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const idRef = useRef();
    const valueRef = useRef();
    const navigate = useNavigate();

    const [addError, setAddError] = useState(null);
    useEffect(() => {
        getRams();
    }, []);

    const getRams = () => {
        setLoading(true);
        axiosClient.get('/rams')
            .then(({ data }) => {
                setRams(data.data);
                setLoading(false);
            })
            .catch(error => {
                console.error('Error fetching ram:'.error);
                setError(error);
                setLoading(false);
            });
    }

    const onSubmit = async (ev) => {
        ev.preventDefault();
        const payload = {
            ram_id: idRef.current.value,
            ram_value: valueRef.current.value
        }
        try {
            const res = await axiosClient.post('/add/ram', payload);
            alert(res.data.message);
            idRef.current.value = "";
            valueRef.current.value = "";
            getRams();
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
            <div className=" flex justify-center items-center">
                <div className="w-96 p-6 shadow-lg rounded-md"  >
                    <h1 className="text-center font-bold text-xl">
                        Thêm giá trị cho Ram
                    </h1>
                    <hr className="mt-3" />
                    <div className="mt-3">
                        <label htmlFor="idRam" className="block text-base mb-2 ">Mã ram</label>
                        <input id="idRam" className="ct-input" ref={idRef} placeholder="Nhập mã Ram " />
                    </div>
                    <div className="mt-3">
                        <label htmlFor="valueRam" className="block text-base mb-2 ">Giá trị ram</label>
                        <input id="valueRam" className="ct-input" ref={valueRef} placeholder="Nhập giá trị cho Ram " />
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
                                <tr className="text-center">
                                    <th className="border border-slate-300 px-2">Mã Ram</th>
                                    <th className="border border-slate-300 px-2">Giá trị Ram</th>
                                </tr>
                            </thead>
                            <tbody className="">
                                {rams.map(b => (
                                    <tr className="text-center">
                                        <td className="border border-slate-300 ..." key={b.ram_id}>
                                            {b.ram_id}
                                        </td>
                                        <td className="border border-slate-300 ...">
                                            {b.ram_value}
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