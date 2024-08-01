import { useEffect, useRef, useState } from "react";
import axiosClient from "../axios-client";

export default function Home() {
    const [cpus, setCpus] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const idRef = useRef();
    const valueRef = useRef();

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

    const onSubmit = (ev) => {
        ev.preventDefault();
        const payload = {
            cpu_id: idRef.current.value,
            cpu_value: valueRef.current.value
        }
        axiosClient.post('/add/cpu', payload)
            .then(({ data }) => {
                console.log(data)
            })
            .catch(err => {
                console.error(err);
            });
    }

    return (
        <div className="">
            <div className="flex justify-center items-center">
                <div className="w-96 p-6 shadow-lg rounded-md">
                    <h1 className="text-center font-bold text-xl">
                        Thêm giá trị cho CPU
                    </h1>
                    <hr className="mt-3" />
                    <div className="mt-3">
                        <label for="idCpu" className="block text-base mb-2 ">Mã chíp</label>
                        <input id="idCPu" className="ct-input" ref={idRef} placeholder="Nhập mã chíp " />
                    </div>
                    <div className="mt-3">
                        <label for="valueCpu" className="block text-base mb-2 ">Giá trị chíp</label>
                        <input id="valueCpu" className="ct-input" ref={valueRef} placeholder="Nhập giá trị chíp xử lí " />
                    </div>
                    <div className="mt-3 flex justify-center items-center">
                        <button onClick={onSubmit} className="rounded-md bg-green-500 w-20 mx-auto">Lưu</button>
                    </div>
                </div>
            </div>
            <div className="flex justify-center mt-5">
                {loading ? (
                    <p>Loading...</p>
                ) : error ? (
                    <p>Error: {error.message}</p>
                ) : (
                    <table className=" border-collapse border border-slate-400 ... ">
                        <thead>
                            <tr>
                                <th className="border border-slate-300 ...">Mã cpu</th>
                                <th className="border border-slate-300 ...">Giá trị cpu</th>
                            </tr>
                        </thead>
                        <tbody className="">
                            {cpus.map(b => (
                                <tr className="">
                                    <td className="border border-slate-300 ..." key={b.cpu_id}>
                                        {b.cpu_id}
                                    </td>
                                    <td className="border border-slate-300 ...">
                                        {b.cpu_value}
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                )}
            </div>

        </div>
    );
}