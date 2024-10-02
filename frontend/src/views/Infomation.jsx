import { useEffect, useRef, useState } from "react";
import { useStateContext } from "../contexts/ContextProvider";
import axiosClient from "../axios-client";
import { AiOutlineEye, AiOutlineEyeInvisible } from 'react-icons/ai';
export default function Infomation() {
    const { user, setUser } = useStateContext();
    const employee_id = localStorage.getItem('employeeId');
    const [cEmail, setCEmail] = useState(true);
    const [cPhone, setCPhone] = useState(true);
    const dateRef = useRef();
    const genderRef = useRef();
    const emailRef = useRef();
    const phoneRef = useRef();
    const nameRef = useRef();
    const [email, setEmail] = useState(null);
    const [phone, setPhone] = useState(null);
    const [showOldPassword, setShowOldPassword] = useState(false);
    const [showNewPassword, setShowNewPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const [oldPassword, setOldPassword] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');

    useEffect(() => {
        getUser();
    }, []);

    const getUser = () => {
        axiosClient.get('/user')
            .then(({ data }) => {
                console.log(data);
                setUser(data);
            })
            .catch(error => {
                console.log(error);
            })
    }

    useEffect(() => {
        if (!email && !phone && user) {
            setEmail(user.email);
            setPhone(user.phone);
            if (nameRef.current) nameRef.current.value = user.name;
            if (emailRef.current) emailRef.current.value = user.email;
            if (phoneRef.current) phoneRef.current.value = user.phone;
            if (genderRef.current) genderRef.current.value = user.gender;
        }
    }, [user])

    // const maskEmail = (email) => {
    //     if (email && typeof email === 'string') {
    //         const [name, domain] = email.split("@");
    //         const maskedName = name.slice(0, 2) + "*".repeat(name.length - 2);
    //         return `${maskedName}@${domain}`;
    //     }

    // }

    // const maskPhone = (phone) => {
    //     if (phone && typeof phone === 'string') {
    //         const lastFourDigits = phone.slice(-4);
    //         const maskedSection = "*".repeat(phone.length - 4);
    //         return `${maskedSection}${lastFourDigits}`;
    //     }

    // }

    const ChaneInfoCustomer = async () => {
        const payload = {
            name: nameRef.current.value,
            email: email,
            phone: phone,
            gender: genderRef.current,
            birthday: dateRef.current.value
        };

        console.log(payload);
        try {
            const res = await axiosClient.put(`/update/user/${user.id}`, payload);
            getUser();
        } catch (error) {
            console.log(error);
        }
    }
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
            if(res.status == 200) {
                setSuccess("Đổi mật khẩu thành công");
                setTimeout(() => {
                    setSuccess("");
                }, 2000);
            }
        } catch (error) {
            const err = error.response;
            if(err.status == 401) {
                setError(err.data.message);
            }
            if(err.status == 422){
                setError("Mật khẩu chứa ít nhất một chữ cái in hoa và một ký tự")
            }
                
        }
        
        // Bạn có thể thêm logic gửi yêu cầu đến server ở đây
    };
    return (
        <div className="container h-screen">
            <div className="h-[16%] border flex justify-center items-center bg-bgheader-200">
                <div className="text-bgheader-300 text-center text-4xl my-4 font-semibold">Thông tin cá nhân</div>
            </div>
            <div className="mt-2 flex  pt-5">
                <div className="basis-1/2 pr-4 border-r">
                    <div className="w-full flex items-center mb-4 gap-4">
                        <label className="w-1/4 font-medium text-gray-700 text-right" htmlFor="">Họ và tên</label>
                        <input
                            type="text"
                            ref={nameRef}
                            className="flex-grow border rounded-md px-2 py-1 focus:outline-none focus:ring focus:border-blue-400"
                        />
                    </div>
                    <div className="w-full flex items-center mb-4 gap-4">
                        <label className="w-1/4 font-medium text-gray-700 text-right" htmlFor="">Email</label>
                        <div className="flex-grow flex gap-2 items-center">
                            {
                                cEmail ? (<p className="text-gray-800">{email}</p>)
                                    : (
                                        <input
                                            type="email"
                                            ref={emailRef}
                                            placeholder="Hãy nhập gmail muốn đổi"
                                            className="flex-grow border rounded-md px-2 py-1 focus:outline-none focus:ring focus:border-blue-400"
                                        />
                                    )
                            }
                            {
                                cEmail ? (<p onClick={() => { setCEmail(!cEmail); }} className="text-blue-500 underline hover:cursor-pointer hover:text-blue-600">
                                    Thay đổi
                                </p>) : (
                                    <div className="flex gap-1">
                                        <p onClick={() => { setEmail(emailRef.current.value); setCEmail(!cEmail); }} className="text-green-500 underline hover:cursor-pointer hover:text-green-600">
                                            Đổi
                                        </p>
                                        <p onClick={() => { setCEmail(!cEmail); }} className="text-red-500 underline hover:cursor-pointer hover:text-red-600">
                                            Hủy
                                        </p>
                                    </div>

                                )
                            }

                        </div>
                    </div>
                    <div className="w-full flex items-center mb-4 gap-4">
                        <label className="w-1/4 font-medium text-gray-700 text-right" htmlFor="">Số điện thoại</label>
                        <div className="flex-grow flex gap-2 items-center">
                            {
                                cPhone ? (<p className="text-gray-800">{phone}</p>) :
                                    (
                                        <input
                                            type="number"
                                            ref={phoneRef}
                                            placeholder="Hãy nhập số điện thoại muốn thay đổi "
                                            className="flex-grow border rounded-md px-2 py-1 focus:outline-none focus:ring focus:border-blue-400"
                                        />
                                    )
                            }
                            {
                                cPhone ? (<p onClick={() => { setCPhone(!cPhone); }} className="text-blue-500 underline hover:cursor-pointer hover:text-blue-600">
                                    Thay đổi
                                </p>) : (
                                    <div className="flex gap-1">
                                        <p onClick={() => { setPhone(phoneRef.current.value); setCPhone(!cPhone); }} className="text-green-500 underline hover:cursor-pointer hover:text-green-600">
                                            Đổi
                                        </p>
                                        <p onClick={() => { setCPhone(!cPhone); }} className="text-red-500 underline hover:cursor-pointer hover:text-red-600">
                                            Hủy
                                        </p>
                                    </div>

                                )
                            }
                        </div>
                    </div>
                    <div className="w-full flex items-center mb-4 gap-4">
                        <label className="block font-medium text-gray-700 w-1/4 text-right">Giới tính</label>
                        <div className="flex items-center space-x-4">
                            <div className="flex items-center">
                                <input
                                    type="radio"
                                    name="gender"
                                    id="male"
                                    onChange={(e) => (genderRef.current = e.target.value)}
                                    value="male"
                                    className="form-radio text-blue-600 "
                                    checked={user.gender == 'male'}
                                />
                                <label htmlFor="male" className="ml-2 text-gray-800">Nam</label>
                            </div>
                            <div className="flex items-center">
                                <input
                                    type="radio"
                                    name="gender"
                                    onChange={(e) => (genderRef.current = e.target.value)}
                                    id="female"
                                    value="female"
                                    className="form-radio text-blue-600"
                                    checked={user.gender == 'female'}
                                />
                                <label htmlFor="female" className="ml-2 text-gray-800">Nữ</label>
                            </div>
                            <div className="flex items-center">
                                <input
                                    type="radio"
                                    name="gender"
                                    onChange={(e) => (genderRef.current = e.target.value)}
                                    id="orher"
                                    value="orher"
                                    className="form-radio text-blue-600"
                                    checked={user.gender == 'order'}
                                />
                                <label htmlFor="orher" className="ml-2 text-gray-800">Khác</label>
                            </div>
                        </div>
                    </div>
                    <div className="w-full flex items-center gap-4 mb-4">
                        <label className="block font-medium text-gray-700 mb-2 w-1/4 text-right" htmlFor="">Ngày sinh</label>
                        <div>
                            <input type="date" ref={dateRef} name="" id="" defaultValue={user.birthday} />
                        </div>
                    </div>
                    <div className="flex w-full ">
                        <div className="w-1/4 flex justify-end">
                            <button onClick={ChaneInfoCustomer} className="bg-orange-400 px-6 py-2 hover:bg-orange-600 rounded-sm">Lưu</button>
                        </div>

                    </div>
                </div>
                <div className="basis-1/2">
                    <div className="w-[80%]">
                        <div className="text-center mb-5">
                            Đổi mật khẩu
                        </div>
                        {error && <div className="text-red-500 mb-4 text-center">{error}</div>}
                        {success && <div className="text-green-500 mb-4 text-center">{success}</div>}
                        {/* Old Password */}
                        <div className="w-full flex items-center mb-4 gap-4">
                            <label className="w-2/5 font-medium text-gray-700 text-right">Nhập mật khẩu cũ</label>
                            <div className="flex-grow relative">
                                <input
                                    type={showOldPassword ? 'text' : 'password'} // Hiện/ẩn mật khẩu
                                    value={oldPassword} // Gán giá trị cho input
                                    onChange={(e) => setOldPassword(e.target.value)}
                                    className="border rounded-md px-2 py-1 w-full focus:outline-none focus:ring focus:border-blue-400"
                                />
                                <button
                                    onClick={() => setShowOldPassword(!showOldPassword)} // Chuyển đổi trạng thái
                                    className="absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-500"
                                >
                                    {showOldPassword ? <AiOutlineEyeInvisible /> : <AiOutlineEye />} {/* Biểu tượng mắt */}
                                </button>
                            </div>
                        </div>

                        {/* New Password */}
                        <div className="w-full flex items-center mb-4 gap-4">
                            <label className="w-2/5 font-medium text-gray-700 text-right">Nhập mật khẩu mới</label>
                            <div className="flex-grow relative">
                                <input
                                    type={showNewPassword ? 'text' : 'password'}
                                    value={newPassword} // Gán giá trị cho input
                                    onChange={(e) => setNewPassword(e.target.value)}
                                    className="border rounded-md px-2 py-1 w-full focus:outline-none focus:ring focus:border-blue-400"
                                />
                                <button
                                    onClick={() => setShowNewPassword(!showNewPassword)}
                                    className="absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-500"
                                >
                                    {showNewPassword ? <AiOutlineEyeInvisible /> : <AiOutlineEye />} {/* Biểu tượng mắt */}
                                </button>
                            </div>
                        </div>

                        {/* Confirm New Password */}
                        <div className="w-full flex items-center mb-4 gap-4">
                            <label className="w-2/5 font-medium text-gray-700 text-right">Nhập lại mật khẩu mới</label>
                            <div className="flex-grow relative">
                                <input
                                    type={showConfirmPassword ? 'text' : 'password'}
                                    value={confirmPassword} // Gán giá trị cho input
                                    onChange={(e) => setConfirmPassword(e.target.value)}
                                    className="border rounded-md px-2 py-1 w-full focus:outline-none focus:ring focus:border-blue-400"
                                />
                                <button
                                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                                    className="absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-500"
                                >
                                    {showConfirmPassword ? <AiOutlineEyeInvisible /> : <AiOutlineEye />} {/* Biểu tượng mắt */}
                                </button>
                            </div>
                        </div>
                        <div className="flex justify-center mt-5">
                            <button
                                onClick={handleChangePassword} // Xử lý khi nhấn nút
                                className="bg-blue-500 text-white font-semibold py-2 px-4 rounded hover:bg-blue-600 transition duration-300"
                            >
                                Đổi mật khẩu
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}