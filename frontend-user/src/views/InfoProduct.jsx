import { useParams } from "react-router-dom"
import { useStateContext } from "../contexts/ContextProvider";
import { useEffect, useState } from "react";
import axiosClient from "../axios-client";
import { FaShoppingCart } from "react-icons/fa";
import { FaUserCircle, FaStar } from "react-icons/fa";

export default function infoProduct() {
    const productId = useParams().product_id;
    const [product, setProduct] = useState([]);
    const [images, setImages] = useState([]);
    const [loading, setLoading] = useState(false);
    const [rating, setRating] = useState([]);
    const [rating2, setRating2] = useState([]);
    const [avgRate, setAvgRate] = useState(0);
    const {setCart} = useStateContext();

    useEffect(() => {
        getProduct();
        getImages();
        getRating();
    }, []);

    const getProduct = async () => {
        setLoading(false);
        try {
            const res = await axiosClient.get(`/product/${productId}`);
            setProduct(res.data.data[0]);

        } catch (error) {
            console.log(error);
            setLoading(true);
        }
    }
    const getImages = async () => {
        setLoading(false);
        try {
            const res = await axiosClient.get(`/images/${productId}`);
            setImages(res.data.data);

        } catch (error) {
            console.log(error);
            setLoading(true);
        }
    }
    const getRating = async () => {
        
        try {
            const res = await axiosClient.get(`/rating/product/${productId}`);
            console.log(res.data.data);
            setRating(res.data.data);
            setRating2(res.data.data);
            setLoading(true);
        } catch (error) {
            console.log(error);
        }
    }

    useEffect(() => {
        let avg = 0;
        rating.forEach(
            (item) => {
                avg += item.rate_rating;
            }
        )
        setAvgRate(avg / rating.length);
    }, [rating])



    const [slideIndex, setSlideIndex] = useState(1);

    const plusSlides = (n) => {
        showSlides(slideIndex + n);
    };

    const currentSlide = (n) => {
        showSlides(n);
    };

    const showSlides = (n) => {
        let index = n > images.length ? 1 : n < 1 ? images.length : n;
        setSlideIndex(index);
    };

    useEffect(() => {
        showSlides(slideIndex);
    }, [slideIndex]);


    const rateChange = (i) => {
        if(i == 1) {
            const temp = rating.filter(r => r.rate_rating == 1);
            setRating2(temp);
        }
        if(i == 2) {
            const temp = rating.filter(r => r.rate_rating == 2);
            setRating2(temp);
        }
        if(i == 3) {
            const temp = rating.filter(r => r.rate_rating == 3);
            setRating2(temp);
        }
        if(i == 4) {
            const temp = rating.filter(r => r.rate_rating == 4);
            setRating2(temp);
        }
        if(i == 5) {
            const temp = rating.filter(r => r.rate_rating == 5);
            setRating2(temp);
        }
    }

    const addCart = async (product_id) => {
        const userId = localStorage.getItem('userId');
        const payload = {
            product_id: product_id,
            cart_quantity: 1,
            user_id: userId
        };
        try {
            const res = await axiosClient.post('/add/cart', payload);
            alert(res.data.message);
            setCart();
            //location.reload();
        } catch (error) {
            console.log(error);
        }
    }


    return (
        <div className="container ">
            {
                loading &&
                (
                    <div >
                        <div className="flex">
                            <div className="basis-1/2">
                                <div className=" relative mx-auto max-w-[500px] h-[500px] border">
                                    {images.map((i, index) => (

                                        <div key={index} className={`mySlides fade ${slideIndex === index + 1 ? 'block' : 'hidden'} relative`}>
                                            <div className="numbertext absolute top-0 left-0 text-xs text-gray-300 px-2 py-1">{index + 1} / {images.length}</div>
                                            <div className="flex h-[500px] justify-center items-center">
                                                <img src={i.image_value} className="max-w-[440px]" alt={`Slide ${index + 1}`} />
                                            </div>
                                            <div className="text absolute bottom-1 w-full  text-center font-bold text-gray-700 text-sm px-2 py-1">{product.product_name}</div>
                                        </div>

                                    ))}
                                    <button className="prev absolute left-0 top-1/2 transform -translate-y-1/2 px-4 py-2 text-white font-bold text-lg rounded-r bg-black bg-opacity-50 hover:bg-opacity-80 transition" onClick={() => plusSlides(-1)}>
                                        &#10094;
                                    </button>
                                    <button className="next absolute right-0 top-1/2 transform -translate-y-1/2 px-4 py-2 text-white font-bold text-lg rounded-l bg-black bg-opacity-50 hover:bg-opacity-80 transition" onClick={() => plusSlides(1)}>
                                        &#10095;
                                    </button>
                                </div>
                                <br />
                                <div className="flex justify-center space-x-2">
                                    {images.map((_, index) => (
                                        <span
                                            key={index}
                                            className={`dot h-4 w-4 bg-gray-400 rounded-full cursor-pointer transition-all duration-600 ${slideIndex === index + 1 ? 'bg-gray-600' : 'hover:bg-gray-600'}`}
                                            onClick={() => currentSlide(index + 1)}
                                        ></span>
                                    ))}
                                </div>
                            </div>
                            <div className="basis-1/2 bg-gray-100 p-6 rounded-lg max-h-[500px]">
                                {product.product_quantity > 0 ? (
                                    <div>
                                        <div onClick={() => {addCart(product.product_id)}} className="flex w-fit gap-2 items-center bg-blue-500 py-2 px-4 rounded hover:bg-blue-600 transition">
                                            <FaShoppingCart  className="text-lg text-white" />
                                            <button className="text-white">
                                                Thêm vào giỏ hàng
                                            </button>
                                        </div>
                                    </div>
                                ) : (
                                    <div>
                                        <p className="text-red-500 text-xl font-semibold">Hết hàng</p>
                                    </div>
                                )}

                                <div className="mt-6">
                                    <h2 className="text-2xl text-center font-bold text-gray-700 mb-4">
                                        Cấu hình điện thoại {product.product_name}
                                    </h2>
                                </div>

                                <div className="mt-5">
                                    <table className="w-full text-left text-gray-700">
                                        <tbody>
                                            <tr className="odd:bg-white even:bg-gray-100 border-b">
                                                <th className="p-2 font-semibold">Màn hình:</th>
                                                <td className="p-2">{product.screen?.screen_value}</td>
                                            </tr>
                                            <tr className="odd:bg-white even:bg-gray-100 border-b">
                                                <th className="p-2 font-semibold">Hệ điều hành:</th>
                                                <td className="p-2">{product.os?.os_value}</td>
                                            </tr>
                                            <tr className="odd:bg-white even:bg-gray-100 border-b">
                                                <th className="p-2 font-semibold">Camera:</th>
                                                <td className="p-2">{product.cam?.cam_value}</td>
                                            </tr>
                                            <tr className="odd:bg-white even:bg-gray-100 border-b">
                                                <th className="p-2 font-semibold">Chíp:</th>
                                                <td className="p-2">{product.cpu?.cpu_value}</td>
                                            </tr>
                                            <tr className="odd:bg-white even:bg-gray-100 border-b">
                                                <th className="p-2 font-semibold">RAM:</th>
                                                <td className="p-2">{product.ram?.ram_value}</td>
                                            </tr>
                                            <tr className="odd:bg-white even:bg-gray-100 border-b">
                                                <th className="p-2 font-semibold">Dung lượng lưu trữ:</th>
                                                <td className="p-2">{product.rom?.rom_value}</td>
                                            </tr>
                                            <tr className="odd:bg-white even:bg-gray-100 border-b">
                                                <th className="p-2 font-semibold">Pin:</th>
                                                <td className="p-2">{product.pin?.pin_value}</td>
                                            </tr>
                                            <tr className="odd:bg-white even:bg-gray-100 ">
                                                <th className="p-2 font-semibold">Hãng:</th>
                                                <td className="p-2">{product.brand?.brand_name}</td>
                                            </tr>
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        </div>
                        <div>
                            <div className="text-2xl font-bold mb-2">
                                Đánh giá sản phẩm
                            </div>
                            <div className="flex gap-4 p-4 bg-yellow-50">
                                <div>
                                    <div className="text-3xl text-center mb-4">
                                        {avgRate > 0 ? (avgRate.toFixed(1)) : '0'} trên 5
                                    </div>
                                    <div>
                                        <div className="flex">
                                            {[...Array(5)].map((_, index) => {
                                                const starRating = index + 1;
                                                return (
                                                    <FaStar
                                                        key={index}
                                                        className={`cursor-pointer text-3xl ${starRating <= (avgRate) ? 'text-yellow-500' : 'text-gray-400'
                                                            }`}
                                                    />
                                                );
                                            })}
                                        </div>
                                    </div>
                                </div>
                                <div>
                                    <div className="flex gap-2">
                                        <button onClick={() => setRating2(rating)} className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600">Tất cả</button>
                                        <button onClick={() => rateChange(5)} className="bg-gray-200 text-gray-800 px-4 py-2 rounded hover:bg-gray-300">
                                            5 Sao ({rating.filter(r => r.rate_rating == 5)?.length})
                                        </button>
                                        <button onClick={() => rateChange(4)} className="bg-gray-200 text-gray-800 px-4 py-2 rounded hover:bg-gray-300">
                                            4 Sao ({rating.filter(r => r.rate_rating == 4)?.length})
                                        </button>
                                        <button onClick={() => rateChange(3)} className="bg-gray-200 text-gray-800 px-4 py-2 rounded hover:bg-gray-300">
                                            3 Sao ({rating.filter(r => r.rate_rating == 3)?.length})
                                        </button>
                                        <button onClick={() => rateChange(2)} className="bg-gray-200 text-gray-800 px-4 py-2 rounded hover:bg-gray-300">
                                            2 Sao ({rating.filter(r => r.rate_rating == 2)?.length})
                                        </button>
                                        <button onClick={() => rateChange(1)} className="bg-gray-200 text-gray-800 px-4 py-2 rounded hover:bg-gray-300">
                                            1 Sao ({rating.filter(r => r.rate_rating == 1)?.length})
                                        </button>
                                    </div>
                                </div>

                            </div>
                            <div className="pl-4">
                                {
                                    rating2.length > 0 ? (
                                    rating2.map((item, index) => (
                                        <div className="mb-4 flex gap-2" key={index}>
                                            <div>
                                                <FaUserCircle
                                                    className="w-10 h-10 rounded-full border object-cover"
                                                />
                                            </div>
                                            <div>
                                                <div>{item.customer.name}</div>
                                                <div className="flex">
                                                    {[...Array(5)].map((_, index) => {
                                                        const starRating = index + 1;
                                                        return (
                                                            <FaStar
                                                                key={index}
                                                                className={`cursor-pointer text-xl ${starRating <= (item.rate_rating) ? 'text-yellow-500' : 'text-gray-400'
                                                                    }`}
                                                            />
                                                        );
                                                    })}
                                                </div>
                                                <div>
                                                    {new Date(item.rate_date).toLocaleDateString('vi-VN', { day: '2-digit', month: '2-digit', year: 'numeric' })}
                                                </div>
                                                <div>
                                                    {
                                                        item.rate_comment
                                                    }
                                                </div>
                                            </div>
                                        </div>
                                    ))
                                    ) : (
                                        <div className="text-center text-lg text-blue-300 mt-4">
                                            Không có bình luận nào tương ứng
                                        </div>
                                    )
                                }
                            </div>

                        </div>
                    </div>
                )
            }
        </div>
    )
}