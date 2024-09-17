import { Link, Outlet } from "react-router-dom";

export default function Add2() {
    return (
        <div>
            <nav className="flex justify-around bg-gray-100 p-4">

            </nav>

            <div>
                <Outlet></Outlet>
            </div>
        </div>
    );
}