import { useRef } from "react";
import axiosClient from "../../axios-client";
export default function Permiss() {

    const idRef = useRef();
    const valueRef = useRef();

    const onSubmit = (ev) => {
        ev.preventDefault();
        const payload = {
            permiss_id: idRef.current.value,
            permiss_name: valueRef.current.value
        }
        axiosClient.post('/add/permiss', payload)
            .then(({ data }) => {
                console.log(data);
            })
            .catch((error) => {
                console.error(error);
            });
    }

    return (
        <div>
            <div className=" flex justify-center items-center">
                <div className="w-96 p-6 shadow-lg rounded-md"  >
                    <h1 className="text-center font-bold text-xl">
                        Thêm quyền
                    </h1>
                    <hr className="mt-3" />
                    <div className="mt-3">
                        <label for="idcam" className="block text-base mb-2 ">Mã quyền</label>
                        <input id="idcam" className="ct-input" ref={idRef} placeholder="Nhập mã quyền " />
                    </div>
                    <div className="mt-3">
                        <label for="valuecam" className="block text-base mb-2 ">Tên quyền</label>
                        <input id="valuecam" className="ct-input" ref={valueRef} placeholder="Nhập tên quyền" />
                    </div>
                    <div className="mt-3 flex justify-center items-center">
                        <button onClick={onSubmit} className="rounded-md bg-green-500 w-20 mx-auto">Lưu</button>
                    </div>

                </div>
            </div>
        </div>
    );
}