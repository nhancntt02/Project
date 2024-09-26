import { useEffect, useRef, useState } from "react";
import { useParams } from "react-router-dom"
import axiosClient from "../axios-client";
import { useNavigate } from 'react-router-dom';
import ErrorNotification from "../components/ErrorNotification";

export default function AddDetailForm() {
    const data = useParams();
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const product_idRef = useRef();
    const detail_quantityRef = useRef();
    const supplier_idRef = useRef();
    const detail_priceRef = useRef();
    const navigate = useNavigate();
    const [addError, setAddError] = useState(null);
    const [supplier, setSupplier] = useState([]);


    useEffect(() => {
        getSupplier();
        getProducts();
    }, [])

    const getSupplier = async () => {
        const res = await axiosClient.get('/suppliers');
        setSupplier(res.data.data);
    }


    const getProducts = async () => {
        setLoading(true);
        try {
            const res = await axiosClient.get('/products');
            setProducts(res.data.data);
            setLoading(false);
        } catch (error) {
            console.error('Error fetching pin:', error);
            setError(error);
            setLoading(false);
        }
    };

    const onSubmit = async (ev) => {
        ev.preventDefault();

        const payload = {
            fap_id: data.id,
            product_id: product_idRef.current.value,
            supplier_id: supplier_idRef.current.value,
            detail_quantity: detail_quantityRef.current.value,
            detail_price: detail_priceRef.current.value
        }

        try {
            const res = await axiosClient.post('/add/detail', payload);
            alert(res.data.message);
            if (confirm('Bạn có muốn thêm sản phẩm khác vào phiếu nhập')) {
                detail_priceRef.current.value = "";
                detail_quantityRef.current.value = "";
            } else {
                navigate('/fap');
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
            <div className=" flex justify-center items-center">
                <div className="w-[600px] p-6 shadow-lg rounded-md"  >
                    <h1 className="text-center font-bold text-xl">
                        Thêm chi tiết phiếu nhập
                    </h1>
                    <hr className="mt-3" />
                    <div className="mt-3">
                        <label htmlFor="spp" className="block text-base mb-2 ">Sản phẩm</label>
                        <select id="spp" className="ct-select-1" ref={product_idRef}>
                            <option className="text-sm text-gray-900 dark:text-white" defaultValue="" key="">Chọn sản phẩm</option>
                            {
                                products.map(product => (
                                    <option className="text-sm text-gray-900 dark:text-white" value={product.product_id} key={product.product_id} >{product.product_name}</option>
                                ))
                            }
                        </select>
                    </div>
                    <div className="mt-3">
                        <label htmlFor="qtt" className="block text-base mb-2 ">Số lượng</label>
                        <input id="qtt" className="ct-input" type="number" ref={detail_quantityRef} placeholder="Nhập số lượng sản phẩm" />
                    </div>
                    <div className="mt-3">
                        <label htmlFor="price" className="block text-base mb-2 ">Giá nhập</label>
                        <input id="price" className="ct-input" type="number" ref={detail_priceRef} placeholder="Nhập giá sản phẩm" />
                    </div>
                    <div className="mt-3">
                        <label htmlFor="ncc" className="block text-base mb-2 ">Nhà cung cấp</label>
                        <select id="ncc" className="ct-select-1" ref={product_idRef}>
                            <option className="text-sm text-gray-900 dark:text-white" defaultValue="" key="">Chọn nhà cung cấp</option>
                            {
                                supplier.map(s => (
                                    <option className="text-sm text-gray-900 dark:text-white" value={s.supplier_id} key={s.supplier_id} >{s.supplier_name}</option>
                                ))
                            }
                        </select>
                    </div>
                    <div className="mt-3 flex justify-center items-center">
                        <button onClick={onSubmit} className="rounded-md bg-blue-300 w-20 mx-auto">Tạo</button>
                    </div>


                </div>
            </div>

        </div>
    )
}