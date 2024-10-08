import { useEffect, useState } from "react";
import { Link, Navigate, useParams } from "react-router-dom"
import { useNavigate } from "react-router-dom";
import axiosClient from "../axios-client";

export default function InfoForm() {
    const navigate = useNavigate();
    const data = useParams();
    const [form, setForm] = useState([]);
    const [details, setDetails] = useState([]);
    const [users, setUsers] = useState([]);
    const [totalPrice, setTotalPrice] = useState(0);
    const [products, setProducts] = useState([]);

    useEffect(() => {
        getForm();
        getDetailForm();
        getUsers();
        getProducts();
    }, []);

    const getForm = async () => {
        try {
            const res = await axiosClient.get(`/form/${data.fap_id}`);
            setForm(res.data.data);
            console.log(res.data.data)
        } catch (error) {
            console.log(error);
        }
    }

    const getDetailForm = async () => {
        try {
            const res = await axiosClient.get(`/detail/${data.fap_id}`);
            const fetchedDetails = res.data.data;
            console.log(fetchedDetails);
            setDetails(fetchedDetails);

            const calculatedTotalPrice = fetchedDetails.reduce((acc, item) => {
                return acc + item.detail_price * item.detail_quantity;
            }, 0);

            setTotalPrice(calculatedTotalPrice);
        } catch (error) {
            console.log(error);
        }
    }

    const getUsers = () => {
        //setLoading(true);
        axiosClient.get('/users')
            .then(({ data }) => {
                setUsers(data.users);
                //setLoading(false);
            })
            .catch(err => {
                console.log(err);
                //setLoading(false);
            });
    }

    const getProducts = async () => {
        //setLoading(true);
        try {
            const res = await axiosClient.get('/products');
            //console.log(res.data.data);
            setProducts(res.data.data);
            //setLoading(false);
        } catch (error) {
            console.error('Error fetching pin:', error);
            setError(error);
            //setLoading(false);
        }
    };

    const editForm = async (fap_id) => {
        alert('Chinh sua thong tin phieu nhap');
        navigate(`/editform/${fap_id}`);
    }

    const deleteForm = async (ev) => {
        ev.preventDefault();
        alert('Xoa thong tin phieu nhap');
        try {
            const res = await axiosClient.delete(`/delete/form/${data.fap_id}`);
            //console.log(res.data.message);
            //alert(res.data.message);
            navigate(-1);
        } catch (error) {
            console.log(error);
        }
    }

    const confirmForm = async (ev) => {
        ev.preventDefault();
        alert('Xac nhan phieu nhap');

        const now = new Date();

        const payload = {
            fap_content: form[0]?.fap_content,
            fap_date_confirm: now.toISOString().substr(0, 10),
            employee_id: form[0]?.employee_id,
            fap_status: 1,
            fap_total_amount: totalPrice
        }

        try {
            const res = await axiosClient.put(`/update/form/${data.fap_id}`, payload);
            console.log(res.data.message);
            await axiosClient.put(`/update/fap/quantity/${data.fap_id}`);
            getForm();
            // update trạng thái của sản phẩm vừa được xác nhận
            updateStatusProduct();
        } catch (error) {
            console.log(error);
        }
    }

    const addProduct = () => {
        navigate(`/add/detail/${data.fap_id}`);
    }

    const updateStatusProduct = async () => {

        for (let i = 0; i < details.length; i++) {
            for (let j = 0; j < products.length; j++) {
                if (details[i].product_id == products[j].product_id) {
                    if (products[j].product_status == "Hết hàng") {
                        products[j].product_status = "Còn hàng";
                        console.log("update" + products[j].product_name);
                        await axiosClient.put(`update/product/${products[j].product_id}`, products[j]);
                    }
                }
            }
        }
    }

    const goInfoProduct = (product_id) => {
        navigate(`/infoproduct/${product_id}`);
    }

    return (
        <div className="px-2">
            <div className="h-screen">
                <div className="h-[16%] border-b flex justify-center items-center bg-bgheader-200">
                    <div className="text-bgheader-300 text-center text-4xl my-4 font-semibold">Quản lý nhập hàng</div>
                </div>
                <div>
                    <button
                        onClick={() => navigate(-1)}  // Go back to the previous page
                        className="px-3 py-1 text-center bg-blue-400 text-white rounded hover:bg-blue-800 mt-3"
                    >Trở về</button>
                    {
                        form[0]?.fap_status == 0 && (
                            <button onClick={addProduct} className="mx-4 px-3 py-1 text-center bg-blue-300 text-white rounded hover:bg-blue-800 mt-3">
                                Thêm sản phẩm
                            </button>
                        )
                    }
                </div>
                <h1 className="mt-4 text-2xl font-bold text-center mb-6">Thông tin của phiếu nhập</h1>
                <div className="flex">
                    <div className="basis-1/3 flex justify-center">
                        <div className="w-[80%] border p-2">
                            <div>
                                <strong>Mã phiếu nhập:</strong> {form[0]?.fap_id} <br />
                                <strong>Nội dung:</strong> {form[0]?.fap_content} <br />
                                <strong>Ngày tạo:</strong> {form[0]?.fap_date_create} <br />
                                <strong>Ngày xác nhận</strong>: {form[0]?.fap_date_confirm || "Chưa xác nhận"} <br />
                                <strong>Người tạo:</strong> {form[0]?.employee?.name} <br />
                                <strong>Trạng thái:</strong> {form[0]?.fap_status == 0 ? 'Chưa xác nhận' : 'Đã xác nhận'} <br />
                                <strong>Thành tiền:</strong> {new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(totalPrice)}
                            </div>
                            {
                                form[0]?.fap_status == 0 &&
                                (<div className="mt-3">
                                    <button onClick={() => editForm(form[0].fap_id)} className="bg-blue-500 text-white font-semibold py-1 px-2 rounded hover:bg-blue-600">
                                        Chỉnh sửa
                                    </button>
                                    <button onClick={deleteForm} className="bg-red-500 text-white font-semibold py-1 px-2 rounded hover:bg-red-600 ml-2">
                                        Xóa
                                    </button>
                                    <button onClick={confirmForm} className="bg-green-500 text-white font-semibold py-1 px-2 rounded hover:bg-green-600 ml-2">
                                        Xác nhận
                                    </button>

                                </div>)
                            }

                        </div>
                    </div>

                    <div className="basis-2/3 flex justify-center">
                        <div className="border w-full p-2">
                            <div>
                                <h2 className="text-center text-xl font-bold">Danh sách sản phẩm</h2>
                            </div>
                            <hr className="border-b-sky-300 " />
                            {
                                (details.length > 0) ? (
                                    <div>
                                        <table className="min-w-full bg-white border border-gray-300">
                                            <thead className="bg-gray-100">
                                                <tr>
                                                    <th className="py-2 px-4 border-b border-gray-300 text-sm font-medium text-gray-700 text-center">
                                                        STT
                                                    </th>
                                                    <th className="py-2 px-4 border-b border-gray-300 text-left text-sm font-medium text-gray-700">
                                                        Tên sản phẩm
                                                    </th>
                                                    <th className="py-2 px-4 border-b border-gray-300 text-center text-sm font-medium text-gray-700">
                                                        Nhà cung cấp
                                                    </th>
                                                    <th className="py-2 px-4 border-b border-gray-300 text-center text-sm font-medium text-gray-700">
                                                        Số lượng
                                                    </th>
                                                    <th className="py-2 px-4 border-b border-gray-300 text-center text-sm font-medium text-gray-700">
                                                        Đơn vị tính
                                                    </th>
                                                    <th className="py-2 px-4 border-b border-gray-300 text-left text-sm font-medium text-gray-700">
                                                        Đơn giá
                                                    </th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                {details.map((detail, index) => (
                                                    <tr key={index} className="hover:bg-gray-50">
                                                        <td className="py-2 px-4 border-b border-gray-300 text-sm text-gray-800 text-center">
                                                            {index + 1}
                                                        </td>
                                                        <td onClick={() => goInfoProduct(detail.product_id)} className="py-2 px-4 border-b border-gray-300 text-sm text-gray-500 hover:cursor-pointer font-bold hover:text-gray-900">
                                                            {products.find(p => p.product_id == detail.product_id)?.product_name}
                                                        </td>
                                                        <td className="py-2 px-4 border-b border-gray-300 text-sm text-gray-800 text-center">
                                                            {detail.supplier?.supplier_name}
                                                        </td>
                                                        <td className="py-2 px-4 border-b border-gray-300 text-center text-sm text-gray-800">
                                                            {detail.detail_quantity}
                                                        </td>
                                                        <td className="py-2 px-4 border-b border-gray-300 text-center text-sm text-gray-800">
                                                            Cái
                                                        </td>
                                                        <td className="py-2 px-4 border-b border-gray-300 text-sm text-gray-800">
                                                            {new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(detail.detail_price)}
                                                        </td>
                                                    </tr>
                                                ))}
                                            </tbody>
                                        </table>

                                    </div>
                                ) :
                                    (
                                        <div className="text-center text-lg  text-red-500">Chưa có sản phẩm </div>
                                    )
                            }

                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}