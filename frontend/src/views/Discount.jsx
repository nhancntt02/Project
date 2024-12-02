import { useEffect, useRef, useState } from "react"
import axiosClient from "../axios-client";
import { FaEdit, FaTrash, FaTimes, FaCheck } from "react-icons/fa";
import { BiSortAlt2 } from 'react-icons/bi';
import AddDiscount from "./AddDiscount";
export default function Discount() {
    const [discount, setDiscount] = useState([]);
    const [discounts, setDiscounts] = useState([]);
    const [isvisible, setIsvisible] = useState(false);
    const [sortType, setSortType] = useState(false);
    const [edit, setEdit] = useState(false);
    const [indexE, setIndexE] = useState();
    const searchRef = useRef();

    useEffect(() => {
        getDisCount()
    }, [])

    const getDisCount = async () => {
        try {
            const { data } = await axiosClient.get('/discount');
            const filterDs = data.data.filter(i => i.ds_id != 0);

            console.log(filterDs);
            setDiscount(filterDs);
            setDiscounts(filterDs);
        } catch (error) {
            console.log(error);
        }
    }


    const removeVietnameseTones = (str) => {
        return str
            .normalize('NFD')
            .replace(/[\u0300-\u036f]/g, '')
            .replace(/[Đđ]/g, 'd');
    }

    const searchDiscount = () => {
        const search = removeVietnameseTones(searchRef.current.value.toLowerCase());

        if (search == "") {
            setDiscount(discounts);
        } else {
            const filtered = discounts.filter(item => removeVietnameseTones(item.ds_name.toLowerCase()).includes(search));
            setDiscount(filtered);
        }
    }

    const deleteDiscount = async (ds_id) => {
        try {
            const res = await axiosClient.delete(`/delete/discount/${ds_id}`);
            if (res.status == 200) {
                getDisCount();
            }
        } catch (error) {
            console.log(error);
        }
    }

    const handleInputChange = (e, index, field) => {
        const newValue = e.target.value;
        const updateDiscount = [...discount];




        if (field === 'ds_end' && new Date(updateDiscount[index]['ds_start']) >= new Date(newValue)) {
            alert("Ngày kết thúc luôn lớn hơn ngày bắt đầu");
            return;
        }

        if (field === 'ds_start' && new Date(newValue) >= new Date(updateDiscount[index]['ds_end'])) {
            alert("Ngày bắt đầu phải bé hơn ngày kết thúc");
            return;
        }
        updateDiscount[index][field] = newValue;

        setDiscount(updateDiscount);
    };

    const saveDiscont = async (ds_id, index) => {
        const payload = discount[index];

        if (payload.ds_type === 'Giảm giá theo phần trăm') {
            if (payload.ds_value >= 1) {
                alert('Giảm giá theo phần trăm thì giá trị phải bé hơn 1');
                return;
            }
        }
        console.log(payload);

        try {
            const res = await axiosClient.put(`/update/discount/${ds_id}`, payload);
            if (res.status == 200) {
                setEdit(false);
                setIndexE(null);
            }
        } catch (error) {
            console.log(error);
        }
    }

    const sortList = () => {
        
        const sortedDiscount = [...discount];

        
        sortedDiscount.sort((a, b) => {
            if (sortType) {
                return a.ds_id - b.ds_id;
            } else {
                return b.ds_id - a.ds_id;
            }
        });
        
        setSortType(!sortType);
        setDiscount(sortedDiscount);
    };

    return (
        <div className="container h-screen">
            <div className="h-[10%] border-b flex justify-center items-center bg-bgheader-200">
                <div className="text-bgheader-300 text-center text-4xl my-4 font-semibold">Quản lý mã giảm giá</div>
            </div>
            <div className="px-4">
                <div>
                    <div className="flex justify-between items-center my-4 bg-bgheader-400 px-4">
                        <div className="text-2xl font-bold">
                            Danh sách tất cả mã giảm giá
                        </div>
                        <div className="my-4  flex gap-2">
                            <div className="flex items-center space-x-2">
                                <input
                                    type="text"
                                    placeholder=""
                                    className="p-2 border min-w-[100px] border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    ref={searchRef}
                                />
                                <button
                                    onClick={searchDiscount}
                                    className="bg-blue-500 text-white p-2 rounded-lg hover:bg-blue-600"
                                >
                                    Tìm kiếm
                                </button>
                            </div>
                            <div className="flex items-center">
                                <button
                                    onClick={() => { setIsvisible(true) }}
                                    className="bg-blue-500 text-white p-2 rounded-lg shadow-md hover:bg-blue-600 transition duration-300"
                                >Thêm mã giảm giá</button>
                            </div>
                        </div>
                    </div>
                    <div>
                        <div className="overflow-x-auto">
                            <table className="min-w-full table-auto border-collapse border border-gray-300 rounded-lg">
                                <thead>
                                    <tr className="bg-blue-600 text-left text-white">
                                        <th className="px-4 py-2 border border-gray-300">ID <BiSortAlt2 onClick={sortList} className="inline text-xl hover:cursor-pointer hover:text-gray-500" /></th>
                                        <th className="px-4 py-2 border border-gray-300">Tên mã giảm giá</th>
                                        <th className="px-4 py-2 border border-gray-300">Mã giảm giá</th>
                                        <th className="px-4 py-2 border border-gray-300">Số lượng mã</th>
                                        <th className="px-4 py-2 border border-gray-300">Loại mã giảm giá</th>
                                        <th className="px-4 py-2 border border-gray-300">Giá trị</th>
                                        <th className="px-4 py-2 border border-gray-300">Ngày bắt đầu</th>
                                        <th className="px-4 py-2 border border-gray-300">Ngày hết hạn</th>
                                        <th className="px-4 py-2 border border-gray-300">Trạng thái</th>
                                        <th className="px-4 py-2 border border-gray-300">Thao tác</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {
                                        discount.map((item, index) => {
                                            const currentDate = new Date();
                                            const endDate = new Date(item.ds_end);

                                            let status;
                                            if (item.ds_quantity <= 0) {
                                                status = <span className="text-red-500 ">Hết số lượng</span>;
                                            } else if (currentDate > endDate) {
                                                status = <span className="text-red-500 ">Hết hạn</span>;
                                            } else {
                                                status = <span className="text-green-500 ">Khả dụng</span>;
                                            }

                                            return (
                                                <tr key={index} className="hover:bg-gray-100">
                                                    <td className="px-4 py-2 border border-gray-300">{item.ds_id}</td>
                                                    {
                                                        // Column for ds_name (Text Input)
                                                        edit && index === indexE ? (
                                                            <td className="px-4 py-2 border border-gray-300">
                                                                <input
                                                                    type="text"
                                                                    value={item.ds_name}
                                                                    onChange={(e) => handleInputChange(e, index, 'ds_name')}
                                                                    className="border w-full px-2 py-1"
                                                                />
                                                            </td>
                                                        ) : (
                                                            <td className="px-4 py-2 font-bold border border-gray-300">{item.ds_name}</td>
                                                        )
                                                    }

                                                    {
                                                        // Column for ds_code (Text Input)
                                                        edit && index === indexE ? (
                                                            <td className="px-4 py-2 border border-gray-300">
                                                                <input
                                                                    type="text"
                                                                    value={item.ds_code}
                                                                    onChange={(e) => handleInputChange(e, index, 'ds_code')}
                                                                    className="border w-full px-2 py-1"
                                                                />
                                                            </td>
                                                        ) : (
                                                            <td className="px-4 py-2 border border-gray-300">{item.ds_code}</td>
                                                        )
                                                    }

                                                    {
                                                        // Column for ds_quantity (Number Input)
                                                        edit && index === indexE ? (
                                                            <td className="px-4 py-2 border border-gray-300">
                                                                <input
                                                                    type="number"
                                                                    value={item.ds_quantity}
                                                                    onChange={(e) => handleInputChange(e, index, 'ds_quantity')}
                                                                    className="border w-full px-2 py-1"
                                                                />
                                                            </td>
                                                        ) : (
                                                            <td className="px-4 py-2 border border-gray-300">{item.ds_quantity}</td>
                                                        )
                                                    }

                                                    {
                                                        // Column for ds_type (Select Dropdown, as per your earlier request)
                                                        edit && index === indexE ? (
                                                            <td className="px-4 py-2 border border-gray-300">
                                                                <select
                                                                    value={item.ds_type}
                                                                    onChange={(e) => handleInputChange(e, index, 'ds_type')}
                                                                    className="border w-full px-2 py-1"
                                                                >
                                                                    <option value="Giảm giá theo phần trăm">Giảm giá theo phần trăm</option>
                                                                    <option value="Giảm giá theo tiền">Giảm giá theo tiền</option>
                                                                </select>
                                                            </td>
                                                        ) : (
                                                            <td className="px-4 py-2 border border-gray-300">{item.ds_type}</td>
                                                        )
                                                    }

                                                    {
                                                        // Column for ds_value (Conditional input based on ds_type)
                                                        edit && index === indexE ? (
                                                            <td className="px-4 py-2 border border-gray-300">
                                                                <input
                                                                    type="number"
                                                                    value={item.ds_value}
                                                                    onChange={(e) => handleInputChange(e, index, 'ds_value')}
                                                                    className="border w-full px-2 py-1"
                                                                />
                                                            </td>
                                                        ) : (
                                                            <td className="px-4 py-2 border text-red-500 border-gray-300">
                                                                {item.ds_type === 'Giảm giá theo tiền'
                                                                    ? new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(item.ds_value)
                                                                    : (item.ds_value * 100) + '%'}
                                                            </td>
                                                        )
                                                    }

                                                    {
                                                        // Column for ds_start (Date Input)
                                                        edit && index === indexE ? (
                                                            <td className="px-4 py-2 border text-center border-gray-300">
                                                                <input
                                                                    type="date"
                                                                    value={item.ds_start}
                                                                    onChange={(e) => handleInputChange(e, index, 'ds_start')}
                                                                    className="border w-full px-2 py-1"
                                                                />
                                                            </td>
                                                        ) : (
                                                            <td className="px-4 py-2 border text-center border-gray-300">{item.ds_start}</td>
                                                        )
                                                    }

                                                    {
                                                        // Column for ds_end (Date Input)
                                                        edit && index === indexE ? (
                                                            <td className="px-4 py-2 border text-center border-gray-300">
                                                                <input
                                                                    type="date"
                                                                    value={item.ds_end}
                                                                    onChange={(e) => handleInputChange(e, index, 'ds_end')}
                                                                    className="border w-full px-2 py-1"
                                                                />
                                                            </td>
                                                        ) : (
                                                            <td className="px-4 py-2 border text-center border-gray-300">{item.ds_end}</td>
                                                        )
                                                    }
                                                    <td className="px-4 py-2 border font-bold border-gray-300">{status}</td>
                                                    {
                                                        edit && index === indexE ? (
                                                            <td className="border border-gray-300 px-4 py-2 text-center">
                                                                <button onClick={() => { saveDiscont(item.ds_id, index); }} className="text-green-500 hover:text-green-700">
                                                                    <FaCheck />
                                                                </button>
                                                                <button onClick={() => { setEdit(false) }} className="text-red-500 hover:text-red-700 ml-2">
                                                                    <FaTimes />
                                                                </button>
                                                            </td>
                                                        ) : (
                                                            <td className="px-4 py-2 border border-gray-300 text-center">
                                                                <button onClick={() => { setEdit(true); setIndexE(index); }} className="text-yellow-500 hover:text-yellow-700 focus:outline-none mr-2">
                                                                    <FaEdit />
                                                                </button>
                                                                <button onClick={() => { deleteDiscount(item.ds_id) }} className="text-red-500 hover:text-red-700 focus:outline-none">
                                                                    <FaTrash />
                                                                </button>
                                                            </td>
                                                        )
                                                    }

                                                </tr>
                                            );
                                        })
                                    }
                                </tbody>
                            </table>
                        </div>

                    </div>
                </div>
                <div>
                    {
                        isvisible && (
                            <div className="fixed inset-0 top-0 left-0 w-full h-full bg-gray-900 bg-opacity-50 z-10">

                                <div className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-white p-4 rounded shadow-md">
                                    <div className="fidex justify-end">
                                        <button onClick={() => { setIsvisible(false); getDisCount() }}>
                                            <FaTimes />
                                        </button>
                                    </div>

                                    <AddDiscount />
                                </div>
                            </div>
                        )
                    }
                </div>
            </div>
        </div>
    )
}