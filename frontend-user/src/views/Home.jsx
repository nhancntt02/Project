import { useEffect, useRef, useState } from "react";
import axiosClient from "../axios-client";
import { useNavigate } from "react-router-dom";
export default function Home() {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [search, setSearch] = useState(true);

    const [images, setImages] = useState([]);
    const navigate = useNavigate();
    const searchRef = useRef();

    useEffect(() => {
        getProducts();
        getImages();
    }, []);

    const getProducts = async () => {
        setLoading(true);
        try {
            const res = await axiosClient.get('/products');
            console.log(res.data.data);
            setProducts(res.data.data);
            setLoading(false);
        } catch (error) {
            console.error('Error fetching product:', error);
            setError(error);
            setLoading(false);
        }
    };

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
    return (
        <div className="">
            <div className="">

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
            </div>
            {
                loading ? (
                    <p>Loading...</p>
                )
                    : (
                        (search) ?
                            (
                                <div className="flex flex-wrap mt-5 ">
                                  



                                    {
                                        products.map((product, index) => (
                                            <div className="basis-1/4  border">
                                                <div className=" w-full flex justify-center">
                                                    <img src={images.find(image => image.product_id == product.product_id)?.image_value || 'N/A'} alt="product" className="w-[60%]" />
                                                </div>
                                                <div>
                                                    <p className="text-lg font-bold">{product.product_name}</p>
                                                    <p className="text-lg font-bold">Giá: {product.product_price}</p>
                                                </div>
                                            </div>

                                        ))
                                    }
                                </div>
                            ) :
                            (
                                <p className="text-3xl font-bold text-center text-yellow-400 mt-20">
                                    Hiện không có sản phẩm  "{searchRef.current?.value}" bạn đang tìm kiếm!
                                </p>
                            ))
            }

        </div>
    );
}