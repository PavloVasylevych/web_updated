import React, { useState } from 'react';
import  './acc-reg.css'
import { Link, useNavigate } from 'react-router-dom';
import Header from "../Components/Header";


const AccountRegister = () => {


    const createUser = request_body => {
        return fetch('http://localhost:8089/api/v1/user/create', {
            method: "POST",
            body: JSON.stringify(request_body),
            headers: {'Content-Type': 'application/json'}
        });
    }

    const navigation = useNavigate();
    const [error, setError] = useState(null)

    const [data, setData] = useState({
        username: '',
        name: '',
        surname: '',
        password: '',
        repeat_password: ''
    })

    const handleChange = e => {
        setError(null);
        setData({...data, [e.target.name]: e.target.value});
    };

    const signUpButtonHandler = async e => {
        e.preventDefault();

        if (data.password !== data.repeat_password) {
            setError("Passwords aren't matching. Try again.");
            return
        }

        setError(null)
        const request_body = {
            username: data.username,
            name: data.name,
            surname: data.surname,
            password: data.password
        }


        createUser(request_body).then((response) =>
        {
            if (response.status === 200){
            window.localStorage.setItem('loggedUser', JSON.stringify(request_body));
            navigation('/account')
        }else {
                response.text().then(data => {setError(data)})
            }
        }).catch(e =>{console.log(e)})
    }

    return(
        <div className="main">
            <Header/>
            <form className="form" onSubmit={signUpButtonHandler}>

                <h1>Registration</h1>
                <div>
                    <label>
                        <input placeholder="Enter username" name="username" type="text" className="field" value={data.username} onChange={handleChange} required/>
                    </label>
                </div>
                <div>
                    <label>
                        <input placeholder="Enter name" name="name" type="text" className="field" value={data.name} onChange={handleChange} required/>
                    </label>
                </div>
                <div>
                    <label>
                        <input placeholder="Enter surname" name="surname" type="text" className="field" value={data.surname} onChange={handleChange} required/>
                    </label>
                </div>
                <div>
                    <label>
                        <input placeholder="Enter password" name="password" type="password" className="field" value={data.password} onChange={handleChange} required/>
                    </label>
                </div>
                <div>
                    <label>
                        <input placeholder="Repeat password" name="repeat_password" value={data.repeat_password} onChange={handleChange} type="password" className="field"
                               required/>
                    </label>
                </div>

                <div>
                    <button className="signUpButton">Create account</button>
                </div>

                <p className="error">{error}</p>
            </form>
            <p className="text">Already have an account? - <Link to="/login">Sign in!</Link></p>
        </div>
    )



}


export default AccountRegister;