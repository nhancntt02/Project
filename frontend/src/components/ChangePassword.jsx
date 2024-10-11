import { useEffect, useRef, useState } from "react";
import { useStateContext } from "../contexts/ContextProvider";
import axiosClient from "../axios-client";
import { AiOutlineEye, AiOutlineEyeInvisible } from 'react-icons/ai';


const ChangePassword = () => {
    const employee_id = sessionStorage.getItem('employeeId');
    const [showOldPassword, setShowOldPassword] = useState(false);
    const [showNewPassword, setShowNewPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const [oldPassword, setOldPassword] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');

    const handleChangePassword = async () => {
        setError('');

        // Kiểm tra điều kiện lỗi
        if (newPassword === oldPassword) {
            setError("Mật khẩu mới không được trùng với mật khẩu cũ.");
            return;
        }

        if (newPassword !== confirmPassword) {
            setError("Mật khẩu mới và mật khẩu xác nhận không khớp.");
            return;
        }

        // Thực hiện gọi API hoặc xử lý logic đổi mật khẩu ở đây
        const payload = {
            passwordOld: oldPassword,
            passwordNew: newPassword
        };
        try {
            const res = await axiosClient.put(`/changepassword/${employee_id}`, payload);
            if (res.status == 200) {
                setSuccess("Đổi mật khẩu thành công");
                setTimeout(() => {
                    setSuccess("");
                }, 2000);
            }
        } catch (error) {
            const err = error.response;
            if (err.status == 401) {
                setError(err.data.message);
            }
            if (err.status == 422) {
                setError("Mật khẩu chứa ít nhất một chữ cái in hoa và một ký tự")
            }

        }

        // Bạn có thể thêm logic gửi yêu cầu đến server ở đây
    };
    return (
        <div className="container">
            <div className="w-[600px] mx-auto bg-white px-8 py-4 rounded-lg">
                <div className="text-center mb-6 text-2xl font-bold text-gray-800">
                    Đổi mật khẩu
                </div>

                {/* Error & Success Messages */}
                {error && <div className="text-red-500 mb-4 text-center font-semibold">{error}</div>}
                {success && <div className="text-green-500 mb-4 text-center font-semibold">{success}</div>}

                {/* Old Password */}
                <div className="w-full flex items-center mb-5 gap-4">
                    <label className="w-1/3 font-medium text-gray-700 text-right">Nhập mật khẩu cũ</label>
                    <div className="flex-grow relative">
                        <input
                            type={showOldPassword ? 'text' : 'password'}
                            value={oldPassword}
                            onChange={(e) => setOldPassword(e.target.value)}
                            className="border border-gray-300 rounded-md px-3 py-2 w-full focus:outline-none focus:ring-2 focus:ring-blue-400"
                        />
                        <button
                            onClick={() => setShowOldPassword(!showOldPassword)}
                            className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700 transition"
                        >
                            {showOldPassword ? <AiOutlineEyeInvisible /> : <AiOutlineEye />}
                        </button>
                    </div>
                </div>

                {/* New Password */}
                <div className="w-full flex items-center mb-5 gap-4">
                    <label className="w-1/3 font-medium text-gray-700 text-right">Nhập mật khẩu mới</label>
                    <div className="flex-grow relative">
                        <input
                            type={showNewPassword ? 'text' : 'password'}
                            value={newPassword}
                            onChange={(e) => setNewPassword(e.target.value)}
                            className="border border-gray-300 rounded-md px-3 py-2 w-full focus:outline-none focus:ring-2 focus:ring-blue-400"
                        />
                        <button
                            onClick={() => setShowNewPassword(!showNewPassword)}
                            className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700 transition"
                        >
                            {showNewPassword ? <AiOutlineEyeInvisible /> : <AiOutlineEye />}
                        </button>
                    </div>
                </div>

                {/* Confirm New Password */}
                <div className="w-full flex items-center mb-5 gap-4">
                    <label className="w-1/3 font-medium text-gray-700 text-right">Nhập lại mật khẩu mới</label>
                    <div className="flex-grow relative">
                        <input
                            type={showConfirmPassword ? 'text' : 'password'}
                            value={confirmPassword}
                            onChange={(e) => setConfirmPassword(e.target.value)}
                            className="border border-gray-300 rounded-md px-3 py-2 w-full focus:outline-none focus:ring-2 focus:ring-blue-400"
                        />
                        <button
                            onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                            className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700 transition"
                        >
                            {showConfirmPassword ? <AiOutlineEyeInvisible /> : <AiOutlineEye />}
                        </button>
                    </div>
                </div>

                {/* Submit Button */}
                <div className="flex justify-center mt-6">
                    <button
                        onClick={handleChangePassword}
                        className="bg-blue-500 text-white font-semibold py-2 px-6 rounded-md hover:bg-blue-600 transition duration-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    >
                        Đổi mật khẩu
                    </button>
                </div>
            </div>

        </div>
    )

}

export default ChangePassword;