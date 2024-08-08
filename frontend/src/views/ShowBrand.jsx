import { useEffect, useState } from "react";
import axiosClient from "../axios-client";

export default function Brand() {
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
// 2:08:00 trong video co doan chinh sua va delete
    return (
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
    );
}
