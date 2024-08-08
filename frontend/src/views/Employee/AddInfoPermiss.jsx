import { useRef, useEffect } from "react";
import axiosClient from "../../axios-client";
import { useStateContext } from "../../contexts/ContextProvider";

export default function InfoPermiss() {

    const idEmployeeRef = useRef();
    const valueRef = useRef();
    const idPermissRef = useRef();
    const {user, setUser} = useStateContext();

    useEffect(() => {
        axiosClient.get('/user')
        .then(({data}) => {
            setUser(data);
        })
    }, [])

    const onSubmit = (ev) => {
        ev.preventDefault();
        const payload = {
            permiss_id: idPermissRef.current.value,
            infopermiss_value: valueRef.current.value,
            employee_id: idEmployeeRef.current.value
        }
        console.log(payload);
        axiosClient.post(`/add/infopermiss/${user.id}`, payload)
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
                        <label className="block text-base mb-2 ">Mã quyền</label>
                        <input className="ct-input" ref={idPermissRef} placeholder="Nhập mã quyền " />
                    </div>
                    <div className="mt-3">
                        <label className="block text-base mb-2 ">Mô tả quyền</label>
                        <input className="ct-input" ref={valueRef} placeholder="Nhập tên quyền" />
                    </div>
                    <div className="mt-3">
                        <label className="block text-base mb-2 ">Mã nhân viên nhận quyền</label>
                        <input className="ct-input" ref={idEmployeeRef} placeholder="Nhập tên quyền" />
                    </div>
                    <div className="mt-3 flex justify-center items-center">
                        <button onClick={onSubmit} className="rounded-md bg-green-500 w-20 mx-auto">Lưu</button>
                    </div>

                </div>
            </div>
        </div>
    );
}