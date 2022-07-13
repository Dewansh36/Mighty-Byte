// require('dotenv').config();
import React from 'react';
import { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import axios from 'axios';
import '../../Public/css/registration.css'
import Loading from '../loading'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Gbtn from '../GodBtn';
// import { Form, Button, FormGroup, FormControl, ControlLabel } from "react-bootstrap";

const Login=({ route }) => {
    const navigate=useNavigate();
    const location=useLocation();
    const [code, setcode]=useState('');
    let { user, token, password }=location.state;
    const [loading, setLoading]=useState(false);
    console.log(location);

    const notify=(message, type) => toast(`${message}`, { type: type });

    const check=(e) => {
        e.preventDefault();
        if (code!=token) {
            notify('Verifycation code is incorrect', 'error');
            return;
        }
        // console.log(`${process.env.backend_url}`);
        setLoading(true);
        axios.post(`/api/verify`, { user: user, password: password },
            { withCredentials: true }).then((response) => {
                let { success, error, user }=response.data;
                if (error!=undefined) {
                    notify(error, "error");
                    navigate('/register');
                }
                else {
                    navigate('/login');
                }
                setLoading(false);

            })
            .catch((err) => {
                console.log(err);
                notify(err.message);
                navigate('/register');
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
                    <h2 className="fs-title">Verify</h2>
                    <h3 className="fs-subtitle">Enter the Verification Code</h3>
                    <input type="text" name="code" placeholder="code" value={code} onChange={(e) => { setcode(e.target.value) }}></input>
                    <Gbtn text="Submit" />
                </fieldset>
            </form>
            <ToastContainer position='top-center' />
        </div>
    )
}

export default Login