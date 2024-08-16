import { useRef, useState, useEffect } from "react";
import axiosClient from "../axios-client";

export default function Home() {
    const [roms, setRoms] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const idRef = useRef();
    const valueRef = useRef();

    useEffect(() => {
        getRoms();
    }, []);

    const getRoms = () => {
        setLoading(true);
        axiosClient.get('/roms')
            .then(({ data }) => {
                setRoms(data.data);
                setLoading(false);
            })
            .catch(error => {
                console.error('Error fetching rom:', error);
                setError(error);
                setLoading(false);
            });
    };




    const onSubmit = async (ev) => {
        ev.preventDefault();
        const payload = {
            rom_id: idRef.current.value,
            rom_value: valueRef.current.value
        }
        try {
            const res = await axiosClient.post('/add/rom', payload);
            alert(res.data.message);
            location.reload();
        } catch (err) {
            console.error(err);
        }
    }

    return (
        <div className="">
            <div className="flex justify-center items-center">
                <div className="w-96 p-6 shadow-lg rounded-md mt-[40px]">
                    <h1 className="text-center font-bold text-xl ">
                        Thêm giá trị cho Rom
                    </h1>
                    <hr className="mt-3" />
                    <div className="mt-3">
                        <label htmlFor="idRom" className="block text-base mb-2 ">Mã rom</label>
                        <input id="idRom" className="ct-input" ref={idRef} placeholder="Nhập mã rom" />
                    </div>
                    <div className="mt-3">
                        <label htmlFor="valueRom" className="block text-base mb-2 ">Giá trị rom</label>
                        <input id="valueRom" className="ct-input" ref={valueRef} placeholder="Nhập giá trị của rom" />
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
                                    <th className="border border-slate-300 px-2">Mã rom</th>
                                    <th className="border border-slate-300 px-2">Giá trị rom</th>
                                </tr>
                            </thead>
                            <tbody className="">
                                {roms.map(b => (
                                    <tr className="text-center">
                                        <td className="border border-slate-300 px-2" key={b.rom_id}>
                                            {b.rom_id}
                                        </td>
                                        <td className="border border-slate-300 px-2">
                                            {b.rom_value}
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