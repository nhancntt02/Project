import { useEffect, useState } from "react"
import axiosClient from "../axios-client";
import { useNavigate } from "react-router-dom";


export default function ProductTopView() {
    const [products, setProducts] = useState([]);
    const [images, setImages] = useState([]);
    const navigate = useNavigate();



    useEffect(() => {
        getProducts();
        getImages();
    }, []);

    const getProducts = async () => {
        try {
            const res = await axiosClient.get('/product/top/view');
            setProducts(res.data);
        } catch (error) {
            console.log(error);
        }
    }

    const getImages = () => {
        axiosClient.get('/images')
            .then(({ data }) => {
                setImages(data.data);
            })
            .catch(error => {
                console.error('Error fetching image:', error);
            });
    }

    const infoProduct = (product_id) => {
        navigate(`/infoproduct/${product_id}`);
    }


    return (
        <div className="w-full mx-auto mb-12 px-4 pb-4">
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4  rounded-lg ">
                {
                    products.map((item, index) => (
                        <div key={index}
                            className="group flex flex-col border items-center bg-white text-center relative
                                                px-4 py-8 rounded-md shadow hover:shadow-lg transition-shadow duration-300"
                        >

                            <div className="flex justify-center mb-4">

                                <img
                                    onClick={() => infoProduct(item.product_id)}
                                    src={images.find(image => image.product_id == item.product_id)?.image_value || 'N/A'}
                                    alt="product"
                                    className="w-full h-auto object-cover rounded-md transform group-hover:scale-105 transition-transform duration-300 hover:cursor-pointer"
                                />
                            </div>
                            <div className="text-lg font-medium mb-2 group-hover:text-blue-500">
                                {
                                    item.product_name || 'Tên sản phẩm'
                                }
                            </div>
                            <div className="text-red-500 font-semibold absolute bottom-4">
                                {
                                    new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(item.product_price)
                                }
                            </div>
                        </div>
                    ))
                }
            </div>
        </div>
    )
}