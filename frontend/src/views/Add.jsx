import { Link, Outlet } from "react-router-dom";

export default function Add() {
    return (
        <div>
            <nav className="flex justify-around">
                <Link to="/add" className="text-decoration-none">Brand</Link>
                <Link to="/add/payment" className="text-decoration-none">Payment</Link>
                <Link to="/add/cpu" className="text-decoration-none">Cpu</Link>
                <Link to="/add/ram" className="text-decoration-none">Ram</Link>
                <Link to="/add/rom" className="text-decoration-none">Rom</Link>
                <Link to="/add/pin" className="text-decoration-none">Pin</Link>
                <Link to="/add/screen" className="text-decoration-none">Screen</Link>
                <Link to="/add/cam" className="text-decoration-none">Camera</Link>
                <Link to="/add/os" className="text-decoration-none">Operating system</Link>
                <Link to="/add/product" className="no-underline">Product</Link>
                <Link to="/add/image" className="no-underline">Image</Link>
                <Link to="/add/permiss" className="no-underline">Permiss</Link>
                <Link to="/add/infopermiss" className="no-underline">InfoPermiss</Link>
            </nav>
            <div>
                <Outlet></Outlet>
            </div>
        </div>
    );
}