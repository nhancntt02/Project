import { useRef } from "react";
import axiosClient from "../axios-client";
import { FaArrowLeft } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import ErrorNotification from "../components/ErrorNotification";
export default function Home() {
    const navigate = useNavigate();
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
                idRef.current.value = "";
                nameRef.current.value = "";
            })
            .catch(err => {
                handleError();
                idRef.current.value = "";
                nameRef.current.value = "";
                console.error(err);
            });
    }
    
    const [addError, setAddError] = useState(null);
    
        const handleError = () => {
            setAddError(true);
            setTimeout(() => {
                setAddError(false);
            }, 3000); // Ẩn thông báo sau 3 giây
        };
   
    return (
        <div className="">
             {addError && <ErrorNotification/>}
            <div className="ml-2">
                <button onClick={() => navigate(-1)}><FaArrowLeft className="text-2xl" /></button>
            </div>
            <div className="max-w-md mx-auto p-6 bg-white shadow-md rounded-lg">
                <form onSubmit={onSubmit} className="flex flex-col justify-center">
                    <h1 className="text-2xl font-bold text-gray-800 mb-4">
                        Thêm phương thức thanh toán
                    </h1>
                    <div className="mb-4">
                        <label className="block text-gray-700 font-medium mb-2">Mã thanh toán</label>
                        <input className="w-full p-2 border border-gray-300 rounded-md" ref={idRef} placeholder="Nhập mã phương thức thanh toán" />
                    </div>
                    <div className="mb-4">
                        <label className="block text-gray-700 font-medium mb-2">Tên gọi phương thức thanh toán</label>
                        <input className="w-full p-2 border border-gray-300 rounded-md" ref={nameRef} placeholder="Nhập phương phức thanh toán" />
                    </div>

                    <button className="rounded-md bg-green-500 w-20 mx-auto">Lưu</button>
                </form>
            </div>
        </div>
    );
}