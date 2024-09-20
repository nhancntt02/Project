import { useEffect, useRef, useState } from "react";
import { useStateContext } from "../contexts/ContextProvider";
import axiosClient from "../axios-client";
import { useNavigate } from 'react-router-dom';
import ErrorNotification from "../components/ErrorNotification";
export default function AddForm() {
    const { user, setUser } = useStateContext();
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const navigate = useNavigate();
    const contentRef = useRef();
    const create_dateRef = useRef();
    const confirm_dateRef = useRef();
    const statusRef = useRef();
    const totalAmountRef = useRef();
    const employee_idRef = useRef();
    const supplier_idRef = useRef();
    const [addError, setAddError] = useState(null);


    useEffect(() => {
        axiosClient.get('/user')
            .then(({ data }) => {
                setUser(data);
                console.log(data);
            })
    }, [])

    const onSubmit = async (ev) => {
        ev.preventDefault();

        const now = new Date();
        const payload = {
            fap_content: contentRef.current.value,
            fap_date_create: now.toISOString().substr(0, 10),
            //fap_date_confirm: null,
            fap_status: 0,
            fap_total_amount: 0,
            employee_id: user.id,
            supplier_id: supplier_idRef.current.value
        };

        try {
            const res = await axiosClient.post('/add/form', payload);
            const data = res.data.data;
            if (data) {
                // if(confirm('Tiếp theo sẽ thêm sản phẩm vào phiếu nhập')){
                navigate(`/add/detail/${data?.id}`)
                //  }
            }


        } catch (error) {
            handleError();
            console.log(error);
        }
    }
    const handleError = () => {
        setAddError(true);
        setTimeout(() => {
            setAddError(false);
        }, 3000); // Ẩn thông báo sau 3 giây
    };
    return (
        <div className="">




            {addError && <ErrorNotification />}
            <div className="flex justify-center items-center">
                <div className="w-96 p-6 shadow-lg rounded-md "  >
                    <h1 className="text-center font-bold text-xl">
                        Tạo phiếu nhập
                    </h1>
                    <hr className="mt-3" />
                    <div className="mt-3">
                        <label htmlFor="spp" className="block text-base mb-2 ">Nhà cung cấp</label>
                        <input id="spp" className="ct-input" ref={supplier_idRef} placeholder="Nhập nhà cung cấp" />
                    </div>
                    <div className="mt-3">
                        <label htmlFor="content" className="block text-base mb-2 ">Nội dung</label>
                        <textarea id="content" className="ct-input" ref={contentRef} placeholder="Nội dung phiếu nhập" />
                    </div>
                    <div className="mt-3 flex justify-center items-center">
                        <button onClick={onSubmit} className="rounded-md bg-blue-300 w-20 mx-auto">Tạo</button>
                    </div>

                </div>

            </div>
        </div>
    )
}