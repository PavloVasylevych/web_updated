import React, { useState, useEffect } from 'react';
import  './acc.css';
import { Link, useNavigate } from 'react-router-dom';
import Header from "../Components/Header";

const Account = () => {
    const navigation = useNavigate();
    const [user, setUser] = useState(JSON.parse(localStorage.getItem('loggedUser')));

    const currentUser = JSON.parse(localStorage.getItem('loggedUser'));




    useEffect(() => {
        const headers = new Headers();
        headers.set('Authorization', 'Basic ' + btoa(currentUser.username + ":" + currentUser.password));
        headers.set('content-type', 'application/json');


        fetch('http://localhost:8089/api/v1/user/get/' + currentUser.username, {
            method: 'GET',
            headers,
        }).then((response) => {
            if (response.status === 200) {
                return response.json();
            }
        }).then((data) => {
            setUser(data.user)
        })

    }, [])

    if (!currentUser) {
        navigation('/login')}
    else {
        return (
            <div className="main">
                <Header/>
                <form className="form">
                    <h1>Your profile</h1>
                    <div>
                        <h2>General Info</h2>
                        <p id="username">username: {user.username}</p>
                        <p id="name">first name: {user.name}</p>
                        <p id="surname">last name: {user.surname}</p>
                    </div>

                    <Link to={'/edit_account'}><p className="edit_button">Edit account</p></Link>
                </form>
            </div>)

    }
}

export default Account


