import { useEffect, useRef, useState } from "react"
import axiosClient from "../axios-client";
export default function ProductTable() {
    const [addProduct, setAddProduct] = useState([]);
    const [saleProduct, setSaleProduct] = useState([]);

    useEffect(() => {
        getPriceProduct();
    }, [])

    const getPriceProduct = async () => {
        try {
            const res = await axiosClient.get('/price/product/add');
            const res2 = await axiosClient.get('/price/product/sale');

            setAddProduct(res.data.data);
            setSaleProduct(res2.data.data);
        } catch (error) {
            console.log(error);
        }
    }

    return (
        <div className="">
            <table className="min-w-full bg-white border border-gray-300">
                <thead>
                    <tr className="bg-gray-200">
                        <th className="py-2 px-4 border-b border-gray-300 text-left">Sản phẩm</th>
                        <th className="py-2 px-4 border-b border-gray-300 text-right">Số lượng nhập</th>
                        <th className="py-2 px-4 border-b border-gray-300 text-right">Tiền nhập</th>
                        <th className="py-2 px-4 border-b border-gray-300 text-right">Số lượng bán</th>
                        <th className="py-2 px-4 border-b border-gray-300 text-right">Tiền bán</th>
                        <th className="py-2 px-4 border-b border-gray-300 text-right">Lợi nhuận trên mỗi sản phẩm bán ra</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        addProduct.map((item, index) => (
                            <tr key={index} className="hover:bg-gray-100">
                                <td className="text-left py-2 px-4 border-b border-gray-300">
                                    {item.product?.product_name}
                                </td>
                                <td className="text-right py-2 px-4 border-b border-gray-300">
                                    {item.total_quantity}
                                </td>
                                <td className="text-right py-2 px-4 border-b border-gray-300">
                                    {item.total_price}
                                </td>
                                <td className="text-right py-2 px-4 border-b border-gray-300">
                                    {saleProduct[index].total_quantity}
                                </td>
                                <td className="text-right py-2 px-4 border-b border-gray-300">
                                    {saleProduct[index].total_price}
                                </td>
                                <td className="text-right py-2 px-4 border-b border-gray-300">
                                    {
                                        (
                                            (saleProduct[index].total_price / saleProduct[index].total_quantity)
                                            -
                                            (item.total_price / item.total_quantity)
                                        ).toFixed(2)
                                    }
                                </td>
                            </tr>
                        ))
                    }
                </tbody>
            </table>
        </div>
    )
}