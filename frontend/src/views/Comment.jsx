import { useEffect, useRef, useState } from "react"
import axiosClient from "../axios-client";
import { useNavigate } from "react-router-dom";
import { FaStar, FaRegStar, FaTrashAlt } from "react-icons/fa";
import { BiSortAlt2 } from 'react-icons/bi';
import BarChart from "../components/BarChart"
export default function Comment() {
    const [rate, setRate] = useState([]);
    const [arr, setArr] = useState([]);
    const searchRef = useRef();
    const [sortType, setSortType] = useState(false);

    useEffect(() => {
        getRate();
    }, []);

    const getRate = async () => {
        try {
            const res = await axiosClient.get('/rating');
            console.log(res.data.data);
            setRate(res.data.data);
            setArr(res.data.data);
        } catch (error) {
            console.log(error);
        }
    }

    const searchProduct = async () => {
        const searchValue = searchRef.current.value;
        if (searchValue == "") {
            setRate(arr);
        } else {
            let filteredProducts = arr.filter(item => item.product?.product_name.toLowerCase().includes(searchValue.toLowerCase()));
            setRate(filteredProducts);
        }

    }
    const sortList = () => {

        const sortedDiscount = [...rate];

        sortedDiscount.sort((a, b) => {
            if (sortType) {
                return a.order_id - b.order_id;
            } else {
                return b.order_id - a.order_id;
            }
        });

        setSortType(!sortType);
        setRate(sortedDiscount);
    };

    const deleteRate = async (rate_id) => {
        try {
            const res = await axiosClient.delete(`/delete/rate/${rate_id}`);
            if (res.status == 200) {
                getRate();
            }
        } catch (error) {
            console.log(error);
        }
    }

    return (
        <div className="container h-screen">
            <div className="h-[10%] border-b flex justify-center items-center bg-bgheader-200">
                <div className="text-bgheader-300 text-center text-4xl my-4 font-semibold">Quản lý đánh giá</div>
            </div>
            <div className="p-4">
                <div className="w-full">
                    <div className="w-full p-4 bg-slate-100">
                        <BarChart rateData={arr} />
                    </div>

                </div>
                <div className="flex justify-between items-center px-4 border bg-bgheader-400 rounded my-4">
                    <div className="text-2xl font-bold">
                        Danh sách tất cả đánh giá
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
                </div>
                <div>
                    {
                        rate.length > 0 ? (
                            <div className="border  w-full max-h-[400px] overflow-auto rounded-t">
                                {/* Tiêu đề bảng */}
                                <div className="grid grid-cols-11 bg-blue-500 text-white font-bold text-center">
                                    <div className="border py-2">ID <BiSortAlt2 onClick={sortList} className="inline text-xl hover:cursor-pointer hover:text-gray-500" /></div>


                                    <div className="col-span-2 border text-left p-2">Người đánh giá</div>
                                    <div className="col-span-2 border p-2">Tên sản phẩm</div>

                                    <div className="border py-2">Ngày đánh giá</div>
                                    <div className="border p-2">Số sao</div>
                                    <div className="col-span-3 border p-2">Nội dung</div>
                                    <div className="col-span-1 border p-2">Xóa</div>

                                </div>

                                {/* Nội dung bảng */}
                                {
                                    rate.map((item, index) => (
                                        <div
                                            key={index}
                                            className={`grid grid-cols-11 ${index % 2 === 0 ? 'bg-gray-100' : 'bg-white'} text-left`}
                                        >
                                            <div className="border  p-2 text-center">
                                                {item.order_id}
                                            </div>
                                            <div className="col-span-2 border  font-bold p-2">
                                                {item.customer?.name}
                                            </div>
                                            <div className="col-span-2 border   p-2">
                                                {item.product?.product_name}
                                            </div>
                                            <div className="border  p-2 text-center">
                                                {item.rate_date}
                                            </div>


                                            <div className="border  p-2 text-center flex">
                                                {[...Array(5)].map((_, starIndex) => {
                                                    const starRating = starIndex + 1;
                                                    return (
                                                        starRating <= item.rate_rating ? (
                                                            <FaStar
                                                                key={starIndex}
                                                                className="text-xl text-yellow-500" // Ngôi sao đầy
                                                            />
                                                        ) : (
                                                            <FaRegStar
                                                                key={starIndex}
                                                                className="text-xl text-yellow-500" // Ngôi sao có viền
                                                            />
                                                        )
                                                    );
                                                })}
                                            </div>
                                            <div className="col-span-3 border  p-2">
                                                {item.rate_comment}
                                            </div>

                                            <div className="col-span-1 border  p-2 flex justify-center">
                                                <FaTrashAlt onClick={() => deleteRate(item.rate_id)} className="text-red-500 hover:cursor-pointer hover:text-red-700" />
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