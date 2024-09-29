import { useEffect, useRef, useState } from "react"
import axiosClient from "../axios-client";
import { useNavigate } from "react-router-dom";
import { FaStar } from "react-icons/fa";
import BarChart from "../components/BarChart"
export default function Comment() {
    const [rate, setRate] = useState([]);
    const searchRef = useRef();


    useEffect(() => {
        getRate();
    }, []);

    const getRate = async () => {
        try {
            const res = await axiosClient.get('/rating');
            setRate(res.data.data);
        } catch (error) {
            console.log(error);
        }
    }

    const searchProduct = async () => {
        const searchValue = searchRef.current.value;
        if (searchValue == "") {
            getRate();
        } else {
            try {
                const res = await axiosClient.get(`/search/rating/${searchValue}`);
                setRate(res.data.data);
            } catch (error) {
                console.log(error);
            }
        }

    }

    return (
        <div className="container h-screen">
            <div className="h-[16%] border-b flex justify-center items-center bg-bgheader-200">
                <div className="text-bgheader-300 text-center text-4xl my-4 font-semibold">Quản lý bình luận</div>
            </div>
            <div className="p-4">
                <div className="w-fit border mx-auto border-red-200">
                    <div className="w-[600px]">
                        <BarChart />
                    </div>

                </div>
                <div className="flex gap-4 py-4">
                    <input
                        type="text"
                        placeholder="Nhập tên sản phẩm bạn muốn tìm kiếm"
                        className="p-2 border min-w-[300px] border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                        ref={searchRef}
                    />
                    <button
                        onClick={searchProduct}
                        className="bg-blue-500 text-white p-2 rounded-lg hover:bg-blue-600"
                    >
                        Tìm kiếm
                    </button>
                </div>
                <div>
                    {
                        rate.length > 0 ? (
                            <div className="border border-black w-full max-h-[200px] overflow-auto">
                                {/* Tiêu đề bảng */}
                                <div className="grid grid-cols-11 bg-gray-200 font-bold text-center">
                                    <div className="col-span-2 border border-black p-2">Tên sản phẩm</div>
                                    <div className="border border-black py-2">Mã đơn hàng</div>
                                    <div className="col-span-2 border border-black p-2">Người đánh giá</div>
                                    <div className="col-span-2 border border-black p-2">Email người đánh giá</div>
                                    <div className="border border-black p-2">Số sao</div>
                                    <div className="col-span-2 border border-black p-2">Bình luận</div>
                                    <div className="border border-black py-2">Ngày đánh giá</div>
                                </div>

                                {/* Nội dung bảng */}
                                {
                                    rate.map((item, index) => (
                                        <div
                                            key={index}
                                            className={`grid grid-cols-11 ${index % 2 === 0 ? 'bg-gray-50' : 'bg-white'} text-left`}
                                        >
                                            <div className="col-span-2 border border-gray-600 p-2">
                                                {item.product?.product_name}
                                            </div>
                                            <div className="border border-gray-600 p-2 text-center">
                                                {item.order_id}
                                            </div>
                                            <div className="col-span-2 border border-gray-600 p-2">
                                                {item.customer?.name}
                                            </div>
                                            <div className="col-span-2 border border-gray-600 p-2">
                                                {item.customer?.email}
                                            </div>
                                            <div className="border border-gray-600 p-2 text-center flex">
                                                {[...Array(5)].map((_, starIndex) => {
                                                    const starRating = starIndex + 1;
                                                    return (
                                                        <FaStar
                                                            key={starIndex}
                                                            className={`text-xl ${starRating <= item.rate_rating ? 'text-yellow-500' : 'text-gray-400'}`}
                                                        />
                                                    );
                                                })}
                                            </div>
                                            <div className="col-span-2 border border-gray-600 p-2">
                                                {item.rate_comment}
                                            </div>
                                            <div className="border border-gray-600 p-2 text-center">
                                                {item.rate_date}
                                            </div>
                                        </div>
                                    ))
                                }
                            </div>
                        ) : (
                            <div>
                                <p className="text-center text-2xl font-bold">Không có đánh giá nào</p>
                            </div>
                        )
                    }

                </div>
            </div>

            {/* <div className="">
                <div className="text-2xl font-bold text-center my-6 mb-5">
                    Danh sách sản phẩm và bình luận
                </div>
                <div className="container mx-auto ">
                    {
                        products.map((product, index) => (
                            <div onClick={() => { listComment(product.product_id) }} key={index} className="border border-gray-300 py-2 hover:border-2 hover:border-gray-500 hover:cursor-pointer">
                                <div className="w-[80%] mx-auto grid grid-cols-4 gap-4">
                                   
                                    <div className="font-medium">
                                        STT: {index + 1}
                                    </div>

                                    
                                    <div className="col-span-2 ">
                                        Tên sản phẩm: <span className="font-semibold text-lg">{product.product_name}</span>
                                    </div>

                                    
                                    <div className="text-right">
                                        Số bình luận: {rate.filter(r => r.product_id === product.product_id)?.length}
                                    </div>
                                </div>
                            </div>
                        ))
                    }
                </div>

            </div> */}
        </div>
    )
}