import { Link, Outlet } from "react-router-dom";

export default function Add() {
    return (
        <div>
            <nav className="flex justify-around bg-gray-100 p-4">
                <Link to="/add" className="no-underline text-gray-700 hover:text-blue-500">Brand</Link>
                <Link to="/add/cpu" className="no-underline text-gray-700 hover:text-blue-500">Cpu</Link>
                <Link to="/add/ram" className="no-underline text-gray-700 hover:text-blue-500">Ram</Link>
                <Link to="/add/rom" className="no-underline text-gray-700 hover:text-blue-500">Rom</Link>
                <Link to="/add/pin" className="no-underline text-gray-700 hover:text-blue-500">Pin</Link>
                <Link to="/add/screen" className="no-underline text-gray-700 hover:text-blue-500">Screen</Link>
                <Link to="/add/cam" className="no-underline text-gray-700 hover:text-blue-500">Camera</Link>
                <Link to="/add/os" className="no-underline text-gray-700 hover:text-blue-500">Operating system</Link>
                <Link to="/add/product" className="no-underline text-gray-700 hover:text-blue-500">Product</Link>
                <Link to="/add/image" className="no-underline text-gray-700 hover:text-blue-500">Image</Link>
            </nav>

            <div>
                <Outlet></Outlet>
            </div>
        </div>
    );
}