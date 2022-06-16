import React from 'react';
import './Header.css'
import { Link, useNavigate } from 'react-router-dom';


const Header =() => {
    const currentUser = JSON.parse(localStorage.getItem('loggedUser'));

    const navigation = useNavigate();
    const handleLogOut = e => {
        e.preventDefault();
        localStorage.removeItem('loggedUser');
        navigation('/login')
    };


    const acc_check = e => {
        if (!currentUser){
            e.preventDefault()
            navigation('/login')
    }}

    return (
        <div className="navbar">
            <Link onClick={acc_check} className="link_acc" to="/account">Account</Link>
            <Link to="/login" className="link_button">Login</Link>
            <Link onClick={handleLogOut} to="/login" className="link_button">Logout</Link>
            <Link to="/register" className="link_button">Sign up</Link>
        </div>

    )
}

export default Header;