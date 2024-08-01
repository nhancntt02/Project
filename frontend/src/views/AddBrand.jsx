import { useRef } from "react";
import axiosClient from "../axios-client";

export default function Home() {

    const idRef = useRef();
    const nameRef = useRef();

    const onSubmit = (ev) => {
        ev.preventDefault();
        const payload = {
            id_brand: idRef.current.value,
            brand_name: nameRef.current.value
        }
        console.log(payload);
        axiosClient.post('/add/brand', payload)
            .then(({ data }) => {
                console.log(data)
            })
            .catch(err => {
                console.error(err);
            });
    }

    return (
        <div className="">
            <div className="">
                <details>
                    <summary>xem them</summary>
                    <p>jkfdnhjcnbnfnbfgofnfhnhg</p>
                </details>
                <form onSubmit={onSubmit} className="flex justify-center">
                    <h1 className="title ">
                        Them phan tu
                    </h1>
                    <div className="">
                       <input className="" ref={idRef}placeholder="Nhap ma thuong hieu (brand)" /> 
                    </div>
                    <div className="">
                        <input className=""ref={nameRef}  placeholder="Nhap ten thuong hieu" />
                    </div>
                    <div>
                       <button className="">Luu</button> 
                    </div>
                </form>
            </div>
        </div>
    );
}