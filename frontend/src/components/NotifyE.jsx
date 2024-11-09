import { useEffect, useState } from "react"
import axiosClient from "../axios-client";

export default function NotifyE() {
    const [notify, setNotify] = useState([]);
    const employee_id = sessionStorage.getItem('employeeId');
    const [visible, setVisible] = useState('');
    const [indexC, setIndexC] = useState(-1);

    useEffect(() => {
        getNotify();
    }, [])

    const getNotify = async () => {
        try {
            const res = await axiosClient.get(`/notify/${employee_id}`);
            console.log(res.data.data)
            setNotify(res.data.data);
        } catch (error) {
            console.log(error);
        }
    }


    const seenNotify = async (index) => {
        setVisible(notify[index]?.notify_content);
        const arr = {
            ...notify[index],
            notify_status: 1
        }
        notify[index] = arr;
        setNotify([...notify]);
        await axiosClient.put(`/update/notify/${notify[index]?.notify_id}`);
    }

    return (
        <div className="container">
            <div className="grid grid-cols-3 h-[100vh] bg-bgheader-400">
                <div className="col-span-1 border-r border-gray-600">
                    {
                        notify.map((item, index) => (
                            <div onClick={() => { seenNotify(index); setIndexC(index); }} className={`${indexC == index ? 'bg-slate-300' : ''} relative w-full border border-gray-600 p-4 font-semibold hover:bg-slate-300 hover:cursor-pointer`}
                                key={index}>
                                <div>
                                    {
                                        item.notify_title
                                    }
                                </div>
                                <div>
                                    {
                                        item.notify_status == 0 && (
                                            <div className="absolute right-5 top-4 text-sm w-[20px] text-white bg-red-600 rounded-full text-center">
                                                !
                                            </div>
                                        )
                                    }
                                </div>
                            </div>
                        ))
                    }
                </div>
                <div className="col-span-2 p-6 bg-white">


                    <div className="mt-4 text-gray-600">
                        {visible}
                    </div>

                </div>

            </div>
        </div>
    )
}