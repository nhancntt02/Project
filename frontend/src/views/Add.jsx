import { Link, Outlet } from "react-router-dom";

export default function Add() {

    return (
        <div className="flex justify-center items-center min-h-[90vh]">
            <nav className="grid grid-cols-4 gap-4 p-4">
                <Link to="/add/product" 
                className="ct-nav-link-1"
                >
                    Thêm sản phẩm
                </Link>
                <Link to="/add/cpu" className="ct-nav-link-1">
                    Thêm chíp 
                </Link>
                <Link to="/add/ram" className="ct-nav-link-1">
                    Thêm RAM
                </Link>
                <Link to="/add/rom" className="ct-nav-link-1">
                    Thêm bộ nhớ
                </Link>
                <Link to="/add/pin" className="ct-nav-link-1">
                    Thêm pin
                </Link>
                <Link to="/add/screen" className="ct-nav-link-1">
                    Thêm màn hình
                </Link>
                <Link to="/add/cam" className="ct-nav-link-1">
                    Thêm camera
                </Link>
                <Link to="/add/os" className="ct-nav-link-1">
                    Thêm hệ điều hành
                </Link>
                <Link to="/add/brand" className="ct-nav-link-1">
                    Thêm thương hiệu
                </Link>
                <Link to="/add/image" className="ct-nav-link-1">
                    Thêm ảnh sản phẩm
                </Link>
                <Link to="/addinfo/permiss" className="ct-nav-link-1">
                    Thêm quyền
                </Link>
                <Link to="/addinfo/infopermiss" className="ct-nav-link-1">
                    Thêm nội dung quyền
                </Link>
                <Link to="/addinfo/supplier" className="ct-nav-link-1">
                    Thêm nhà cung cấp
                </Link>
                <Link to="/addinfo/payment" className="ct-nav-link-1">
                    Phương thức thanh toán
                </Link>
            </nav>
        </div>

    );
}