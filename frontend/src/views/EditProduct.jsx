import { useNavigate, useParams } from 'react-router-dom';
import axiosClient from '../axios-client';
import { useEffect, useRef, useState } from 'react';

export default function EditProduct() {
    const { product_id } = useParams();
    const [product, setProduct] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [cpus, setCpus] = useState([]);
    const [brands, setBrands] = useState([]);
    const [rams, setRams] = useState([]);
    const [roms, setRoms] = useState([]);
    const [oss, setOss] = useState([]);
    const [screens, setScreens] = useState([]);
    const [pins, setPins] = useState([]);
    const [cams, setCams] = useState([]);
    const nameRef = useRef();
    const descriptionRef = useRef();
    const priceRef = useRef();
    const statusRef = useRef();
    const brand_idRef = useRef();
    const cpu_idRef = useRef();
    const ram_idRef = useRef();
    const rom_idRef = useRef();
    const os_idRef = useRef();
    const screen_idRef = useRef();
    const pin_idRef = useRef();
    const cam_idRef = useRef();
    const navigate = useNavigate();

    useEffect(() => {
        if (product_id) {
            getProduct();
            getCpus();
            getBrands();
            getRams();
            getRoms();
            getOss();
            getScreens();
            getPins();
            getCams();
        }
    }, []);

    const getProduct = async () => {
        try {
            setLoading(true);
            const res = await axiosClient.get(`/product/${product_id}`);
            setProduct(res.data.data);

        } catch (error) {
            console.error("Error fetching product:", error);
            setError("Failed to fetch product.");
        } finally {
            setLoading(false);
        }
    };
    useEffect(() => {
        if (product) {
            nameRef.current.value = product[0].product_name; // Update input field after product is set
            descriptionRef.current.value = product[0].product_description;
            priceRef.current.value = product[0].product_price;
            statusRef.current.value = product[0].product_status;
        }

    }, [product]);
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
    const onSubmit = async (ev) => {
        ev.preventDefault();
        const payload = {
            product_name: nameRef.current.value,
            product_description: descriptionRef.current.value,
            product_price: priceRef.current.value,
            product_status: statusRef.current.value,
            brand_id: brand_idRef.current.value,
            cpu_id: cpu_idRef.current.value,
            ram_id: ram_idRef.current.value,
            rom_id: rom_idRef.current.value,
            os_id: os_idRef.current.value,
            screen_id: screen_idRef.current.value,
            pin_id: pin_idRef.current.value,
            cam_id: cam_idRef.current.value
        }
        try {
            const res = await axiosClient.put(`/update/product/${product_id}`, payload);
            alert(res.data.message);
        } catch (error) {

        }
    }


    if (loading) {
        return <p>Loading...</p>;
    }

    if (error) {
        return <p>{error}</p>;
    }

    if (!product) {
        return <p>No product found.</p>;
    }

    return (
        <div>
            <div className="">
                <button
                    onClick={() => navigate(-1)}  // Go back to the previous page
                    className="px-3 py-1 text-center bg-blue-300 text-white rounded hover:bg-blue-800 mt-3"
                >Trở về</button>
            </div>
            <div className=" flex justify-center items-center">
                <div className="w-[600px] p-6 shadow-lg rounded-md border"  >
                    <h1 className="text-center font-bold text-xl">
                        Chỉnh sửa sản phẩm
                    </h1>
                    <hr className="mt-3" />
                    <div className="flex flex-row">
                        <div className="basis-1/2 p-4">
                            <div className="">
                                <label className="ct-label ">Tên sản phẩm</label>
                                <input className="ct-input" ref={nameRef} placeholder="Nhập tên cho sản phẩm " />
                            </div>
                            <div className="mt-3">
                                <label className="ct-label ">Mô tả sản phẩm</label>
                                <textarea className="ct-input" rows="4" ref={descriptionRef} placeholder="Nhập mô tả sản phẩm" />
                            </div>
                            <div className="mt-3">
                                <label className="ct-label ">Giá</label>
                                <input className="ct-input" ref={priceRef} placeholder="Nhập giá sản phẩm " />
                            </div>
                            <div className="mt-3">
                                <label className="ct-label">Trạng thái</label>
                                <input className="ct-input " ref={statusRef} placeholder="Nhập trạng thái sản phẩm " />
                            </div>
                            <div className="mt-3">
                                <label htmlFor="brand" className="ct-label">Thương hiệu:</label>
                                <select id="brand" className="ct-select-1" ref={brand_idRef}>
                                    <option className="text-sm text-gray-900 dark:text-white" value={product[0]?.brand_id} key="">{product[0]?.brand.brand_name}</option>
                                    {
                                        brands.map(brand => (
                                            <option className="text-sm text-gray-900 dark:text-white" value={brand.brand_id} key={brand.brand_id} >{brand.brand_name}</option>
                                        ))
                                    }
                                </select>
                            </div>
                            <div className="mt-3">
                                <label htmlFor="cpu" className="ct-label ">Chíp xử lí:</label>
                                <select id="cpu" className="ct-select-1" ref={cpu_idRef}>
                                    <option value={product[0]?.cpu_id} key={product[0]?.cpu_id}>{product[0]?.cpu.cpu_value}</option>
                                    {
                                        cpus.map(cpu => (
                                            <option value={cpu.cpu_id} key={cpu.cpu_id} >{cpu.cpu_value}</option>
                                        ))
                                    }
                                </select>
                            </div>

                        </div>
                        <div className="basis-1/2 p-4">
                            <div className="">
                                <label htmlFor="ram" className="ct-label ">Ram</label>
                                <select id="ram" className="ct-select-1" ref={ram_idRef}>
                                    <option value={product[0]?.ram_id} key={product[0]?.ram_id}>{product[0]?.ram.ram_value}</option>
                                    {
                                        rams.map(ram => (
                                            <option value={ram.ram_id} key={ram.ram_id} >{ram.ram_value}</option>
                                        ))
                                    }
                                </select>
                            </div>
                            <div className="mt-3">
                                <label htmlFor="rom" className="ct-label ">Rom</label>
                                <select id="rom" className="ct-select-1" ref={rom_idRef}>
                                    <option value={product[0]?.rom_id} key={product[0]?.rom_id}>{ product[0]?.rom.rom_value}</option>
                                    {
                                        roms.map(rom => (
                                            <option value={rom.rom_id} key={rom.rom_id} >{rom.rom_value}</option>
                                        ))
                                    }
                                </select>
                            </div>
                            <div className="mt-3">
                                <label htmlFor="oss" className="ct-label ">Hệ điều hành</label>
                                <select id="oss" className="ct-select-1" ref={os_idRef}>
                                    <option value={product[0]?.os_id} key={product[0]?.os_id}>{product[0]?.os.os_value}</option>
                                    {
                                        oss.map(os => (
                                            <option value={os.os_id} key={os.os_id} >{os.os_value}</option>
                                        ))
                                    }
                                </select>
                            </div>
                            <div className="mt-3">
                                <label htmlFor="screen" className="ct-label ">Màn hình</label>
                                <select id="screen" className="ct-select-1" ref={screen_idRef}>
                                    <option value={product[0]?.screen_id} key={product[0]?.screen_id}>{product[0]?.screen.screen_value}</option>
                                    {
                                        screens.map(screen => (
                                            <option value={screen.screen_id} key={screen.screen_id} >{screen.screen_value}</option>
                                        ))
                                    }
                                </select>
                                <div className="mt-3">
                                    <label htmlFor="pin" className="ct-label ">Pin</label>
                                    <select id="pin" className="ct-select-1" ref={pin_idRef}>
                                        <option value={product[0]?.pin_id} key={product[0]?.pin_id}>{product[0]?.pin.pin_value}</option>
                                        {
                                            pins.map(pin => (
                                                <option value={pin.pin_id} key={pin.pin_id} >{pin.pin_value}</option>
                                            ))
                                        }
                                    </select>
                                </div>
                                <div className="mt-3">
                                    <label htmlFor="camera" className="ct-label ">Camera</label>
                                    <select id="cam" className="ct-select-1" ref={cam_idRef}>
                                        <option value={product[0]?.cam_id} key={product[0]?.cam_id}>{product[0]?.cam.cam_value}</option>
                                        {
                                            cams.map(cam => (
                                                <option value={cam.cam_id} key={cam.cam_id} >{cam.cam_value}</option>
                                            ))
                                        }
                                    </select>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="mt-3 flex justify-center items-center">
                        <button onClick={onSubmit} className="rounded-md bg-green-500 w-20 mx-auto">Lưu</button>
                    </div>
                </div>
            </div>
        </div>
    );
}
