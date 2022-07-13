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
import ParticleBackground from "../Select/Particlebackground";
import GodBtn from '../GodBtn';

const Login=() => {
    const navigate=useNavigate();
    const [password, setPassword]=useState('');
    const [username, setUsername]=useState('');
    const [loading, setLoading]=useState(false);

    console.log(process.env.REACT_APP_Backend_url);

    const notify=(message, type) => toast(`${message}`, { type: type });

    const verify=(e) => {
        setPassword(e.target.value);
    }

    const check=(e) => {
        e.preventDefault();
        if (password.length<4) {
            console.log("error");
            return;
        }
        // console.log(`${process.env.backend_url}`);
        setLoading(true);
        axios.post(`/api/login`, {
            username: username,
            password: password
        }, { withCredentials: true }).then((response) => {
            console.log(response);
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
        <>
            <ParticleBackground />
            <div className='d-flex justify-content-center mt-5'>
                <form id="msform" action="#" onSubmit={check} method='post'>
                    <fieldset>
                        <h2 className="fs-title">Login</h2>
                        <h3 className="fs-subtitle">Login to your account</h3>
                        <input type="text" name="username" placeholder="Username" value={username} onChange={(e) => { setUsername(e.target.value) }}></input>
                        <input type="password" name="password" value={password} placeholder="Password" onChange={verify} />
                        <GodBtn text="Submit" pd="4rem" className="action-button">
                            Submit
                        </GodBtn>
                        <h3 className="fs-subtitle">Don't have an account?
                            <a href="/register">click here</a>
                        </h3>
                    </fieldset>
                </form>
                <ToastContainer position='top-center' />
            </div>
        </>

    )
}

export default Login