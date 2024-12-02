import { useEffect, useRef, useState } from "react";
import axiosClient from "../axios-client";
import { useNavigate, useParams } from "react-router-dom";
import { FaPlus } from "react-icons/fa";
import { useStateContext } from "../contexts/ContextProvider";
export default function ProductSearch() {
    const [products, setProducts] = useState([]);
    const { value: searchValue } = useParams();
    const [images, setImages] = useState([]);
    const { setCart } = useStateContext();
    const navigate = useNavigate();
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        getImages();
    }, [])

    useEffect(() => {
        if (searchValue) {
            getProducts();
        }

    }, [searchValue])

    const removeVietnameseTones = (str) => {
        return str
            .normalize('NFD')
            .replace(/[\u0300-\u036f]/g, '')
            .replace(/[Đđ]/g, 'd');
    }

    const getProducts = async () => {
        setLoading(false);
        console.log(removeVietnameseTones(searchValue));
        const res = await axiosClient.post(`search/product/${removeVietnameseTones(searchValue)}`);
        setProducts(res.data.products);
        setLoading(true);
    }

    const getImages = () => {
        setLoading(false);
        axiosClient.get('/images')
            .then(({ data }) => {
                setImages(data.data);
                setLoading(true);
            })
            .catch(error => {
                console.error('Error fetching image:', error);
                setLoading(true);
            });
    }

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
        } catch (error) {
            console.log(error);
        }
    }

    return (
        <div className="product-search min-h-[100vh] bg-bgheader-300 p-5">
            <div className="flex flex-wrap mt-5 ">
                {
                    loading && (products?.length > 0 ? (
                        products.map((product, index) => (
                            <div key={index} className="basis-1/4 border rounded-lg mt-5 shadow-lg p-4 hover:shadow-xl transition-shadow duration-300 bg-white">
                                <div>
                                    <div className="w-full flex justify-center mb-4">
                                        <img
                                            onClick={() => infoProduct(product.product_id)}
                                            src={images.find(image => image.product_id == product.product_id)?.image_value || 'N/A'}
                                            alt="product"
                                            className="w-[60%] h-auto object-cover rounded-md transform hover:scale-105 transition-transform duration-300 hover:cursor-pointer"
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
                    ) : (
                        <div className="w-full flex justify-center items-center">
                            <p className="text-3xl font-bold text-yellow-400 mt-24">
                                Hiện không có sản phẩm bạn đang tìm kiếm!
                            </p>
                        </div>

                    ))
                }
            </div>
        </div>
    )
}