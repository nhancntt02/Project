import { useState } from "react";

export default function AddDiscount() {
    const [formData, setFormData] = useState({
        ds_name: '',
        ds_quantity: '',
        ds_type: 'percent', // 'percent' hoặc 'fixed'
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
        if (ds_type === 'percent' && (parseFloat(ds_value) >= 1 || parseFloat(ds_value) <= 0)) {
            formErrors.ds_value = "Giá trị phần trăm phải nhỏ hơn 1 và lớn hơn 0.";
        }

        setErrors(formErrors);
        return Object.keys(formErrors).length === 0;
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (validateForm()) {
            console.log("Form data:", formData);
            // Gửi dữ liệu lên server hoặc thực hiện hành động tiếp theo
        }
    };
    return (
        <div className="container max-w-md mx-auto mt-10">
            <h2 className="text-2xl font-bold mb-5">Thêm mã giảm giá</h2>
            <form onSubmit={handleSubmit} className="space-y-4">
                {/* Tên mã giảm giá */}
                <div>
                    <label className="block text-gray-700">Tên mã giảm giá</label>
                    <input
                        type="text"
                        name="ds_name"
                        value={formData.ds_name}
                        onChange={handleChange}
                        className="w-full border border-gray-300 px-4 py-2 rounded"
                        required
                    />
                </div>

                {/* Số lượng */}
                <div>
                    <label className="block text-gray-700">Số lượng mã</label>
                    <input
                        type="number"
                        name="ds_quantity"
                        value={formData.ds_quantity}
                        onChange={handleChange}
                        className="w-full border border-gray-300 px-4 py-2 rounded"
                        required
                    />
                </div>

                {/* Loại mã giảm giá */}
                <div>
                    <label className="block text-gray-700">Loại mã giảm giá</label>
                    <select
                        name="ds_type"
                        value={formData.ds_type}
                        onChange={handleChange}
                        className="w-full border border-gray-300 px-4 py-2 rounded"
                    >
                        <option value="percent">Phần trăm</option>
                        <option value="fixed">Giảm giá cố định</option>
                    </select>
                </div>

                {/* Giá trị */}
                <div>
                    <label className="block text-gray-700">Giá trị</label>
                    <input
                        type="number"
                        name="ds_value"
                        step="0.01"
                        value={formData.ds_value}
                        onChange={handleChange}
                        className="w-full border border-gray-300 px-4 py-2 rounded"
                        required
                    />
                    {errors.ds_value && (
                        <p className="text-red-500 text-sm">{errors.ds_value}</p>
                    )}
                </div>

                {/* Ngày bắt đầu */}
                <div>
                    <label className="block text-gray-700">Ngày bắt đầu</label>
                    <input
                        type="date"
                        name="ds_start"
                        value={formData.ds_start}
                        onChange={handleChange}
                        className="w-full border border-gray-300 px-4 py-2 rounded"
                        required
                    />
                </div>

                {/* Ngày hết hạn */}
                <div>
                    <label className="block text-gray-700">Ngày hết hạn</label>
                    <input
                        type="date"
                        name="ds_end"
                        value={formData.ds_end}
                        onChange={handleChange}
                        className="w-full border border-gray-300 px-4 py-2 rounded"
                        required
                    />
                    {errors.ds_end && (
                        <p className="text-red-500 text-sm">{errors.ds_end}</p>
                    )}
                </div>

                {/* Nút submit */}
                <div>
                    <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600">
                        Thêm mã giảm giá
                    </button>
                </div>
            </form>
        </div>
    )
}