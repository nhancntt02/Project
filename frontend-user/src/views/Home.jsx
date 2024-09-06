import { useEffect, useRef, useState } from "react";
import axiosClient from "../axios-client";
import { useNavigate } from "react-router-dom";
import { FaPlus } from "react-icons/fa";
import { useStateContext } from "../contexts/ContextProvider";
export default function Home() {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [search, setSearch] = useState(true);
    const { user, setCart, products } = useStateContext();

    const [images, setImages] = useState([]);
    const navigate = useNavigate();
    const searchRef = useRef();

    useEffect(() => {
        getImages();
    }, []);


    const getImages = () => {
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



    // Tìm kiếm sản phẩm
    const searchProduct = async () => {
        setLoading(true);
        const data = searchRef.current.value;
        try {
            const res = await axiosClient.post(`/search/product/${data}`);
            setProducts(res.data.products);
            setLoading(false);
            setSearch(true);
        } catch (error) {
            console.log(error);
            setLoading(false);
            setSearch(false);
        }
    }
    // Chuyển sang trang chi tiết sản phẩm
    const infoProduct = (product_id) => {
        navigate(`/infoproduct/${product_id}`);
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
        <div className="">
            {
                loading ? (
                    <div></div>
                )
                    : (
                        (search) ?
                            (
                                <div>
                                    <div className="flex items-center space-x-2 w-full">
                                        <input
                                            type="text"
                                            placeholder="Nhập tên sản phẩm muốn tìm kiếm"
                                            className="p-2 border lg:w-[25%] border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                                            ref={searchRef}
                                        />
                                        <button
                                            onClick={searchProduct}
                                            className="bg-blue-500 text-white p-2 rounded-lg hover:bg-blue-600"
                                        >
                                            Tìm kiếm
                                        </button>
                                    </div>
                                    <div className="flex flex-wrap mt-5">
                                        {
                                            products.map((product, index) => (
                                                <div key={index} className="basis-1/4 mt-3 border rounded-lg shadow-lg p-4 hover:shadow-xl transition-shadow duration-300">
                                                    <div>
                                                        <div className="w-full flex justify-center mb-4">
                                                            <img
                                                                src={images.find(image => image.product_id == product.product_id)?.image_value || 'N/A'}
                                                                alt="product"
                                                                className="w-[60%] h-auto object-cover rounded-md transform hover:scale-105 transition-transform duration-300"
                                                            />                                                    </div>
                                                        <div className="text-center">
                                                            <p className="text-lg font-bold mb-2">{product.product_name}</p>
                                                            <p className="text-lg font-bold text-green-500">Giá: {new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(product.product_price)}</p>
                                                        </div>
                                                    </div>
                                                    {
                                                        product.product_quantity > 0 ? (
                                                            <div className="mt-4 flex justify-center">
                                                                <button onClick={() => addCart(product.product_id)} className="bg-blue-500 text-white p-2 rounded-full hover:bg-blue-600 transition-colors duration-200">
                                                                    <FaPlus className="w-5 h-5" />
                                                                </button>
                                                            </div>
                                                        ) : (
                                                            <div className="mt-4 flex justify-center">
                                                                <div className="text-red-600 font-bold text-xl">Hết hàng</div>
                                                            </div>
                                                        )
                                                    }
                                                </div>
                                            ))
                                        }
                                    </div>
                                </div>


                            ) :
                            (
                                <p className="text-3xl font-bold text-center text-yellow-400 mt-20">
                                    Hiện không có sản phẩm bạn đang tìm kiếm!
                                </p>
                            ))
            }

        </div>
    );
}