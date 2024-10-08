import { useRef, useState, useEffect } from "react";
import axiosClient from "../axios-client";
import { FaArrowLeft } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import ErrorNotification from "../components/ErrorNotification";
export default function Home() {
    const [cams, setCams] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const idRef = useRef();
    const valueRef = useRef();
    const navigate = useNavigate();

    const [addError, setAddError] = useState(null);

    useEffect(() => {
        getCams();
    }, []);

    const getCams = () => {
        setLoading(true);
        axiosClient.get('/camera')
            .then(({ data }) => {
                setCams(data.data);
                setLoading(false);
            })
            .catch(error => {
                console.error('Error fetching cams:', error);
                setError(error);
                setLoading(false);
            });
    }

    const onSubmit = async (ev) => {
        ev.preventDefault();
        const payload = {
            cam_id: idRef.current.value,
            cam_value: valueRef.current.value
        }
        try {
            const res = await axiosClient.post('/add/camera', payload);
            alert(res.data.message);
            idRef.current.value = "";
            valueRef.current.value = "";
            getCams();
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
            {addError && <ErrorNotification />}
            <div className="ml-2">
                <button onClick={() => navigate(-1)}><FaArrowLeft className="text-2xl" /></button>
            </div>
            <div className=" flex justify-center items-center">
                <div className="w-96 p-6 shadow-lg rounded-md"  >
                    <h1 className="text-center font-bold text-xl">
                        Thêm giá trị cho camera
                    </h1>
                    <hr className="mt-3" />
                    <div className="mt-3">
                        <label htmlFor="idcam" className="block text-base mb-2 ">Mã camera</label>
                        <input id="idcam" className="ct-input" ref={idRef} placeholder="Nhập mã camera " />
                    </div>
                    <div className="mt-3">
                        <label htmlFor="valuecam" className="block text-base mb-2 ">Giá trị camera</label>
                        <input id="valuecam" className="ct-input" ref={valueRef} placeholder="Nhập giá trị cho camera " />
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
                                    <th className="border border-slate-300 px-2">Mã camera</th>
                                    <th className="border border-slate-300 px-2">Giá trị camera</th>
                                </tr>
                            </thead>
                            <tbody className="">
                                {cams.map(b => (
                                    <tr className="text-center">
                                        <td className="border border-slate-300 px-2" key={b.cam_id}>
                                            {b.cam_id}
                                        </td>
                                        <td className="border border-slate-300 px-2">
                                            {b.cam_value}
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