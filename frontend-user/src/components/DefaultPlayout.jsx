import { Link, Outlet, Navigate, useNavigate } from "react-router-dom";
import { useStateContext } from "../contexts/ContextProvider";
import { useEffect, useState } from "react";
import axiosClient from "../axios-client";
import { FaBell, FaInstagram, FaReceipt, FaTwitter } from "react-icons/fa";
import { FaShoppingCart, FaFacebook, FaYoutube } from "react-icons/fa";
import { FaUserCircle } from "react-icons/fa";
export default function DefaultLayout() {
    const { user, token, cart, notify, setNotify, setUser, setToken, setCart } = useStateContext();
    const [img, setImg] = useState();
    const navigate = useNavigate();

    const onLogout = (ev) => {
        ev.preventDefault()
        axiosClient.post('/logout')
            .then(() => {
                setUser({})
                setToken(null)
                localStorage.removeItem('userId');
            })
            .catch(error => {
                console.error('Logout error:', error);
                // Handle error if necessary
            });
    }



    useEffect(() => {

        axiosClient.get('/user')
            .then(({ data }) => {
                setUser(data);
            })
            .catch(error => {
                localStorage.setItem('userId', 0)
            })
        setNotify();
        setCart();
    }, [])

    useEffect(() => {
        const userId = localStorage.getItem('userId');
        if (userId && userId > 0) {
            getFile(userId);
        }
    }, [])

    const getFile = async (userId) => {
        const response = await axiosClient.get(`/file/user/${userId}`);
        try {
            const image = await axiosClient.get(`/file/${response.data.file_name}`, {
                responseType: 'blob',
            });

            setImg(URL.createObjectURL(image.data));
        } catch (error) {
            console.log(error);
        }
    }


    const goCustomer = () => {
        navigate('/customer');
    }

    const goNotify = () => {
        navigate('/notify');
    }

    const goCart = () => {
        navigate('/cart');
    }
    const goOrder = () => {
        navigate('/order');
    }

    return (
        <div className="w-full" >
            <div className="flex justify-between pr-10 pl-20 mb-5 bg-bgheader-300">
                <div className=" mx-2 text-center my-2">
                    <Link to="/" className="">
                        <img className="w-[150px]" src="https://i.imgur.com/EFWt4EG.png" alt="" />
                    </Link>
                </div>
                {
                    token ? (
                        <div className="flex items-center space-x-4 ">
                            <div className="relative inline-block">
                                <FaBell onClick={goNotify} className="hover:cursor-pointer text-xl" />
                                <div className="absolute top-0 right-0 bg-red-600 text-white text-xs font-bold rounded-full h-4 w-4 flex items-center justify-center transform translate-x-1/2 -translate-y-1/2">
                                    {notify}
                                </div>
                            </div>
                            <div>
                                <FaReceipt onClick={goOrder} className="hover:cursor-pointer text-xl" />
                            </div>
                            <div className="relative inline-block">
                                <FaShoppingCart onClick={goCart} className="hover:cursor-pointer text-2xl" />
                                <div className="absolute top-0 right-0 bg-red-600 text-white text-xs font-bold rounded-full h-4 w-4 flex items-center justify-center transform translate-x-1/2 -translate-y-1/2">
                                    {cart}
                                </div>
                            </div>
                            <div className="group relative">
                                <div onClick={goCustomer} className="flex gap-2 hover:cursor-pointer">
                                    {img ?
                                        <img src={img} className="w-6 h-6 rounded-full border object-cover" alt="uploaded image" />
                                        :
                                        <FaUserCircle
                                            className="w-6 h-6 rounded-full border object-cover"
                                        />
                                    }
                                    <p

                                        className="text-lg font-medium text-gray-700 "
                                    >
                                        {user.name}
                                    </p>
                                </div>
                                <div
                                    className="btn-logout text-red-600 hover:text-red-800 opacity-0 group-hover:opacity-100 transition-opacity duration-300 absolute"
                                >
                                    <a
                                        href="#"
                                        onClick={onLogout}

                                    >
                                        Logout
                                    </a>
                                </div>

                            </div>

                        </div>
                    ) : (
                        <div className="flex space-x-4 mx-2 mt-5">
                            <div className="relative inline-block">
                                <FaShoppingCart onClick={goCart} className="hover:cursor-pointer text-2xl" />
                                <div className="absolute top-0 right-0 bg-red-600 text-white text-xs font-bold rounded-full h-4 w-4 flex items-center justify-center transform translate-x-1/2 -translate-y-1/2">
                                    {cart}
                                </div>
                            </div>
                            <Link to="/login" className="text-blue-500 hover:underline">
                                Đăng nhập
                            </Link>
                            <Link to="/signup" className="text-blue-500 hover:underline">
                                Đăng ký
                            </Link>
                        </div>
                    )
                }



            </div>
            <div className="w-full ">
                <div className="w-[85%] mx-auto " >
                    <Outlet />
                </div>
            </div>
            <footer className="bg-gray-900 text-gray-300 py-10">
                <div className="container">
                    <div className="w-[80%] mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8">

                        <div>
                            <h4 className="text-white text-lg font-semibold mb-4">Về Chúng Tôi</h4>
                            <p className="text-sm">
                                Chúng tôi là cửa hàng bán lẻ điện thoại di động hàng đầu, cung cấp các sản phẩm chất lượng và dịch vụ chăm sóc khách hàng tuyệt vời.
                            </p>
                        </div>
                        <div>
                            <h4 className="text-white text-lg font-semibold mb-4">Dịch Vụ Khách Hàng</h4>
                            <ul>
                                <li><a href="#" className="hover:text-white text-sm">Trung tâm trợ giúp</a></li>
                                <li><a href="#" className="hover:text-white text-sm">Chính sách đổi trả</a></li>
                                <li><a href="#" className="hover:text-white text-sm">Chính sách vận chuyển</a></li>
                                <li><a href="#" className="hover:text-white text-sm">Chính sách bảo hành</a></li>
                            </ul>
                        </div>
                        <div>
                            <h4 className="text-white text-lg font-semibold mb-4">Liên Hệ</h4>
                            <p className="text-sm">Địa chỉ: Đường 3/2 An Khánh, Quận Ninh Kiều, TP.Cần Thơ</p>
                            <p className="text-sm">Số điện thoại: 0123 456 789</p>
                            <p className="text-sm">Email: nhanb2014679@student.ctu.edu.vn</p>
                        </div>
                        <div>
                            <h4 className="text-white text-lg font-semibold mb-4">Kết Nối Với Chúng Tôi</h4>
                            <div className="flex space-x-4">
                                <a href="#" className="hover:text-white text-xl"><FaFacebook /></a>
                                <a href="#" className="hover:text-white text-xl"><FaInstagram /></a>
                                <a href="#" className="hover:text-white text-xl"><FaTwitter /></a>
                                <a href="#" className="hover:text-white text-xl"><FaYoutube /></a>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="border-t border-gray-700 mt-8 pt-4 text-center">
                    <p className="text-sm">&copy; 2024 Cửa hàng bán điện thoại One636. Bản quyền thuộc về chúng tôi.</p>
                </div>
            </footer>


        </div>
    );
}