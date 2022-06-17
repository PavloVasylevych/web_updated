import React, {useEffect, useState} from 'react';
import Header from "../../Components/Header";
import  '../acc-reg.css'
import ResList from "../../Components/ResList";

const ViewAllReservation = () => {
    //const currentUser = JSON.parse(localStorage.getItem('loggedUser'));
    const [resData] = useState([])

    useEffect(() => {
        const headers = new Headers();
        headers.set('Authorization', `Basic ${btoa('alex123:12345')}`);
        headers.set('content-type', 'application/json');

        fetch('http://localhost:8089/api/v1/reservation/all_username/alex123', {
            method: 'GET',
            headers,
        }).then((response) => {
            if (response.status === 200){
                    return response.json()}
        })

        
    }, [])



    return(

        <div className="main">
            <Header/>
            <form className="form">

                <div>
                    <div>
                        {resData && resData.length &&
                            <><h3>All reses for you </h3>
                                <ResList reses={resData[1].close} />
                                <ResList reses={resData[0].open} /></>}
                    </div>
                </div>
            </form>
        </div>
    );


};



export default ViewAllReservation;


