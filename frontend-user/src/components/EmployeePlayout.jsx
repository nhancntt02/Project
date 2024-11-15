import { Link, Outlet, Navigate, useNavigate, useLocation } from "react-router-dom";
import { useStateContext } from "../contexts/ContextProvider";

export default function EmloyeePlayout() {
    const { token } = useStateContext();
    const location = useLocation();

    if (token) {
        return <Navigate to="/" />
    }

    return (
        <div className="container mx-auto h-screen bg-bgheader-300" >
            <div className="py-4 grid grid-cols-2 ">
                <div className="flex justify-center gap-8 items-center">
                    <Link to="/" className="border-r-2 border-gray-500">
                        <img className="w-[160px]" src="https://i.imgur.com/EFWt4EG.png" alt="" />
                    </Link>
                    <div className="text-3xl font-semibold">
                        {
                        location.pathname == '/login' ? ('Đăng nhập') : ('Đăng ký')
                        
                        }
                    </div>
                </div>
                <div></div>
            </div>
            <div className="">
                <Outlet />
            </div>

        </div>
    );
}