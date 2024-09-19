import { useEffect, useState } from "react"
import axiosClient from "../axios-client";
export default function Comment() {
    const [rate, setRate] = useState([]);
    const [products, setProducts] = useState([]);


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

    const listComment = (product_id) =>  {
        
    }

    return (
        <div className="">
            <div className="container">
                <div className="text-2xl font-bold text-center my-6 mb-5">
                    Danh sách sản phẩm và bình luận
                </div>
                <div className="container mx-auto ">
                    {
                        products.map((product, index) => (
                            <div onClick={() => {listComment(product.product_id)}} key={index} className="border border-gray-300 py-2 hover:cursor-pointer">
                                <div className="w-[80%] mx-auto grid grid-cols-4 gap-4">
                                    {/* STT */}
                                    <div className="font-medium">
                                        STT: {index + 1}
                                    </div>

                                    {/* Tên sản phẩm */}
                                    <div className="col-span-2 font-semibold text-lg">
                                        Tên: {product.product_name}
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