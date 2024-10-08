import { useRef, useState, useEffect } from "react";
import axiosClient from "../axios-client";
import { FaArrowLeft } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import ErrorNotification from "../components/ErrorNotification";
export default function Home() {
    const [images, setImages] = useState([]);
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [imageURL, setImageURL] = useState('');
    const idRef = useRef();
    const valueRef = useRef();
    const productIdRef = useRef();
    const navigate = useNavigate();
    const [addError, setAddError] = useState(null);

    useEffect(() => {
        getImgaes();
        getProducts();
    }, []);

    const getProducts = () => {
        setLoading(true);
        axiosClient.get('/products')
            .then(({ data }) => {
                setProducts(data.data);
                setLoading(false);
            })
            .catch(error => {
                console.error('Error fetching pin:', error);
                setError(error);
                setLoading(false);
            });
    }

    const getImgaes = () => {
        setLoading(true);
        axiosClient.get('/images')
            .then(({ data }) => {
                setImages(data.data);
                setLoading(false);
            })
            .catch(error => {
                console.error('Error fetching image:', error);
                setError(error);
                setLoading(false);
            });
    }

    const handleURLChange = (event) => {
        setImageURL(event.target.value);
    };

    const onSubmit = async (ev) => {

        ev.preventDefault();
        const payload = {
            image_id: idRef.current.value,
            image_value: valueRef.current.value,
            product_id: productIdRef.current.value
        }
        try {
            const res = await axiosClient.post('/add/image', payload);
            alert(res.data.message);
            getImgaes();
            idRef.current.value = "";
            valueRef.current.value = "";
            setImageURL("");
        } catch (err) {
            handleSuccess();
            idRef.current.value = "";
            valueRef.current.value = "";
            productIdRef.current.value = "";
            setImageURL("");
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
            {addError && <ErrorNotification/>}
            <div className="ml-2">
                <button onClick={() => navigate(-1)}><FaArrowLeft className="text-2xl" /></button>
            </div>
            <div className="flex justify-around items-center">
                <div className="w-96 p-6 shadow-lg rounded-md">
                    <h1 className="text-center font-bold text-xl ">
                        Thêm ảnh cho sản phẩm
                    </h1>
                    <hr className="mt-3" />
                    <div className="mt-3">
                        <label htmlFor="imgid" className="block text-base mb-2 ">Mã ảnh</label>
                        <input id="imgid" className="ct-input" ref={idRef} placeholder="Nhập mã ảnh" />
                    </div>
                    <div className="mt-3">
                        <label htmlFor="imgurl" className="block text-base mb-2 ">URL của ảnh</label>
                        <input id="imgurl" className="ct-input" onChange={handleURLChange} ref={valueRef} placeholder="URL của ảnh" />
                    </div>
                    <div className="mt-3">
                        <label className="block text-base mb-2 ">Ảnh</label>
                        <img src={imageURL} alt="" />
                    </div>
                    <div className="mt-3">
                        <label htmlFor="idproduct" className="block text-base mb-2 ">Sản phẩm</label>
                        <select id="idproduct" ref={productIdRef}>
                            <option key="" value="">Chọn sản phẩm</option>
                            {
                                products.map(product => (
                                    <option key={product.product_id} value={product.product_id}>{product.product_name}</option>
                                ))
                            }
                        </select>
                    </div>
                    <div className="mt-3 flex justify-center items-center">
                        <button onClick={onSubmit} className="rounded-md bg-green-500 w-20 mx-auto">Lưu</button>
                    </div>

                </div>

                <div className="flex justify-center mt-5">
                    {loading ? (
                        <p>Loading...</p>
                    ) : error ? (
                        <p>Error: {error.message}</p>
                    ) : (
                        <div className="h-[400px] overflow-y-scroll">
                            <table className=" border-collapse border border-slate-400  ">
                                <thead>
                                    <tr>
                                        <th className="border border-slate-300 ...">Mã ảnh</th>
                                        <th className="border border-slate-300 ...">Ảnh</th>
                                        <th className="border border-slate-300 ...">Mã sản phẩm</th>
                                    </tr>
                                </thead>

                                <tbody >
                                    {images.map(b => (
                                        <tr className="">
                                            <td className="border border-slate-300 ..." key={b.image_id}>
                                                {b.image_id}
                                            </td>
                                            <td className="border border-slate-300 ... w-20"><img src={b.image_value} alt="" /></td>
                                            <td className="border border-slate-300 ...">
                                                {b.product_id}
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>

                    )}
                </div></div>
        </div>
    );
}