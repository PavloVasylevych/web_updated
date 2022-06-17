import React, {useState} from 'react';
import {useNavigate} from "react-router-dom";
import Header from "../../Components/Header";
import  '../acc-reg.css'


const CreateReservation = () => {
    const navigation = useNavigate();
    const currentUser = JSON.parse(localStorage.getItem('loggedUser'));
    const [error, setError] = useState('');
    const [data, setData] = useState({
        user_id: '',
        audience_id: '',
        title: '',
        from_date: '',
        to_date: '',
    })

    const handleChange = e => {
        setError(null);
        setData({...data, [e.target.name]: e.target.value});
    };

    const createResButtonHandle = async e => {
        e.preventDefault()

        setError(null)
        const request_body = {
            user_id: data.user_id,
            audience_id: data.audience_id,
            title: data.title,
            from_date: data.from_date,
            to_date: data.to_date
        }

        const headers = new Headers();
        //headers.set('Authorization', 'Basic ' + btoa(currentUser.username + ":" + currentUser.password));
        headers.set('Authorization', `Basic ${btoa('alex123:12345')}`);
        headers.set('content-type', 'application/json');

        fetch('http://localhost:8089/api/v1/reservation', {
            method: "POST",
            body: JSON.stringify(request_body),
            headers,
        }).then((response)=> {
            if (response.status === 200){
                navigation('/reses')
            } 
        }).catch((e) => {
            setError(e.response.data)
        })



    }

    if (!currentUser){
        navigation("/login")
    } else {
        return(
            <div className="main">
                <Header/>
                <form className="form" onSubmit={createResButtonHandle}>
                    <h1>Create your res</h1>
                    <div>
                        <input className="input" placeholder="Input reservation name" name="title" type="text" value={data.title}  onChange={handleChange} required/>
                    </div>
                    <div>
                        <input className="input" placeholder="Input start date" name="from_date" type="datetime-local" value={data.from_date}  onChange={handleChange} required/>
                    </div>
                    <div>
                        <input className="input" placeholder="Input end date" name="to_date" type="datetime-local" value={data.to_date}  onChange={handleChange} required/>
                    </div>
                    <div>
                        <input  className="input" placeholder="Input User's Id" name="user_id" type="number" value={data.user_id} onChange={handleChange} required/>
                    </div>
                    <div>
                        <input  className="input" placeholder="Input audience's number" name="audience_id" type="number" value={data.audience_id} onChange={handleChange} required/>
                    </div>

                    <div>
                        <button data-testid="createResButton" className="createResButton">Create Res</button>
                    </div>
                    <p className="error">{error}</p>
                </form>

            </div>
        )
    }


}

export default CreateReservation;
