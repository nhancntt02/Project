import { useEffect, useRef, useState } from "react";
import axiosClient from "../axios-client";
import { FaArrowLeft } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import ErrorNotification from "../components/ErrorNotification";

export default function Home() {
    const [cpus, setCpus] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const idRef = useRef();
    const valueRef = useRef();
    const navigate = useNavigate();
    const [addError, setAddError] = useState(null);

    useEffect(() => {
        getCpu();
    }, []);

    const getCpu = () => {
        setLoading(true);
        axiosClient.get('/cpus')
            .then(({ data }) => {
                setCpus(data.data);
                setLoading(false);
            })
            .catch((error) => {
                console.error('Error fetching cpu:', error);
                setError(error);
                setLoading(false);
            })
    }

    const onSubmit = async (ev) => {
        ev.preventDefault();
        const payload = {
            cpu_id: idRef.current.value,
            cpu_value: valueRef.current.value
        }
        try {
            const res = await axiosClient.post('/add/cpu', payload);

            alert(res.data.message);
            getCpu();
            idRef.current.value = "";
            valueRef.current.value = "";
        } catch (err) {
            handleSuccess();
            idRef.current.value = "";
            valueRef.current.value = "";
            console.error(err);
        }
    }
    
    const handleSuccess = () => {
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
                <div className="w-96 p-6 shadow-lg rounded-md mt-[40px]">
                    <h1 className="text-center font-bold text-xl">
                        Thêm giá trị cho CPU
                    </h1>
                    <hr className="mt-3" />
                    <div className="mt-3">
                        <label htmlFor="idCpu" className="block text-base mb-2 ">Mã chíp</label>
                        <input id="idCPu" className="ct-input" ref={idRef} placeholder="Nhập mã chíp " />
                    </div>
                    <div className="mt-3">
                        <label htmlFor="valueCpu" className="block text-base mb-2 ">Giá trị chíp</label>
                        <input id="valueCpu" className="ct-input" ref={valueRef} placeholder="Nhập giá trị chíp xử lí " />
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
                        <div className="h-[200px] overflow-y-auto">
                            <table className=" border-collapse border border-slate-400 ... ">
                                <thead>
                                    <tr>
                                        <th className="border border-slate-300 px-2">Mã cpu</th>
                                        <th className="border border-slate-300 px-2">Giá trị cpu</th>
                                    </tr>
                                </thead>
                                <tbody className="">
                                    {cpus.map(b => (
                                        <tr className="text-center">
                                            <td className="border border-slate-300 px-2" key={b.cpu_id}>
                                                {b.cpu_id}
                                            </td>
                                            <td className="border border-slate-300 px-2">
                                                {b.cpu_value}
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>

                    )}
                </div>
            </div>


        </div>
    );
}