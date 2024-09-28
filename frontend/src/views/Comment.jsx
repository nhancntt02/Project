import { useEffect, useState } from "react"
import axiosClient from "../axios-client";
import { useNavigate } from "react-router-dom";
export default function Comment() {
    const [rate, setRate] = useState([]);
    const [products, setProducts] = useState([]);
    const navigate = useNavigate();


    useEffect(() => {
        getRate();
        getProduct();
    }, []);

    const getRate = async () => {
        try {
            const res = await axiosClient.get('/rating');
            setRate(res.data.data);
        } catch (error) {
            console.log(error);
        }
    }

    const getProduct = async () => {
        try {
            const res = await axiosClient.get('/products');
            setProducts(res.data.data);
        } catch (error) {
            console.log(error);
        }
    }

    const listComment = (product_id) => {
        navigate(`/listcomment/${product_id}`);
    }

    return (
        <div className="container h-screen">
            <div className="h-[16%] border-b flex justify-center items-center bg-bgheader-200">
                <div className="text-bgheader-300 text-center text-4xl my-4 font-semibold">Quản lý bình luận</div>
            </div>
            <div className="">
                <div className="text-2xl font-bold text-center my-6 mb-5">
                    Danh sách sản phẩm và bình luận
                </div>
                <div className="container mx-auto ">
                    {
                        products.map((product, index) => (
                            <div onClick={() => { listComment(product.product_id) }} key={index} className="border border-gray-300 py-2 hover:border-2 hover:border-gray-500 hover:cursor-pointer">
                                <div className="w-[80%] mx-auto grid grid-cols-4 gap-4">
                                    {/* STT */}
                                    <div className="font-medium">
                                        STT: {index + 1}
                                    </div>

                                    {/* Tên sản phẩm */}
                                    <div className="col-span-2 ">
                                        Tên sản phẩm: <span className="font-semibold text-lg">{product.product_name}</span>
                                    </div>

                                    {/* Số bình luận */}
                                    <div className="text-right">
                                        Số bình luận: {rate.filter(r => r.product_id === product.product_id)?.length}
                                    </div>
                                </div>
                            </div>
                        ))
                    }
                </div>

            </div>
        </div>
    )
}