import { useRef, useState, useEffect } from "react";
import axiosClient from "../axios-client";

export default function Home() {
    const [screens, setScreens] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const idRef = useRef();
    const valueRef = useRef();

    useEffect(() => {
        getScreens();
    }, []);

    const getScreens = () => {
        setLoading(true);
        axiosClient.get('/screens')
            .then(({ data }) => {
                setScreens(data.data);
                setLoading(false);
            })
            .catch((error) => {
                console.error('Error fetching screen:', error);
                setError(error);
                setLoading(false);
            });
    };

    const onSubmit = async (ev) => {
        ev.preventDefault();
        const payload = {
            screen_id: idRef.current.value,
            screen_value: valueRef.current.value
        }
        try {
            const res = await axiosClient.post('/add/screen', payload);
            alert(res.data.message);
            getScreens();
            idRef.current.value = "";
            valueRef.current.value = "";
        } catch (err) {
            console.error(err);
        }
    }

    return (
        <div className="">
            <div className="flex justify-center items-center">
                <div className="w-96 p-6 shadow-lg rounded-md">
                    <h1 className="text-center font-bold text-xl ">
                        Thêm giá trị cho screen
                    </h1>
                    <hr className="mt-3" />
                    <div className="mt-3">
                        <label for="idscreen" className="block text-base mb-2 ">Mã screen</label>
                        <input id="idscreen" className="ct-input" ref={idRef} placeholder="Nhập mã screen" />
                    </div>
                    <div className="mt-3">
                        <label for="valuescreen" className="block text-base mb-2 ">Giá trị screen</label>
                        <input id="valuescreen" className="ct-input" ref={valueRef} placeholder="Nhập giá trị của screen" />
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
                                    <th className="border border-slate-300 px-2">Mã screen</th>
                                    <th className="border border-slate-300 px-2">Giá trị screen</th>
                                </tr>
                            </thead>
                            <tbody className="">
                                {screens.map(b => (
                                    <tr className="text-center">
                                        <td className="border border-slate-300 px-2" key={b.screen_id}>
                                            {b.screen_id}
                                        </td>
                                        <td className="border border-slate-300 px-2">
                                            {b.screen_value}
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