import { useEffect, useRef, useState } from "react";
import axiosClient from "../axios-client";

export default function Product() {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(false);
    const [errors, setError] = useState(null);
    const [cpus, setCpus] = useState([]);
    const [brands, setBrands] = useState([]);
    const [rams, setRams] = useState([]);
    const [roms, setRoms] = useState([]);
    const [oss, setOss] = useState([]);
    const [screens, setScreens] = useState([]);
    const [pins, setPins] = useState([]);
    const [cams, setCams] = useState([]);
    const idRef = useRef();
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
    }, []);
    // Hàm lấy danh sách sản phẩm
    const getProducts = () => {
        setLoading(true);
        axiosClient.get('/products')
            .then(({ data }) => {
                setProducts(data.data);
                setLoading(false);
            })
            .catch(error => {
                console.error('Error fetching pin:', error);
                setError(error);
                setLoading(false);
            });
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
    // Hàm thêm sản phẩm
    const onSubmit = async (ev) => {
        ev.preventDefault();
        const payload = {
            product_id: idRef.current.value,
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
            const res = await axiosClient.post('/add/product', payload);
            alert(res.data.message);
            location.reload();
        } catch (err) {
            const response = err.response;
                console.log(err);
                if (response && response.status == 422) {
                    if(response.data.errors) {
                        setError(response.data.errors);
                    }else {
                        setError(response.data.message);
                    }
                }
        }
    };

    return (
        <div className="">
            <div className=" flex justify-center items-center">
                <div className="w-96 p-6 shadow-lg rounded-md"  >
                    <h1 className="text-center font-bold text-xl">
                        Thêm giá trị cho sản phẩm
                    </h1>
                    {
                        errors && <div className="bg-red-500 text-sm text-red-600">
                            {Object.keys(errors).map(key => (
                                <p key={key}>{errors[key][0]}</p>
                            ))}
                        </div>
                    }
                    <hr className="mt-3" />
                    <div className="mt-3">
                        <label className="ct-label ">Mã sản phẩm</label>
                        <input className="ct-input" ref={idRef} placeholder="Nhập mã Sản phẩm " />
                    </div>
                    <div className="mt-3">
                        <label className="ct-label ">Tên sản phẩm</label>
                        <input className="ct-input" ref={nameRef} placeholder="Nhập tên cho sản phẩm " />
                    </div>
                    <div className="mt-3">
                        <label className="ct-label ">Mô tả sản phẩm</label>
                        <input className="ct-input" ref={descriptionRef} placeholder="Nhập mô tả sản phẩm" />
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
                        <label for="brand" className="ct-label">Thương hiệu:</label>
                        <select id="brand" className="ct-select-1" ref={brand_idRef}>
                            <option className="text-sm text-gray-900 dark:text-white" value="" key="">Chọn thương hiệu cho sản phẩm</option>
                            {
                                brands.map(brand => (
                                    <option className="text-sm text-gray-900 dark:text-white" value={brand.brand_id} key={brand.brand_id} >{brand.brand_name}</option>
                                ))
                            }
                        </select>
                    </div>
                    <div className="mt-3">
                        <label for="cpu" className="ct-label ">Chíp xử lí:</label>
                        <select id="cpu" className="ct-select-1" ref={cpu_idRef}>
                            <option value="" key="">Chọn chíp xử lý cho sản phẩm</option>
                            {
                                cpus.map(cpu => (
                                    <option value={cpu.cpu_id} key={cpu.cpu_id} >{cpu.cpu_value}</option>
                                ))
                            }
                        </select>
                    </div>
                    <div className="mt-3">
                        <label for="ram" className="ct-label ">Ram</label>
                        <select id="ram" className="ct-select-1" ref={ram_idRef}>
                            <option value="" key="">Chọn ram cho sản phẩm</option>
                            {
                                rams.map(ram => (
                                    <option value={ram.ram_id} key={ram.ram_id} >{ram.ram_value}</option>
                                ))
                            }
                        </select>
                    </div>
                    <div className="mt-3">
                        <label for="rom" className="ct-label ">Rom</label>
                        <select id="rom" className="ct-select-1" ref={rom_idRef}>
                            <option value="" key="">Chọn rom cho sản phẩm</option>
                            {
                                roms.map(rom => (
                                    <option value={rom.rom_id} key={rom.rom_id} >{rom.rom_value}</option>
                                ))
                            }
                        </select>
                    </div>
                    <div className="mt-3">
                        <label for="oss" className="ct-label ">Hệ điều hành</label>
                        <select id="oss" className="ct-select-1" ref={os_idRef}>
                            <option value="" key="">Chọn hệ điều hành cho sản phẩm</option>
                            {
                                oss.map(os => (
                                    <option value={os.os_id} key={os.os_id} >{os.os_value}</option>
                                ))
                            }
                        </select>
                    </div>
                    <div className="mt-3">
                        <label for="screen" className="ct-label ">Màn hình</label>
                        <select id="screen" className="ct-select-1" ref={screen_idRef}>
                            <option value="" key="">Chọn màn hình cho sản phẩm</option>
                            {
                                screens.map(screen => (
                                    <option value={screen.screen_id} key={screen.screen_id} >{screen.screen_value}</option>
                                ))
                            }
                        </select>
                        <div className="mt-3">
                            <label for="pin" className="ct-label ">Pin</label>
                            <select id="pin" className="ct-select-1" ref={pin_idRef}>
                                <option value="" key="">Chọn pin cho sản phẩm</option>
                                {
                                    pins.map(pin => (
                                        <option value={pin.pin_id} key={pin.pin_id} >{pin.pin_value}</option>
                                    ))
                                }
                            </select>
                        </div>
                        <div className="mt-3">
                            <label for="camera" className="ct-label ">Camera</label>
                            <select id="cam" className="ct-select-1" ref={cam_idRef}>
                                <option value="" key="">Chọn camera cho sản phẩm</option>
                                {
                                    cams.map(cam => (
                                        <option value={cam.cam_id} key={cam.cam_id} >{cam.cam_value}</option>
                                    ))
                                }
                            </select>
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