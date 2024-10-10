import { useState } from "react";
import axiosClient from "../axios-client";

export default function AddDiscount() {
    const [formData, setFormData] = useState({
        ds_name: '',
        ds_quantity: '',
        ds_code: '',
        ds_type: '', // 'percent' hoặc 'fixed'
        ds_value: '',
        ds_start: '',
        ds_end: ''
    });

    const [errors, setErrors] = useState({});


    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value
        });
    };

    const validateForm = () => {
        let formErrors = {};
        const { ds_start, ds_end, ds_type, ds_value } = formData;
        const startDate = new Date(ds_start);
        const endDate = new Date(ds_end);

        // Kiểm tra ngày
        if (endDate <= startDate) {
            formErrors.ds_end = "Ngày hết hạn phải lớn hơn ngày bắt đầu.";
        }

        // Kiểm tra loại và giá trị
        if (ds_type === 'Giảm giá theo phần trăm' && (parseFloat(ds_value) >= 1 || parseFloat(ds_value) <= 0)) {
            formErrors.ds_value = "Giá trị phần trăm phải nhỏ hơn 1 và lớn hơn 0.";
        }

        setErrors(formErrors);
        return Object.keys(formErrors).length === 0;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (validateForm()) {
            const res = await axiosClient.post('/add/discount', formData);
            if (res.status === 200) {
                setFormData({
                    ds_name: '',
                    ds_quantity: '',
                    ds_code: '',
                    ds_type: '',
                    ds_value: '',
                    ds_start: '',
                    ds_end: ''
                });
            }
        }
    };
    return (
        <div className="container w-[600px] mx-auto">
            <div className="">
                <h2 className=" text-3xl font-bold mb-5 text-center">Thêm mã giảm giá</h2>
                <hr className="mb-4 h-[2px]" />
                <form className="grid grid-cols-2 gap-4">
                    <div>
                        {/* Tên mã giảm giá */}
                        <div className="mb-4">
                            <label className="block text-gray-700">Tên mã giảm giá<span className="text-red-500">*</span></label>
                            <input
                                type="text"
                                name="ds_name"
                                value={formData.ds_name}
                                onChange={handleChange}
                                className="w-full border border-gray-300 px-4 py-2 rounded mt-2"
                                required
                            />
                        </div>
                        {/* Mã code giảm giá */}
                        <div className="mb-4">
                            <label className="block text-gray-700">Mã giảm giá<span className="text-red-500">*</span></label>
                            <input
                                type="text"
                                name="ds_code"
                                value={formData.ds_code}
                                onChange={handleChange}
                                className="w-full border border-gray-300 px-4 py-2 rounded mt-2"
                                required
                            />
                        </div>

                        {/* Số lượng */}
                        <div className="mb-4">
                            <label className="block text-gray-700">Số lượng mã<span className="text-red-500">*</span></label>
                            <input
                                type="number"
                                name="ds_quantity"
                                value={formData.ds_quantity}
                                onChange={handleChange}
                                className="w-full border border-gray-300 px-4 py-2 rounded mt-2"
                                required
                            />
                        </div>

                        {/* Loại mã giảm giá */}
                        <div className="mb-4">
                            <label className="block text-gray-700">Loại mã giảm giá<span className="text-red-500">*</span></label>
                            <select
                                name="ds_type"
                                value={formData.ds_type}
                                onChange={handleChange}
                                className="w-full border border-gray-300 px-4 py-2 rounded mt-2"
                            >
                                <option value="Giảm giá theo phần trăm">Phần trăm</option>
                                <option value="Giảm giá theo tiền">Giảm giá cố định</option>
                            </select>
                        </div>
                    </div>
                    <div>
                        {/* Giá trị */}
                        <div className="mb-4">
                            <label className="block text-gray-700">Giá trị<span className="text-red-500">*</span></label>
                            <input
                                type="number"
                                name="ds_value"
                                step="0.01"
                                value={formData.ds_value}
                                onChange={handleChange}
                                className="w-full border border-gray-300 px-4 py-2 rounded mt-2"
                                required
                            />
                            {errors.ds_value && (
                                <p className="text-red-500 text-sm">{errors.ds_value}</p>
                            )}
                        </div>

                        {/* Ngày bắt đầu */}
                        <div className="mb-4">
                            <label className="block text-gray-700">Ngày bắt đầu<span className="text-red-500">*</span></label>
                            <input
                                type="date"
                                name="ds_start"
                                value={formData.ds_start}
                                onChange={handleChange}
                                className="w-full border border-gray-300 px-4 py-2 rounded mt-2"
                                required
                            />
                        </div>

                        {/* Ngày hết hạn */}
                        <div className="mb-4">
                            <label className="block text-gray-700">Ngày hết hạn<span className="text-red-500">*</span></label>
                            <input
                                type="date"
                                name="ds_end"
                                value={formData.ds_end}
                                onChange={handleChange}
                                className="w-full border border-gray-300 px-4 py-2 rounded mt-2"
                                required
                            />
                            {errors.ds_end && (
                                <p className="text-red-500 text-sm">{errors.ds_end}</p>
                            )}
                        </div>
                    </div>
                    {/* Nút submit */}

                </form>
                <div className="mt-2">
                    <button onClick={handleSubmit} className="bg-blue-500 text-white px-4 py-2 w-full text-lg rounded hover:bg-blue-600">
                        Thêm mã giảm giá
                    </button>
                </div>
            </div>
        </div>
    )
}