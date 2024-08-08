import { useRef, useState, useEffect } from "react";
import axiosClient from "../axios-client";

export default function Home() {
    const idRef = useRef();
    const nameRef = useRef();
    const [brands, setBrands] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    useEffect(() => {
        getBrands();
    }, []);

    const getBrands = () => {
        setLoading(true);
        axiosClient.get('/brands')
            .then(( {data} ) => {
                setBrands(data.data);
                console.log(data.data);
                setLoading(false);
            })
            .catch(error => {
                console.error('Error fetching brands:', error);
                setError(error);
                setLoading(false);
            });
    };

    const onSubmit = (ev) => {
        ev.preventDefault();
        const payload = {
            brand_id: idRef.current.value,
            brand_name: nameRef.current.value
        }
        console.log(payload);
        axiosClient.post('/add/brand', payload)
            .then(({ data }) => {
                getBrands();
                idRef.current.value = "";
                nameRef.current.value = "";
            })
            .catch(err => {
                console.error(err);
            });
    }

    return (
        <div className="">
            <div className="flex justify-center items-center">
                <div  className="w-96 p-6 shadow-lg rounded-md">
                    <h1 className="text-center font-bold text-xl">
                        Thêm thương hiệu
                    </h1>
                    <div className="mt-3">
                        <label className="block text-base mb-2 ">Mã thương hiệu</label>
                       <input className="ct-input" ref={idRef}placeholder="Nhập mã thương hiệu" /> 
                    </div>
                    <div className="mt-3">
                        <label  className="block text-base mb-2 ">Tên thương hiệu</label>
                        <input className="ct-input"ref={nameRef}  placeholder="Nhập tên thương hiệu" />
                    </div>
                    <div className="mt-3 flex justify-center items-center">
                       <button onClick={onSubmit} className="rounded-md bg-green-500 w-20 mx-auto">Lưu</button> 
                    </div>
                </div>
            </div>
            <div className="">
            {loading ? (
                <p>Loading...</p>
            ) : error ? (
                <p>Error: {error.message}</p>
            ) : (
                <div>
                    { brands.map(b => (
                        <div key={b.brand_id}>
                            <h1>{b.brand_id}-{b.brand_name}</h1>
                            
                        </div>
                    ))}
                </div>
            )}
        </div>
        </div>
    );
}