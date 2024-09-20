import { useEffect, useRef, useState } from "react";
import axiosClient from "../axios-client";
import { useNavigate, useParams } from "react-router-dom";
export default function InfoProduct() {
    const param = useParams();
    const [product, setProduct] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [images, setImages] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        getProduct();
        // getCpus();
        // getBrands();
        // getRams();
        // getRoms();
        // getOss();
        // getScreens();
        // getPins();
        // getCams();
        getImages();
    }, []);

    const getProduct = async () => {
        setLoading(true);
        try {

            const res = await axiosClient.get(`/product/${param.product_id}`);
            setProduct(res.data.data);
            setLoading(false);
        } catch (error) {
            console.error('Error fetching pin:', error);
            setError(error);
            setLoading(false);
        }
    };
    // Hàm lấy danh sách cpu
    // const getCpus = () => {
    //     setLoading(true);
    //     axiosClient.get('/cpus')
    //         .then(({ data }) => {
    //             setCpus(data.data);
    //             setLoading(false);
    //         })
    //         .catch((error) => {
    //             console.error('Error fetching cpu:', error);
    //             setError(error);
    //             setLoading(false);
    //         })
    // };
    // // Hàm lấy danh sách thương hiệu
    // const getBrands = () => {
    //     setLoading(true);
    //     axiosClient.get('/brands')
    //         .then(({ data }) => {
    //             setBrands(data.data);
    //             setLoading(false);
    //         })
    //         .catch(error => {
    //             console.error('Error fetching brands:', error);
    //             setError(error);
    //             setLoading(false);
    //         });
    // };
    // // Hàm lấy danh sách ram
    // const getRams = () => {
    //     setLoading(true);
    //     axiosClient.get('/rams')
    //         .then(({ data }) => {
    //             setRams(data.data);
    //             setLoading(false);
    //         })
    //         .catch(error => {
    //             console.error('Error fetching ram:'.error);
    //             setError(error);
    //             setLoading(false);
    //         });
    // }
    // // // Hàm lấy danh sách rom
    // const getRoms = () => {
    //     setLoading(true);
    //     axiosClient.get('/roms')
    //         .then(({ data }) => {
    //             setRoms(data.data);
    //             setLoading(false);
    //         })
    //         .catch(error => {
    //             console.error('Error fetching rom:', error);
    //             setError(error);
    //             setLoading(false);
    //         });
    // };
    // // Hàm lấy danh sách hệ điều hành
    // const getOss = () => {
    //     setLoading(true);
    //     axiosClient.get('/oss')
    //         .then(({ data }) => {
    //             setOss(data.data);
    //             setLoading(false);
    //         })
    //         .catch(error => {
    //             console.error('Error fetching operating system:', error);
    //             setError(error);
    //             setLoading(false);
    //         });
    // }
    // // Hàm lấy danh sách màn hình
    // const getScreens = () => {
    //     setLoading(true);
    //     axiosClient.get('/screens')
    //         .then(({ data }) => {
    //             setScreens(data.data);
    //             setLoading(false);
    //         })
    //         .catch((error) => {
    //             console.error('Error fetching screen:', error);
    //             setError(error);
    //             setLoading(false);
    //         });
    // };
    // // Hàm lấy danh sách pin
    // const getPins = () => {
    //     setLoading(true);
    //     axiosClient.get('/pins')
    //         .then(({ data }) => {
    //             setPins(data.data);
    //             setLoading(false);
    //         })
    //         .catch(error => {
    //             console.error('Error fetching pin:', error);
    //             setError(error);
    //             setLoading(false);
    //         });
    // }
    // // // Hàm lấy danh sách camere
    // const getCams = () => {
    //     setLoading(true);
    //     axiosClient.get('/camera')
    //         .then(({ data }) => {
    //             setCams(data.data);
    //             setLoading(false);
    //         })
    //         .catch(error => {
    //             console.error('Error fetching cams:', error);
    //             setError(error);
    //             setLoading(false);
    //         });
    // }
    // Hàm lấy danh sách ảnh
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

    return (
        <div>
            {
                loading ? (
                    <p>Loading...</p>
                ) : error ? (
                    <p>Error: {error.message}</p>
                ) : (
                    <div>
                        <div className="relative">
                            <button
                                onClick={() => navigate(-1)}  // Go back to the previous page
                                className="fixed top-4 sm:left-[220px] lg:left-[330px] px-3 py-1 bg-blue-300 text-white rounded hover:bg-blue-800"
                            >
                                Trở về
                            </button>
                            <div className="text-center mt-12"> {/* Added mt-12 to offset the top content */}
                                <h1 className="text-lg lg:text-2xl font-bold text-gray-800 mb-4">
                                    Điện thoại {product[0]?.product_name}
                                </h1>
                            </div>
                        </div>

                        <hr className="my-2" />
                        <div className="flex w-full">
                            <div className="basis-1/2 ">
                                <div className="flex justify-center">
                                    <img className="lg:w-[440px]" src={images.find(img => img.product_id == product[0]?.product_id)?.image_value} alt={'Ảnh' + product[0]?.product_name} />
                                </div>
                            </div>
                            <div className="basis-1/2 bg-gray-100 rounded-lg">
                                <div className="pt-3 px-4">
                                    <h2 className="text-lg lg:text-xl font-bold text-gray-800 mb-4">
                                        Cấu hình Điện thoại {product[0]?.product_name}
                                    </h2>
                                </div>
                                <table className="w-full bg-white shadow-md rounded-lg">
                                    <tbody>
                                        <tr className="border-b">
                                            <th className="text-left p-3 bg-gray-200 font-semibold text-gray-700">Màn hình:</th>
                                            <td className="text-left p-3 text-gray-800">{product[0]?.screen.screen_value}</td>
                                        </tr>
                                        <tr className="border-b">
                                            <th className="text-left p-3 bg-gray-200 font-semibold text-gray-700">Hệ điều hành:</th>
                                            <td className="text-left p-3 text-gray-800">{product[0]?.os.os_value}</td>
                                        </tr>
                                        <tr className="border-b">
                                            <th className="text-left p-3 bg-gray-200 font-semibold text-gray-700">Camere:</th>
                                            <td className="text-left p-3 text-gray-800">{product[0]?.cam.cam_value}</td>
                                        </tr>
                                        <tr className="border-b">
                                            <th className="text-left p-3 bg-gray-200 font-semibold text-gray-700">Chíp:</th>
                                            <td className="text-left p-3 text-gray-800">{product[0]?.cpu.cpu_value}</td>
                                        </tr>
                                        <tr className="border-b">
                                            <th className="text-left p-3 bg-gray-200 font-semibold text-gray-700">RAM:</th>
                                            <td className="text-left p-3 text-gray-800">{product[0]?.ram.ram_value}</td>
                                        </tr>
                                        <tr className="border-b">
                                            <th className="text-left p-3 bg-gray-200 font-semibold text-gray-700">Dung lượng lưu trữ:</th>
                                            <td className="text-left p-3 text-gray-800">{product[0]?.rom.rom_value}</td>
                                        </tr>
                                        <tr className="border-b">
                                            <th className="text-left p-3 bg-gray-200 font-semibold text-gray-700">Pin, Sạc:</th>
                                            <td className="text-left p-3 text-gray-800">{product[0]?.pin.pin_value}</td>
                                        </tr>
                                        <tr>
                                            <th className="text-left p-3 bg-gray-200 font-semibold text-gray-700">Hãng:</th>
                                            <td className="text-left p-3 text-gray-800">{product[0]?.brand.brand_name}</td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>

                        </div>
                        <div className="p-4 bg-gray-100 rounded-lg">
                            <p className="text-lg font-semibold text-gray-800 mb-2">Mô tả sản phẩm:</p>
                            <p className="text-gray-700 leading-relaxed">{product[0]?.product_description}</p>
                        </div>

                    </div>

                )
            }

        </div>
    )
}