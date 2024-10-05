import { useEffect, useRef, useState } from "react";
import axiosClient from "../axios-client";
import { useNavigate } from "react-router-dom";
import { FaPlus } from "react-icons/fa";
import { useStateContext } from "../contexts/ContextProvider";
export default function Home() {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [search, setSearch] = useState(true);
    const { user, setCart } = useStateContext();
    const [products, setProducts] = useState([]);
    const [images, setImages] = useState([]);
    const [productSale, setProductSale] = useState([]);
    const navigate = useNavigate();
    const searchRef = useRef();

    useEffect(() => {
        getImages();
        getProduct();
        getTopSale();
    }, []);



    const getProduct = async () => {
        try {
            const res = await axiosClient.get('/products');

            setProducts(res.data.data);
        } catch (error) {
            console.error(error);
        }
    }

    const getTopSale = async () => {
        try {
            const res = await axiosClient.get('/top/product/sale');
            setProductSale(res.data.data);
        } catch (error) {
            console.log(error);
        }
    }

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
        <div className="p-5 bg-bgheader-300">
            {
                loading ? (
                    <div className="h-screen"></div>
                )
                    : (
                        (search) ?
                            (
                                <div>
                                    <div className="w-[60%] mx-auto mb-12">
                                        <div className="text-2xl font-semibold text-center mb-4">
                                            Sản phẩm bán chạy nhất
                                        </div>
                                        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 border bg-white p-6 rounded-lg shadow-md">
                                            {
                                                productSale.map((item, index) => (
                                                    <div key={index} className="flex flex-col items-center text-center p-4 bg-gray-100 rounded-md shadow hover:shadow-lg transition-shadow duration-300 relative">
                                                         <p className="absolute top-2 left-0 bg-red-500 text-white text-xs font-bold px-2 py-1 rounded-full z-10 transform -rotate-45">Hot</p>

                                                        <div className="flex justify-center mb-4">
                                                           
                                                            <img
                                                                onClick={() => infoProduct(item.product_id)}
                                                                src={images.find(image => image.product_id == item.product_id)?.image_value || 'N/A'}
                                                                alt="product"
                                                                className="w-[80%] h-auto object-cover rounded-md transform hover:scale-105 transition-transform duration-300 hover:cursor-pointer"
                                                            />
                                                        </div>
                                                        <div className="text-lg font-medium mb-2">
                                                            {
                                                                products.find(p => p.product_id == item.product_id)?.product_name || 'Tên sản phẩm'
                                                            }
                                                        </div>
                                                    </div>
                                                ))
                                            }
                                        </div>
                                    </div>

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
                                    <div className="flex flex-wrap mt-5 ">
                                        {
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