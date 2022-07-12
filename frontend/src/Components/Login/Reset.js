// require('dotenv').config();
import React from 'react';
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import axios from 'axios';
import '../../Public/css/registration.css'
import Loading from '../loading'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Gbtn from '../Button';
// import { Form, Button, FormGroup, FormControl, ControlLabel } from "react-bootstrap";

const Login=() => {
    const navigate=useNavigate();
    const [password, setpassword]=useState('');
    const [cpass, setcpass]=useState('');
    const [loading, setLoading]=useState(false);

    const notify=(message, type) => toast(`${message}`, { type: type });

    const check=(e) => {
        e.preventDefault();
        // console.log(`${process.env.backend_url}`);
        setLoading(true);
        axios.post(`/api/login`, {
            username: username,
            password: password
        }, { withCredentials: true }).then((response) => {
            let { success, error, user }=response.data;
            if (error!=undefined) {
                notify(error, "error");
            }
            else {
                navigate('/selectPage');
            }
            setLoading(false);

        })
            .catch((err) => {
                console.log(err);
                notify(err.message);
                setLoading(false);
            })
    }
    if (loading==true) {
        return (
            <Loading />
        )
    }
    return (

        <div className='d-flex justify-content-center mt-5'>
            <form id="msform" action="#" onSubmit={check} method='post'>
                <fieldset>
                    <h2 className="fs-title">Reset Password</h2>
                    <h3 className="fs-subtitle">Create new Password</h3>
                    <input type="password" name="username" placeholder="Password" value={password} onChange={(e) => { setpassword(e.target.value) }}></input>
                    <input type="text" name="username" placeholder="Confirm Password" value={cpass} onChange={(e) => { setcpass(e.target.value) }}></input>
                    <Gbtn text="Submit" />
                </fieldset>
            </form>
            <ToastContainer position='top-center' />
        </div>
    )
}

export default Login