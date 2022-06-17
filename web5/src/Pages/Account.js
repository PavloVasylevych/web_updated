import React, { useState, useEffect } from 'react';
import  './acc.css';
import { Link } from 'react-router-dom';
import Header from "../Components/Header";

const Account = () => {
    const currentUser = JSON.parse(localStorage.getItem('loggedUser'));
    const [user] = useState(currentUser);


    


    useEffect(() => {
        const headers = new Headers();
        //headers.set('Authorization', 'Basic ' + btoa(currentUser.username + ":" + currentUser.password));
        headers.set('Authorization', `Basic ${btoa('alex123:12345')}`);
        headers.set('content-type', 'application/json');


        fetch('http://localhost:8089/api/v1/user/get/alex123', {
            method: 'GET',
            headers,
        }).then((response) => {
            if (response.status === 200) {
                return response.json();
            }
        })


    }, [])

    
        return (
            <div className="main">
                <Header/>
                <form className="form" data-testid="form">
                    <h1>Your profile</h1>
                    <div>
                        <h2>General Info</h2>
                        <p id="username">username: {user.username}</p>
                        <p id="name">name: {user.name}</p>
                        <p id="surname">surname: {user.surname}</p>
                    </div>

                    <Link to={'/edit_account'}><p className="edit_button">Edit account</p></Link>
                </form>
            </div>)

    }


export default Account


