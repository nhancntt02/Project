import { useEffect, useRef, useState } from "react"
import axiosClient from "../axios-client";
export default function ProductTable() {
    const [addProduct, setAddProduct] = useState([]);
    const [saleProduct, setSaleProduct] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const productsPerPage = 10;
    useEffect(() => {
        getPriceProduct();
    }, [])

    const getPriceProduct = async () => {
        try {
            const res = await axiosClient.get('/price/product/add');
            const res2 = await axiosClient.get('/price/product/sale');
            console.log(res.data.data);
            console.log(res2.data.data);
            setAddProduct(res.data.data);
            setSaleProduct(res2.data.data);
        } catch (error) {
            console.log(error);
        }
    }

    const totalPages = Math.ceil(addProduct.length / productsPerPage);

    // Get the customers for the current page
    const indexOfLastProduct = currentPage * productsPerPage;
    const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
    const currentProducts = addProduct.slice(indexOfFirstProduct, indexOfLastProduct);

    const nextPage = () => {
        if (currentPage < totalPages) setCurrentPage(currentPage + 1);
    };

    const prevPage = () => {
        if (currentPage > 1) setCurrentPage(currentPage - 1);
    };

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
                        currentProducts.map((item, index) => (
                            <tr key={index} className="hover:bg-gray-100">
                                <td className="text-left py-2 px-4 border-b border-gray-300">
                                    {item.product?.product_name}
                                </td>
                                <td className="text-right py-2 px-4 border-b border-gray-300">
                                    {item?.total_quantity}
                                </td>
                                <td className="text-right py-2 px-4 border-b border-gray-300">
                                    {new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(item?.total_price)}
                                </td>
                                <td className="text-right py-2 px-4 border-b border-gray-300">
                                    {saleProduct.find(i => i.product_id == item.product_id)?.total_quantity || 0}
                                </td>
                                <td className="text-right py-2 px-4 border-b border-gray-300">
                                    {new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format((saleProduct.find(i => i.product_id == item.product_id)?.total_price) || (0))}
                                </td>
                                <td className="text-right py-2 px-4 border-b text-green-500 font-bold border-gray-300">
                                    {
                                        (saleProduct.find(i => i.product_id == item.product_id)?.total_price > 0) ?
                                            (new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format((
                                                (saleProduct.find(i => i.product_id == item.product_id)?.total_price / saleProduct.find(i => i.product_id == item.product_id)?.total_quantity)
                                                -
                                                (item?.total_price / item?.total_quantity)
                                            ).toFixed(2))) :
                                            new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format((0))

                                    }
                                </td>
                            </tr>
                        ))
                    }
                </tbody>
            </table>
            <div className="flex justify-end gap-4 items-center mt-2">
                <button
                    onClick={prevPage}
                    disabled={currentPage === 1}
                    className="bg-gray-300 hover:bg-gray-400 px-3 py-2 rounded disabled:opacity-50"
                >
                    Trước
                </button>
                <div className="border p-2 font-bold">{currentPage}</div>
                <button
                    onClick={nextPage}
                    disabled={currentPage === totalPages}
                    className="bg-gray-300 hover:bg-gray-400 px-3 py-2 rounded disabled:opacity-50"
                >
                    Sau
                </button>
            </div>
        </div>
    )
}