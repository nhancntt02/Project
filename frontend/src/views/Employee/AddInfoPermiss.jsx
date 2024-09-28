import { useState, useRef, useEffect } from "react";
import axiosClient from "../../axios-client";
import { useStateContext } from "../../contexts/ContextProvider";
import { FaArrowLeft } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
export default function InfoPermiss() {

    const idEmployeeRef = useRef();
    const valueRef = useRef();
    const idPermissRef = useRef();
    const {user, setUser} = useStateContext();
    const [permiss, setPermiss] = useState([]);
    const navigate = useNavigate();
    useEffect(() => {
        getPermiss();
        axiosClient.get('/user')
        .then(({data}) => {
            setUser(data);
        })
    }, [])

    const getPermiss = () => {
        axiosClient.get('/permiss')
        .then(({data}) => {
            setPermiss(data.data);
            })
        .catch(err => {
            console.error(err);
        })
            
    }

    const onSubmit = (ev) => {
        ev.preventDefault();
        const payload = {
            permiss_id: idPermissRef.current.value,
            employee_id: idEmployeeRef.current.value
        }
        console.log(payload);
        axiosClient.post(`/add/infopermiss`, payload)
            .then(({ data }) => {
                console.log(data);
            })
            .catch((error) => {
                console.error(error);
            });
    }


    return (
       <div>
                    <div className="ml-2">
                <button onClick={() => navigate(-1)}><FaArrowLeft className="text-2xl" /></button>
            </div>
            <div className=" flex justify-center items-center">
                <div className="w-96 p-6 shadow-lg rounded-md"  >
                    <h1 className="text-center font-bold text-xl">
                        Thêm quyền
                    </h1>
                    <hr className="mt-3" />
                    <div className="mt-3">
                        <label className=" ct-label ">Quyền</label>
                        <select className="ct-select-1" name="" id="">
                            <option value="" key="">Chọn quyền cho nhân viên</option>
                            {
                                permiss.map(item => (
                                    <option value={item.permiss_id} key={item.permiss_id}>{item.permiss_name}</option>
                                ))
                            }
                        </select>
                    </div>
                    <div className="mt-3">
                        <label className="ct-label ">Mô tả quyền</label>
                        <input className="ct-input" ref={valueRef} placeholder="Nhập tên quyền" />
                    </div>
                    <div className="mt-3">
                        <label className="ct-label ">Mã nhân viên nhận quyền</label>
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