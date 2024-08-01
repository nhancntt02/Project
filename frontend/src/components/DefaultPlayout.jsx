import {Link, Outlet } from "react-router-dom";
export default function DefaultLayout() {
    return (
        <div className="container" >
            <nav className="flex justify-around">
                <Link to="/" className="text-decoration-none">Home</Link>
                <Link to="/employee" className="text-decoration-none">Emloyee</Link>
                <Link to="/add/brand" className="text-decoration-none">Brand</Link>
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
            </nav>
            <div className="border " style={{width: '700px', margin: '0 auto'}}>
                <Outlet/>
            </div>
            
        </div>
    );
}