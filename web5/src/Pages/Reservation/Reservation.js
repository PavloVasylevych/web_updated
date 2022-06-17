import React, {useEffect, useState} from 'react';
import {Link} from "react-router-dom";
import Header from "../../Components/Header";
import  '../acc-reg.css'



const Reservation = () => {

    const [resData] = useState('')

    useEffect(() => {
        const headers = new Headers();
        //headers.set('Authorization', 'Basic ' + btoa(currentUser.username + ":" + currentUser.password));
        headers.set('Authorization', `Basic ${btoa('alex123:12345')}`);
        headers.set('content-type', 'application/json');

        fetch('http://localhost:8089/api/v1/reservation/1', {
            method: 'GET',
            headers
        })
            .then((response) => {
                if (response.status === 200){
                    return response.json()
                }
            })

    }, [])



    return(
        <div className="maim">
            <Header/>
                <form className="form">
                <h2>Reservation's data</h2>
                <p >Description: {resData.user_id}</p>
                <p >location: {resData.audience_id}</p>
                <p >author's name: {resData.title}</p>
                <p >Category: {resData.from_date}</p>
                <p >Region status: {resData.to_date}</p>
                <Link className="signUp_button" key={resData.id} to={`/edit_res/${resData.id}`}>Edit res</Link>
                </form>
        </div>
    )
}

export default Reservation;