import { useRef } from "react";
import axiosClient from "../axios-client";

export default function Home() {

    const idRef = useRef();
    const nameRef = useRef();

    const onSubmit = (ev) => {
        ev.preventDefault();
        const payload = {
            id: idRef.current.value,
            payment_name: nameRef.current.value
        }
        axiosClient.post('/add/payment', payload)
            .then(({ data }) => {
                console.log(data)
            })
            .catch(err => {
                console.error(err);
            });
    }

    return (
        <div className="">
            <div className="">
                <form onSubmit={onSubmit} className="flex flex-col justify-center">
                    <h1 className="text-center text-2xl font-bold text-red-600 ">
                        Thêm phương thức thanh toán
                    </h1>
                    <div className=" my-1">
                        <input className="block w-full rounded-md border py-1.5 pl-7 pr-20 text-gray-900 "ref={idRef}  placeholder="Mã phương thức" />
                    </div>
                    <div className=" my-1">
                        <input className="block w-full rounded-md border py-1.5 pl-7 pr-20 text-gray-900"ref={nameRef}  placeholder="NHập phương phức thanh toán" />
                    </div>
                    
                        <button className="rounded-full bg-green-500 w-14 mx-auto">Lưu</button>
                </form>
            </div>
        </div>
    );
}