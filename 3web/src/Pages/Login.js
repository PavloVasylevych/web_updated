import React, { useState } from "react";
import  "./login.css"
import { Link, useNavigate } from "react-router-dom";
import Header from "../Components/Header";



const Login = () => {

    const loginUser = request_body => {
        return fetch('http://localhost:8089/api/v1/user/login', {
            method: "POST",
            body: JSON.stringify(request_body),
            headers: {'Content-Type': 'application/json'}
        });
    }

    const navigation = useNavigate();
    const [data, setData] = useState({
        username:'',
        password:''
    })
    const [error, setError] = useState("")

    const handleChange = e => {
        setError(null);
        setData({...data, [e.target.name]: e.target.value})
    }

    const signButtonHandle = async e => {
        e.preventDefault();

        let request_body = {
            username: data.username,
            password: data.password
        };

        loginUser(request_body).then(response => {
            if (response.status === 200) {
                window.localStorage.setItem('loggedUser', JSON.stringify(request_body));
                navigation('/account');
            } else {
                response.text().then((data) => {
                    setError(data)
                });
            }
        }).catch(() => {
            console.log(e);
        });

    }

        return (<div className="main">
            <Header/>
            <form className="form" onSubmit={signButtonHandle}>
                <h1>Sign in</h1>
                <div>
                    <label>
                        <input placeholder="Enter username" type="text" className="field" name="username" value={data.username} onChange={handleChange} required/>
                    </label>
                    <label>
                        <input placeholder="Enter password" type="password" className="field" name="password" value={data.password} onChange={handleChange} required/>
                    </label>
                    <div>
                        <button className="sign_button">login</button>
                    </div>
                </div>
                <p className="error"> {error}</p>
            </form>
            <p className="signUp_text">Do not have an account? - <Link className="signUp_button" to={"/register"}>Sign up!</Link></p>
        </div>)
            }

export default Login;