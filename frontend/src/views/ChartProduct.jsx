import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axiosClient from "../axios-client";
import MonthBar from "../components/Monthbar";
import QuarterlyBar from "../components/QuarterlyBar";
export default function ChartProduct() {
    const product_id = useParams().product_id;
    const [revenue, setRevenue] = useState([]);
    const [totalRevenue, setTotalRevenue] = useState(0);

    useEffect(() => {
        getRevenueProduct();
    }, [])

    const getRevenueProduct = async () => {
        try {
            const res = await axiosClient.get(`/revenue/product/${product_id}`);
            console.log(res.data.data);
            setRevenue(res.data.data);
        } catch (error) {
            console.log(error);
        }
    }

    useEffect(() => {
        if (revenue.length > 0) {
            let total = 0;
            revenue.forEach(item => {
                total += item.io_price * item.io_quantity;
            });
            setTotalRevenue(total);
        }
    }, [revenue])


    return (
        <div className="chart-product">
            {
                revenue.length > 0 ? (
                    <div>
                        <div>Tổng doanh thu sản phẩm:  {new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(totalRevenue)}</div>

                        <div className="mb-4"> <MonthBar dataApi={revenue} /></div>
                        <QuarterlyBar dataApi={revenue} />
                    </div>
                ) : (
                    <div>
                        Sản phẩm chưa có lượt mua
                    </div>
                )
            }

        </div>
    )
}