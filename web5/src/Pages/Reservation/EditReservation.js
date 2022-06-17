import React, {useState} from 'react';
import {useNavigate, useParams} from "react-router-dom";
import Header from "../../Components/Header";
import  '../acc-reg.css'



const EditReservation = () => {
    const navigation = useNavigate();
    const currentUser = JSON.parse(localStorage.getItem('loggedUser'));
    const {id} = useParams();

    const headers = new Headers();
    headers.set('Authorization', 'Basic ' + btoa(currentUser.username + ":" + currentUser.password));
    headers.set('content-type', 'application/json');

    const editRes = request_body => {
        return fetch('http://localhost:8089/api/v1/reservation/' + id, {
            method: "PUT",
            body: JSON.stringify(request_body),
            headers,
        })
    }

    const [error, setError] = useState('');

    const [data, setData] = useState({
        user_id: '',
        audience_id: '',
        title: '',
        from_date: '',
        to_date: '',
    })


    const deleteButtonHandler = async e => {
        e.preventDefault()

        fetch(`http://localhost:8089/api/v1/reservation/` + id, {
            method: 'DELETE',
            headers,
        }).then((response)=> {
            if (response.status === 200) {
                navigation("/reses")
            }
            else if (response.status === 403){
            setError("You have no access to any actions of this res")

            }
            else
            {
                response.text().then((data) => {
                    setError(data)
                })
            }
        }).catch(() => {
            console.log(e)
        })
    }


    const editButtonHandler = async e => {
        e.preventDefault()


        setError(null);
        const request_body = {
            user_id: data.user_id,
            audience_id: data.audience_id,
            title: data.title,
            from_date: data.from_date,
            to_date: data.to_date
        }

        editRes(request_body).then((response) => {
            if (response.status === 200) {
                navigation('/reses/:id')
            } else if (response.status === 403){
                setError("You have no access to any actions of this res")
            }
            else
            {
                response.text().then((data) => {
                    setError(data)
                });
            }
        }).catch((e) => {
            console.log(e)
        })
    }
    const handleChange = e => {
        setError(null);
        setData({...data, [e.target.name]: e.target.value});
    };



    return(
        <div className="main">
            <Header/>
            <form className="form" >
                <h1>Editing</h1>
                <div>
                        <input className="input" placeholder="Input User's Id" name="user_id" type="number" value={data.user_id} onChange={handleChange} required/>
                </div>
                <div>
                        <input className="input" placeholder="Input audience's number" name="audience_id" type="number" value={data.audience_id}  onChange={handleChange} required/>
                </div>
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
                    <button className="createResButton" data-testid="edit_button" onClick={editButtonHandler}>Edit Ad</button>
                    <button className="delete_button" data-testid="delete_button" onClick={deleteButtonHandler}>Delete Ad</button>
                </div>
                <p className="error">{error}</p>
            </form>

        </div>
    )
}





export default EditReservation;