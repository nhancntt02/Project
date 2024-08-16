import { Link, Outlet } from "react-router-dom";

export default function Add2() {
    return (
        <div>
            <nav className="flex justify-around bg-gray-100 p-4">
                <Link to="/addinfo" className="no-underline text-gray-700 hover:text-blue-500">Payment</Link>
                <Link to="/addinfo/permiss" className="no-underline text-gray-700 hover:text-blue-500">Permiss</Link>
                <Link to="/addinfo/infopermiss" className="no-underline text-gray-700 hover:text-blue-500">InfoPermiss</Link>
                <Link to="/addinfo/supplier" className="no-underline text-gray-700 hover:text-blue-500">Supplier</Link>
            </nav>

            <div>
                <Outlet></Outlet>
            </div>
        </div>
    );
}