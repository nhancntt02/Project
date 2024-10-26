import { useEffect, useRef, useState } from "react";
import { useStateContext } from "../contexts/ContextProvider";
import axiosClient from "../axios-client";
import ChangePassword from "../components/ChangePassword";
import { FaTimes } from "react-icons/fa";
import { Formik, Form } from 'formik';
import Chat from "../components/Chat";
export default function Infomation() {
    const { user, setUser } = useStateContext();

    const [cEmail, setCEmail] = useState(true);
    const [cPhone, setCPhone] = useState(true);
    const dateRef = useRef();
    const genderRef = useRef();
    const emailRef = useRef();
    const phoneRef = useRef();
    const nameRef = useRef();
    const [email, setEmail] = useState(null);
    const [phone, setPhone] = useState(null);
    const [isVisible, setisVisible] = useState(false);

    const employee_id = sessionStorage.getItem('employeeId');

    const [img, setImg] = useState();

    useEffect(() => {
        getUser();
        getFile();
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

    const getFile = async () => {

        const response = await axiosClient.get(`/file/user/${employee_id}`);
        if (response.data.file_name) {
            try {
                const image = await axiosClient.get(`/file/${response.data.file_name}`, {
                    responseType: 'blob',
                });
                setImg(URL.createObjectURL(image.data));
            } catch (error) {
                console.log(error);
            }
        } else {
            try {
                const file_name = 'macdinh.jpg'
                const image = await axiosClient.get(`/file/${file_name}`, {
                    responseType: 'blob',
                });
                setImg(URL.createObjectURL(image.data));
            } catch (error) {
                console.log(error);
            }
        }
    }

    const uploadFile = async (value) => {
        const f = value.file;
        const fd = new FormData();
        fd.append('file', f);

        const config = {
            headers: {
                "content-type": "multipart/form-data",
            },
        };
        try {
            const res = axiosClient.post(`/file/${employee_id}`, fd, config);
            getFile();
        } catch (error) {
            console.log(error);
        }
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

    return (
        <div className="container h-screen">
            <div className="h-[16%] border flex justify-center items-center bg-bgheader-200">
                <div className="text-bgheader-300 text-center text-4xl my-4 font-semibold">Thông tin cá nhân</div>
            </div>
            {/* <div className="flex justify-end px-4">
                <div className=" my-2">
                    <button
                        onClick={() => { setisVisible(true); console.log(img) }} // Xử lý khi nhấn nút
                        className="bg-blue-500 text-white font-semibold py-2 px-4 rounded hover:bg-blue-600 transition duration-300"
                    >
                        Đổi mật khẩu
                    </button>
                </div>
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
                <div className="basis-1/2 flex flex-col items-center gap-4">
                    <div className="">
                        {
                            img && <img src={img} className="w-[10rem] h-[10rem] rounded-full border object-cover" alt="uploaded image" />
                        }
                    </div>
                    <div>
                        <Formik
                            initialValues={{
                                file: null,
                            }}
                            onSubmit={uploadFile}
                        >
                            {({ setFieldValue, values }) => (
                                <Form>
                                    <input
                                        type="file"
                                        name="file"
                                        onChange={(event) => {
                                            setFieldValue('file', event.currentTarget.files[0]);
                                        }}
                                    />
                                    <button className="text-blue-500 hover:cursor-pointer hover:text-blue-700 hover:underline" type="submit">Lưu</button>
                                </Form>
                            )}
                        </Formik>
                    </div>
                </div>
            </div>
            <div>
                {
                    isVisible && (
                        <div className="fixed inset-0 top-0 left-0 w-full h-full bg-gray-900 bg-opacity-50 z-10">

                            <div className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-white p-4 rounded shadow-md">
                                <div className="flex justify-end">
                                    <button onClick={() => { setisVisible(false); }}>
                                        <FaTimes />
                                    </button>
                                </div>

                                <ChangePassword />
                            </div>
                        </div>
                    )
                }
            </div> */}
            <div>
                <Chat />
            </div>
        </div>
    )
}