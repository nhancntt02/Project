import { Link, Outlet, Navigate } from "react-router-dom";
import { useStateContext } from "../contexts/ContextProvider";
import { useEffect } from "react";
import axiosClient from "../axios-client";
export default function DefaultLayout() {
    const { user, token, setUser, setToken } = useStateContext()
    if (!token) {
        return (
            <Navigate to="/login" />
        )
    }

    const onLogout = (ev) => {
        ev.preventDefault()
        axiosClient.post('/logout')
            .then(() => {
                setUser({})
                setToken(null)
            })
            .catch(error => {
                console.error('Logout error:', error);
                // Handle error if necessary
            });
    }
    
    useEffect(() => {
        axiosClient.get('/user')
        .then(({data}) => {
            setUser(data);
        })
    }, [])

    return (
        <div className="container" >
            <nav className="flex justify-around">
                <Link to="/" className="text-decoration-none">Home</Link>
                <Link to="/add" className="text-decoration-none">AddProduct</Link>

            </nav>
            <div>
                {user.name} <a href="#" onClick={onLogout} className="btn-logout">Logout</a>
            </div>
            <div className="border " style={{ width: '80%', margin: '0 auto' }}>
                <Outlet />
            </div>

        </div>
    );
}