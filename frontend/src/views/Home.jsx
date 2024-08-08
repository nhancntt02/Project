import { useEffect, useState } from "react";
import axiosClient from "../axios-client";
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


    useEffect(() => {
        getProducts();
        getCpus();
        getBrands();
        getRams();
        getRoms();
        getOss();
        getScreens();
        getPins();
        getCams();
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
    // Hàm lấy danh sách cpu
    const getCpus = () => {
        setLoading(true);
        axiosClient.get('/cpus')
            .then(({ data }) => {
                setCpus(data.data);
                setLoading(false);
            })
            .catch((error) => {
                console.error('Error fetching cpu:', error);
                setError(error);
                setLoading(false);
            })
    };
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
    const getRams = () => {
        setLoading(true);
        axiosClient.get('/rams')
            .then(({ data }) => {
                setRams(data.data);
                setLoading(false);
            })
            .catch(error => {
                console.error('Error fetching ram:'.error);
                setError(error);
                setLoading(false);
            });
    }
    // Hàm lấy danh sách rom
    const getRoms = () => {
        setLoading(true);
        axiosClient.get('/roms')
            .then(({ data }) => {
                setRoms(data.data);
                setLoading(false);
            })
            .catch(error => {
                console.error('Error fetching rom:', error);
                setError(error);
                setLoading(false);
            });
    };
    // Hàm lấy danh sách hệ điều hành
    const getOss = () => {
        setLoading(true);
        axiosClient.get('/oss')
            .then(({ data }) => {
                setOss(data.data);
                setLoading(false);
            })
            .catch(error => {
                console.error('Error fetching operating system:', error);
                setError(error);
                setLoading(false);
            });
    }
    // Hàm lấy danh sách màn hình
    const getScreens = () => {
        setLoading(true);
        axiosClient.get('/screens')
            .then(({ data }) => {
                setScreens(data.data);
                setLoading(false);
            })
            .catch((error) => {
                console.error('Error fetching screen:', error);
                setError(error);
                setLoading(false);
            });
    };
    // Hàm lấy danh sách pin
    const getPins = () => {
        setLoading(true);
        axiosClient.get('/pins')
            .then(({ data }) => {
                setPins(data.data);
                setLoading(false);
            })
            .catch(error => {
                console.error('Error fetching pin:', error);
                setError(error);
                setLoading(false);
            });
    }
    // Hàm lấy danh sách camere
    const getCams = () => {
        setLoading(true);
        axiosClient.get('/camera')
            .then(({ data }) => {
                setCams(data.data);
                setLoading(false);
            })
            .catch(error => {
                console.error('Error fetching cams:', error);
                setError(error);
                setLoading(false);
            });
    }
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
        <div className="">
            <div className="">
                <details>
                    <summary>xem them</summary>
                    <p>Home</p>
                </details>

            </div>
            <div className="flex justify-center mt-5">
                {loading ? (
                    <p>Loading...</p>
                ) : error ? (
                    <p>Error: {error.message}</p>
                ) : (
                    <div className="h-[650px] overflow-auto">
                        <table className=" border-collapse border border-slate-400 ... ">
                            <thead>
                                <tr>
                                    <th className="border border-slate-300 ...">Mã sản phẩm</th>
                                    <th className="border border-slate-300 ...">Tên sản phẩm</th>
                                    <th className="border border-slate-300 ...">Hình ảnh</th>
                                    <th className="border border-slate-300 ...">Chíp xử lí</th>
                                    <th className="border border-slate-300 ...">Ram</th>
                                    <th className="border border-slate-300 ...">Rom</th>
                                    <th className="border border-slate-300 ...">Pin</th>
                                    <th className="border border-slate-300 ...">Camera</th>
                                    <th className="border border-slate-300 ...">Trạng thái</th>
                                </tr>
                            </thead>
                            <tbody className="">
                                {products.map(b => (
                                    <tr className="">
                                        <td className="border border-slate-300 text-center " key={b.product_id}>
                                            <div className="px-1">
                                                {b.product_id}
                                            </div>
                                        </td>
                                        <td className="border border-slate-300 text-center ">
                                            <div className="px-1">
                                                {b.product_name}
                                            </div>
                                        </td>
                                        <td className="border border-slate-300 text-center ">
                                            <img src={images.find(image => image.product_id == b.product_id)?.image_value || 'N/A'} alt="" className="w-20" />
                                        </td>
                                        <td className="border border-slate-300 text-center ">
                                            <div className="px-1">
                                                {cpus.find(cpu => cpu.cpu_id === b.cpu_id)?.cpu_value || 'N/A'}
                                            </div>
                                        </td>
                                        <td className="border border-slate-300 text-center ">
                                            <div className="px-1">
                                                {rams.find(ram => ram.ram_id === b.ram_id)?.ram_value || 'N/A'}
                                            </div>
                                        </td>
                                        <td className="border border-slate-300 text-center ">
                                            <div className="px-1">
                                                {roms.find(rom => rom.rom_id === b.rom_id)?.rom_value || 'N/A'}
                                            </div>
                                        </td>
                                        <td className="border border-slate-300 text-center ">
                                            <div className="px-1">
                                                {pins.find(pin => pin.pin_id === b.pin_id)?.pin_value || 'N/A'}
                                            </div>
                                        </td>
                                        <td className="border border-slate-300 text-center ">
                                            <div className="px-1">
                                                {cams.find(cam => cam.cam_id === b.cam_id)?.cam_value || 'N/A'}
                                            </div>
                                        </td>
                                        <td className="border border-slate-300 text-center ">
                                            <div className="px-1">
                                                {b.product_status}
                                            </div>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>

                )}
            </div>
        </div>
    );
}