import { useEffect, useRef, useState } from "react";
import { useStateContext } from "../contexts/ContextProvider";
import axiosClient from "../axios-client";
import { FaUserCircle } from "react-icons/fa";
import { Formik, Form} from 'formik';

export default function Customer() {
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

    const userId = localStorage.getItem('userId');

    const [img, setImg] = useState();

    useEffect(() => {
        getUser();
        getFile();
    }, []);


    const getUser = () => {
        axiosClient.get('/user')
            .then(({ data }) => {
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
        }
    }, [user])

    const maskEmail = (email) => {
        if (email && typeof email === 'string') {
            const [name, domain] = email.split("@");
            const maskedName = name.slice(0, 2) + "*".repeat(name.length - 2);
            return `${maskedName}@${domain}`;
        }

    }

    const maskPhone = (phone) => {
        if (phone && typeof phone === 'string') {
            const lastFourDigits = phone.slice(-4);
            const maskedSection = "*".repeat(phone.length - 4);
            return `${maskedSection}${lastFourDigits}`;
        }

    }


    const changePhone = () => {

    }

    const changeEmail = () => {

    }

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


    const getFile = async () => {
        const response = await axiosClient.get(`/file/user/${userId}`);
        try{
            const image = await axiosClient.get(`/file/${response.data.file_name}`,{
                responseType: 'blob',
            });
            
            setImg(URL.createObjectURL(image.data));
        }catch(error){
            console.log(error);
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
        try{
            const res = axiosClient.post(`/file/${user.id}`,fd,config);
            getFile();
        }catch(error){
            console.log(error);
        }
    }

    return (
        <div className="min-h-[80vh] flex justify-center  mb-4">
            <div className="flex flex-col border p-6 w-[90%] bg-bgheader-300">
                <div className="w-full">
                    <div className="text-2xl font-semibold ">Hồ sơ của tôi</div>
                    <div>Quản lý thông tin hồ sơ để bảo mật tài khoản</div>
                </div>
                <div className="mt-2 flex border-t pt-5">
                    <div className="basis-2/3 border-r pr-4">
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
                                    cEmail ? (<p className="text-gray-800">{maskEmail(email)}</p>)
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
                                    cPhone ? (<p className="text-gray-800">{maskPhone(phone)}</p>) :
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
                                        className="form-radio text-blue-600"
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
                                    />
                                    <label htmlFor="female" className="ml-2 text-gray-800">Nữ</label>
                                </div>
                                <div className="flex items-center">
                                    <input
                                        type="radio"
                                        name="gender"
                                        onChange={(e) => (genderRef.current = e.target.value)}
                                        id="other"
                                        value="other"
                                        className="form-radio text-blue-600"
                                    />
                                    <label htmlFor="other" className="ml-2 text-gray-800">Khác</label>
                                </div>
                            </div>
                        </div>
                        <div className="w-full flex items-center gap-4 mb-4">
                            <label className="block font-medium text-gray-700 mb-2 w-1/4 text-right" htmlFor="">Ngày sinh</label>
                            <div>
                                <input type="date" ref={dateRef} name="" id="" />
                            </div>
                        </div>
                        <div className="flex w-full ">
                            <div className="w-1/4 flex justify-end">
                                <button onClick={ChaneInfoCustomer} className="bg-orange-400 px-6 py-2 hover:bg-orange-600 rounded-sm">Lưu</button>
                            </div>

                        </div>
                    </div>
                    <div className="basis-1/3 pl-4 flex flex-col items-center justify-center">
                        {img ?
                            <img src={img} className="w-[10rem] h-[10rem] rounded-full border object-cover" alt="uploaded image" />
                            :
                            <FaUserCircle
                                className="w-28 h-28 rounded-full border object-cover"
                            />
                        }

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

            </div>
        </div>
    );
}