import { useRef, useEffect, useState } from "react";
import axiosClient from "../axios-client";


export default function Home() {
    const [brands, setBrands] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const idRef = useRef();
    const nameRef = useRef();

    useEffect(() => {
        getBrands();
    }, []);

    const getBrands = () => {
        setLoading(true);
        axiosClient.get('/brands')
            .then(({ data }) => {
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
            id_brand: idRef.current.value,
            brand_name: nameRef.current.value
        }
        axiosClient.post('/add/brand', payload)
            .then(({ data }) => {
                console.log(data)
                location.reload();
            })
            .catch(err => {
                console.error(err);
            });
    }

    return (
        <div className="">
            <div className="border">
                <details>
                    <summary>xem them</summary>
                    <p>jkfdnhjcnbnfnbfgofnfhnhg</p>
                </details>
                <form onSubmit={onSubmit} className="row justify-content-center">
                    <h1 className="title col-6 text-red-900">
                        Them phan tu
                    </h1>
                    <div className="col-7">
                        <input className="form-control" ref={idRef} placeholder="Nhap ma thuong hieu (brand)" />
                    </div>
                    <div className="col-7">
                        <input className="form-control" ref={nameRef} placeholder="Nhap ten thuong hieu" />
                    </div>
                    <div>
                        <button className="btn btn-success">Luu</button>
                    </div>
                </form>
            </div>
            <div className="border">
                {loading ? (
                    <p>Loading...</p>
                ) : error ? (
                    <p>Error: {error.message}</p>
                ) : (
                    <table className="table table-bordered">
                        <thead>
                            <tr>
                                <th>Ma thuong hieu</th>
                                <th>Ten thuong hieu</th>
                            </tr>
                        </thead>
                        <tbody>
                            {brands.map(b => (
                                <tr>
                                    <td key={b.brand_id}>
                                        {b.brand_id}
                                    </td>
                                    <td>
                                        {b.brand_name}
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                )}
            </div>
        </div>
    );
}