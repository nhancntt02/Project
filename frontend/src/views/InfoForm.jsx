import { useEffect, useRef, useState } from "react";
import { Link, Navigate, useParams } from "react-router-dom"
import { useNavigate } from "react-router-dom";
import axiosClient from "../axios-client";
import { FaCheck, FaPlus, FaTicketAlt, FaTrash, FaTrashAlt, FaTimes } from "react-icons/fa";
import AddDetailForm from "./AddDetailForm";
export default function InfoForm() {
    const navigate = useNavigate();
    const data = useParams();
    const [form, setForm] = useState([]);
    const [details, setDetails] = useState([]);
    const [isVisible, setIsVisible] = useState(false);
    const [images, setImages] = useState([]);
    const [totalPrice, setTotalPrice] = useState(0);
    const [products, setProducts] = useState([]);
    const contentRef = useRef();

    useEffect(() => {
        getForm();
        getDetailForm();
        // getUsers();
        getImages();
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

    // const getUsers = () => {
    //     //setLoading(true);
    //     axiosClient.get('/users')
    //         .then(({ data }) => {
    //             setUsers(data.users);
    //             //setLoading(false);
    //         })
    //         .catch(err => {
    //             console.log(err);
    //             //setLoading(false);
    //         });
    // }

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

    const getImages = () => {
        //setLoading(true);
        axiosClient.get('/images')
            .then(({ data }) => {
                setImages(data.data);
                //setLoading(false);
            })
            .catch(error => {
                console.error('Error fetching image:', error);
                //  setError(error);
                // setLoading(false);
            });
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
            fap_content: contentRef.current.value,
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
        setIsVisible(true);
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

    const deleteDetailForm = async (detail_id) => {
        try {
            const res = await axiosClient.delete(`/delete/info/fap/${detail_id}`);
            if (res.status == 200) {
                getDetailForm();
            }
        } catch (error) {
            console.log(error);
        }
    }

    return (
        <div className="px-2">
            <div className="h-screen bg-bgheader-400">
                <div className="h-[10%] border-b flex justify-center items-center bg-bgheader-200">
                    <div className="text-bgheader-300 text-center text-4xl my-4 font-semibold">Quản lý nhập hàng</div>
                </div>
                <div className="px-6">
                    <button
                        onClick={() => navigate(-1)}  // Go back to the previous page
                        className="px-3 py-1 text-center bg-blue-400 text-white rounded hover:bg-blue-800 mt-3"
                    >Trở về</button>
                    {
                        form[0]?.fap_status == 0 && (
                            <button onClick={addProduct} className="mx-4 px-3 py-1 text-center bg-blue-400 text-white rounded hover:bg-blue-800 mt-3">
                                <FaPlus className="inline mb-1" />  Thêm sản phẩm
                            </button>
                        )
                    }
                </div>

                <div className="">
                    <div className="m-6 p-4 border rounded bg-yellow-50">
                        <h1 className="text-2xl font-bold text-center mb-3">Thông tin của phiếu nhập</h1>
                        <div className="grid grid-cols-2 gap-6">
                            {/* Column 1 */}
                            <div className="border p-4 rounded-lg bg-white flex justify-center">
                                <table className="w-[80%] table-auto">
                                    <tbody>
                                        <tr className="border-b">
                                            <td className="font-bold py-2">Mã phiếu nhập</td>
                                            <td className="py-2">{form[0]?.fap_id}</td>
                                        </tr>
                                        <tr className="border-b">
                                            <td className="font-bold py-2">Nhân viên tạo</td>
                                            <td className="py-2 font-bold">{form[0]?.employee?.name}</td>
                                        </tr>
                                        <tr className="border-b">
                                            <td className="font-bold py-2">Ngày tạo</td>
                                            <td className="py-2">{form[0]?.fap_date_create}</td>
                                        </tr>
                                        <tr className="border-b">
                                            <td className="font-bold py-2">Ngày xác nhận</td>
                                            <td className="py-2">{form[0]?.fap_date_confirm}</td>
                                        </tr>
                                        <tr className="border-b">
                                            <td className="font-bold py-2">Trạng thái</td>
                                            {
                                                form[0]?.fap_status == 0 ? (
                                                    <td className="py-2 "><span className="bg-bgheader-300 text-white font-semibold px-1 rounded" >Chờ xác nhận</span></td>
                                                ) : (
                                                    <td className="py-2"><span className="bg-green-600 text-white font-semibold px-1 rounded">Đã xác nhận</span></td>
                                                )
                                            }
                                        </tr>
                                        <tr>
                                            <td className="font-bold py-2">Thành tiền</td>
                                            <td className="py-2 text-red-500">{new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(totalPrice)}</td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>


                            {/* Column 2 */}
                            <div className="border p-4 rounded-lg bg-white">
                                <label htmlFor="fapContent" className="font-bold block mb-2">Nội dung:</label>
                                <textarea
                                    id="fapContent"
                                    ref={contentRef}
                                    defaultValue={form[0]?.fap_content}
                                    className="w-full p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    rows="5"
                                />

                                {form[0]?.fap_status === 0 && (
                                    <div className="mt-4 flex space-x-3">
                                        <button
                                            onClick={deleteForm}
                                            className="bg-red-500 text-white font-semibold py-2 px-4 rounded-lg hover:bg-red-600 transition duration-200 flex items-center gap-1"
                                        >
                                            <FaTrashAlt className="inline" /> Xóa phiếu nhập
                                        </button>
                                        <button
                                            onClick={confirmForm}
                                            className="bg-green-500 text-white font-semibold py-2 px-4 rounded-lg hover:bg-green-600 transition duration-200 flex items-center gap-1"
                                        >
                                            <FaCheck className="inline" />  Xác nhận phiếu nhập
                                        </button>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>


                    <div className="flex justify-center mx-6 bg-yellow-50">
                        <div className="border w-full p-2">
                            {
                                (details.length > 0) ? (
                                    <div className="overflow-auto max-h-[170px]">
                                        <table className="min-w-full bg-white border border-gray-300">
                                            <thead className="bg-gray-100">
                                                <tr>
                                                    <th className="py-2 px-4 border-b border-gray-300 text-sm font-medium text-gray-700 text-center">
                                                        STT
                                                    </th>
                                                    <th className="py-2 px-4 border-b border-gray-300 text-left text-sm font-medium text-gray-700">
                                                        Tên sản phẩm
                                                    </th>
                                                    <th className="py-2 px-4 border-b border-gray-300 text-sm font-medium text-gray-700">
                                                        Hình ảnh
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
                                                    <th className="py-2 px-4 border-b border-gray-300 text-left text-sm font-medium text-gray-700">
                                                        Xóa
                                                    </th>
                                                </tr>
                                            </thead>
                                            <tbody >
                                                {details.map((detail, index) => (
                                                    <tr key={index} className="hover:bg-gray-50">
                                                        <td className="py-2 px-4 border-b border-gray-300 text-sm text-gray-800 text-center">
                                                            {index + 1}
                                                        </td>
                                                        <td onClick={() => goInfoProduct(detail.product_id)} className="py-2 px-4 border-b border-gray-300 text-sm text-gray-500 hover:cursor-pointer font-bold hover:text-gray-900">
                                                            {products.find(p => p.product_id == detail.product_id)?.product_name}
                                                        </td>
                                                        <td className="py-2 px-4 border-b border-gray-300 flex justify-center ">
                                                            <img src={images.find(i => i.product_id == detail.product_id)?.image_value} className="w-[50px]" alt="" />
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
                                                        <td className="py-2 px-4 border-b border-gray-300 text-sm text-red-500">
                                                            <FaTrashAlt onClick={() => deleteDetailForm(detail.detail_id)} className="hover:text-red-700 hover:cursor-pointer" />
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
            <div>
                {
                    isVisible && (
                        <div className="fixed inset-0 top-0 left-0 w-full h-full bg-gray-900 bg-opacity-50 z-10">

                            <div className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-white p-4 rounded shadow-md">
                                <div className="flex justify-end">
                                    <button onClick={() => { setIsVisible(false); getDetailForm() }}>
                                        <FaTimes />
                                    </button>
                                </div>

                                <AddDetailForm fap_id={data.fap_id} />
                            </div>
                        </div>
                    )
                }
            </div>
        </div>
    )
}