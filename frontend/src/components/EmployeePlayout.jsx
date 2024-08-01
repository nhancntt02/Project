import {Link, Outlet } from "react-router-dom";
export default function EmloyeePlayout() {
    return (
        <div className="container" >
            <nav className="flex justify-around">
            <Link to="/" className="text-decoration-none">Home</Link>
            <Link to="/employee" className="text-decoration-none">Employee</Link>
            <Link to="/employee/permiss" className="text-decoration-none">Permiss</Link>
            <Link to="/employee/infopermiss" className="text-decoration-none">InfoPermiss</Link>
            </nav>
            <div className="border " style={{width: '700px', margin: '0 auto'}}>
                <Outlet/>
            </div>
            
        </div>
    );
}