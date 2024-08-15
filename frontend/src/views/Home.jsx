import { useEffect, useRef, useState } from "react";
import axiosClient from "../axios-client";
import { useNavigate } from "react-router-dom";
export default function Home() {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [cpus, setCpus] = useState([]);
    const [brands, setBrands] = useState([]);
    const [rams, setRams] = useState([]);
    const [roms, setRoms] = useState([]);
    const [oss, setOss] = useState([]);
    const [screens, setScreens] = useState([]);
    const [pins, setPins] = useState([]);
    const [cams, setCams] = useState([]);
    const [images, setImages] = useState([]);
    const navigate = useNavigate();
    const [details, setDetails] = useState([]);
    const searchRef = useRef();

    useEffect(() => {
        getProducts();
        getQuantity();
        //getCpus();
        getBrands();
        //getRams();
        //getRoms();
        //getOss();
        //getScreens();
        //getPins();
        //getCams();
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
            console.error('Error fetching pin:', error);
            setError(error);
            setLoading(false);
        }
    };
    const getQuantity = async () => {
        setLoading(true);
        try {
            const res = await axiosClient.get('/quantity');
            setDetails(res.data.data);
            setLoading(false);
        } catch (error) {
            console.log(error);
            setLoading(false);
        }
    }
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
    // Hàm lấy danh sách thương hiệu
    const getBrands = () => {
        setLoading(true);
        axiosClient.get('/brands')
            .then(({ data }) => {
                setBrands(data.data);
                setLoading(false);
            })
            .catch(error => {
                console.error('Error fetching brands:', error);
                setError(error);
                setLoading(false);
            });
    };
    // Hàm lấy danh sách ram
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
    // // Hàm lấy danh sách rom
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
    // Hàm lấy danh sách hệ điều hành
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
    // Hàm lấy danh sách màn hình
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
    // Hàm lấy danh sách pin
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
    // // Hàm lấy danh sách camere
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

    // Chuyển hướng đến trang chỉnh sửa sản phẩm
    const editProduct = async (product_id) => {
        navigate(`/editproduct/${product_id}`);
    }

    const deleteProduct = async (product_id) => {
        confirm("Bạn muốn xóa sản phẩm " + product_id);
        try {
            const res = axiosClient.delete(`delete/product/${product_id}`);
            alert(res.data.message);
            getProducts();
        } catch (error) {
            console.log(error);
        }

    }

    // Tìm kiếm sản phẩm
    const searchProduct = async () => {

        const data = searchRef.current.value;
        try {
            const res = await axiosClient.post(`/search/product/${data}`);
            setProducts(res.data.products);

        } catch (error) {
            console.log(error);
        }
    }
    // Chuyển sang trang chi tiết sản phẩm
    const infoProduct = (product_id) => {
        navigate(`/infoproduct/${product_id}`);
    }
    return (
        <div className="">
            <div className="">
                <details>
                    <summary>xem them</summary>
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
                </details>
            </div>
            {
                loading ? (
                    <p>Loading...</p>
                ) : error ? (
                    <p>Error: {error.message}</p>
                ) : (
                    (products.length > 0) ?
                        (
                            <div className="flex justify-center mt-5">

                                <div className="h-[650px] overflow-auto">
                                    <table className=" border-collapse border border-slate-400 ... ">
                                        <thead>
                                            <tr>
                                                <th className="border border-slate-300 ...">STT</th>
                                                <th className="border border-slate-300 ...">Mã</th>
                                                <th className="border border-slate-300 ...">Tên sản phẩm</th>
                                                <th className="border border-slate-300 ...">Hình ảnh</th>
                                                <th className="border border-slate-300 ...">Tên nhãn hàng</th>
                                                <th className="border border-slate-300 ...">Trạng thái</th>
                                                <th className="border border-slate-300 ...">Số lượng</th>
                                                <th className="border border-slate-300 ..."></th>
                                            </tr>
                                        </thead>
                                        <tbody className="">
                                            {products.map((b, index) => (
                                                <tr>
                                                    <td className="border border-slate-300 text-center " key={index + 1} >
                                                        <div className="px-1">
                                                            {index + 1}
                                                        </div>
                                                    </td>
                                                    <td className="border border-slate-300 text-center " key={b.product_id}>
                                                        <div className="px-1">
                                                            {b.product_id}
                                                        </div>
                                                    </td>
                                                    <td className="border border-slate-300 " key={b.product_name}>
                                                        <div className="px-1">
                                                            {b.product_name}
                                                        </div>
                                                    </td>
                                                    <td className="border border-slate-300 text-center " >
                                                        <img onClick={() => infoProduct(b.product_id)} src={images.find(image => image.product_id == b.product_id)?.image_value || 'N/A'} alt="" className="w-20 hover:cursor-pointer" />
                                                    </td>
                                                    <td className="border border-slate-300  " key={b.brand_id}>
                                                        <div className="px-1">
                                                            {brands.find(brand => brand.brand_id === b.brand_id)?.brand_name || 'N/A'}
                                                        </div>
                                                    </td>
                                                    <td className="border border-slate-300  " >
                                                        <div className="px-1">
                                                            {b.product_status || 'N/A'}
                                                        </div>
                                                    </td>
                                                    <td className="border border-slate-300 ">
                                                        <div className="px-1">
                                                            {details.find(d => d.product_id == b.product_id)?.total_quantity || 0}
                                                        </div>
                                                    </td>

                                                    <td className="border border-slate-300" >
                                                        <div className="flex px-1">
                                                            <button onClick={() => editProduct(b.product_id)} className="bg-yellow-300 hover:bg-yellow-400 text-white font-semibold rounded px-2 mr-2">Sửa</button>
                                                            <button onClick={() => deleteProduct(b.product_id)} className="bg-red-400 hover:bg-red-600 text-white font-semibold rounded px-2">Xóa</button>
                                                        </div>
                                                    </td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>
                                </div>


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