import { useEffect, useRef, useState } from "react";
import axiosClient from "../axios-client";

export default function Pin() {
    const [pins, setPins] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const idRef = useRef();
    const valueRef = useRef();

    useEffect(() => {
        getPins();
    }, []);

    const getPins = () => {
        setLoading(true);
        axiosClient.get('/pins')
            .then(({ data }) => {
                setPins(data.data);
                setLoading(false);
            })
            .catch(error => {
                console.error('Error fetching pin:', error);
                setError(error);
                setLoading(false);
            });
    }

    const onSubmit = async (ev) => {
        ev.preventDefault();
        const payload = {
            pin_id: idRef.current.value,
            pin_value: valueRef.current.value
        }
        try {
            const res = await axiosClient.post('/add/pin', payload);
            alert(res.data.message);
            getPins();
            idRef.current.value = "";
            valueRef.current.value = "";
        } catch (err) {
            console.error(err);
        }
    }

    return (
        <div className="">
            <div className=" flex justify-center items-center">
                <div className="w-96 p-6 shadow-lg rounded-md "  >
                    <h1 className="text-center font-bold text-xl">
                        Thêm giá trị cho Pin
                    </h1>
                    <hr className="mt-3" />
                    <div className="mt-3">
                        <label for="idPin" className="block text-base mb-2 ">Mã pin</label>
                        <input id="idPin" className="ct-input" ref={idRef} placeholder="Nhập mã Pin " />
                    </div>
                    <div className="mt-3">
                        <label for="valuePin" className="block text-base mb-2 ">Giá trị pin</label>
                        <input id="valuePin" className="ct-input" ref={valueRef} placeholder="Nhập giá trị cho Pin " />
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
                                    <th className="border border-slate-300 px-2"> Mã pin </th>
                                    <th className="border border-slate-300 px-2"> Giá trị pin </th>
                                </tr>
                            </thead>
                            <tbody className="">
                                {pins.map(b => (
                                    <tr className="text-center">
                                        <td className="border border-slate-300 px-2" key={b.pin_id}>
                                            {b.pin_id}
                                        </td>
                                        <td className="border border-slate-300 px-2">
                                            {b.pin_value}
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