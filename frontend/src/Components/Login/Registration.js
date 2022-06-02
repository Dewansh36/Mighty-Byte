import React, { useReducer } from 'react';
import { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import axios from 'axios';
import '../../Public/css/registration.css'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Loading from '../loading'
import { useNavigate } from 'react-router-dom';

const initialState={
    username: '',
    email: '',
    password: '',
    codeforces: '',
    codechef: '',
    firstName: '',
    lastName: '',
    collegeName: '',
    bio: ''
}

const reducer=(state, action) => {
    let field=action.type;
    switch (field) {
        case "username":
            {
                return {
                    ...state,
                    ...state,
                    username: action.payload,
                }
            }
        case "email":
            {
                return {
                    ...state,
                    email: action.payload,

                }
            }
        case 'password':
            {
                return {
                    ...state,
                    password: action.payload,

                }
            }
        case 'codeforces':
            {
                return {
                    ...state,
                    codeforces: action.payload,

                }
            }
        case 'codechef':
            {
                return {
                    ...state,
                    codechef: action.payload,

                }
            }
        case 'bio':
            {
                return {
                    ...state,
                    bio: action.payload,

                }
            }
        case 'firstName':
            {
                return {
                    ...state,
                    firstName: action.payload,

                }
            }
        case 'lastName':
            {
                return {
                    ...state,
                    lastName: action.payload,

                }
            }
        case 'collegeName':
            {
                return {
                    ...state,
                    collegeName: action.payload,

                }
            }
    }
}

const Register=() => {
    const [pos, setPos]=useState(0);
    const [state, dispatch]=useReducer(reducer, initialState);
    const [cpass, setCpass]=useState('');
    const [loading, setLoading]=useState(false);
    const navigate=useNavigate();

    const notify=(message, type) => toast(`${message}`, { type: type });

    const nextBtn=() => {
        console.log('Console!');
        const pages=document.querySelectorAll('.page');
        const bar=document.querySelectorAll('.prog');
        if (pos<pages.length-1) {
            if (pos===0) {
                if (state.username===''||state.email===''||cpass===''||state.password==='') {
                    notify("fill all the required details", "error");
                }
                else {
                    pages[pos].classList.add('hide');
                    pages[pos+1].classList.remove('hide');
                    bar[pos+1].classList.add('active');
                    setPos(pos+1);
                }
            }
            else if (pos===1) {
                if (state.codechef===''||state.codeforces==='') {
                    notify("fill all the required details", "error");
                }
                else {
                    pages[pos].classList.add('hide');
                    pages[pos+1].classList.remove('hide');
                    bar[pos+1].classList.add('active');
                    setPos(pos+1);
                }

            }

        }

    }
    const prevBtn=() => {
        const pages=document.querySelectorAll('.page');
        const bar=document.querySelectorAll('.prog');
        console.log(bar);
        if (pos>0) {
            pages[pos].classList.add('hide');
            pages[pos-1].classList.remove('hide');
            bar[pos].classList.remove('active');
            setPos(pos-1);
        }
    }
    const submitHandler=(e) => {
        e.preventDefault();
        setLoading(true);
        if (state.password!=cpass) {
            notify("Password!=Confirm Password!", "error");
            setLoading(false);
            return;
        }
        // console.log(state);
        axios.post('http://localhost:4000/register', state, { withCredentials: true })
            .then((response) => {
                let { error, success }=response.data;
                if (error!=undefined) {
                    notify(error, "error");
                }
                else {
                    notify(success, "success");
                    navigate('/login');
                }
                setLoading(false);
            })
            .catch((err) => {
                console.log(err);
                setLoading(false);
            })
    }
    if (loading==true) {
        return (
            <Loading />
        )
    }
    return (
        <div>
            <ToastContainer position='top-center' />
            <form action="/register" id="msform" method="post" onSubmit={submitHandler}>
                <ul id="progressbar">
                    <li className="prog active">Account Setup</li>
                    <li className="prog">Social Profiles</li>
                    <li className="prog">Personal Details</li>
                </ul>
                <fieldset className="page">

                    <h2 className="fs-title">Create your account</h2>
                    <h3 className="fs-subtitle">Enter your credentials</h3>
                    <input type="text" name="username" placeholder="Username" value={state.username} onChange={(e) => { dispatch({ type: "username", payload: e.target.value }) }} />
                    <input type="email" name="email" placeholder="Email" value={state.email} onChange={(e) => { dispatch({ type: "email", payload: e.target.value }) }} />
                    <input type="password" name="password" placeholder="Password" value={state.password} onChange={(e) => { dispatch({ type: "password", payload: e.target.value }) }} />
                    <input type="password" name="cpass" placeholder="Confirm Password" value={cpass} onChange={(e) => { setCpass(e.target.value) }} />
                    <input type="button" name="next" className="next action-button" value="Next" onClick={nextBtn} />
                </fieldset>
                <fieldset className="page hide">

                    <h2 className="fs-title">Coding Profiles</h2>
                    <h3 className="fs-subtitle">Your Coding Handles</h3>
                    <input type="text" name="codeforces" placeholder="Codeforces Handle" value={state.codeforces} onChange={(e) => { dispatch({ type: "codeforces", payload: e.target.value }) }} />
                    <input type="text" name="codechef" placeholder="Codechef Handle" value={state.codechef} onChange={(e) => { dispatch({ type: "codechef", payload: e.target.value }) }} />

                    <input type="button" name="previous" className="previous action-button" value="Previous" onClick={prevBtn} />
                    <input type="button" name="next" className="next action-button" value="Next" onClick={nextBtn} />
                </fieldset>

                <fieldset className="page hide">
                    <h2 className="fs-title">Personal Details</h2>
                    <h3 className="fs-subtitle">All About You</h3>
                    <input type="text" name="firstname" placeholder="First Name" value={state.firstName} onChange={(e) => { dispatch({ type: "firstName", payload: e.target.value }) }} />
                    <input type="text" name="lastname" placeholder="Last Name" value={state.lastName} onChange={(e) => { dispatch({ type: "lastName", payload: e.target.value }) }} />
                    <input type="text" name="collegename" placeholder="College Name" value={state.collegeName} onChange={(e) => { dispatch({ type: "collegeName", payload: e.target.value }) }} />
                    <textarea name="description" placeholder="Your bio" value={state.bio} onChange={(e) => { dispatch({ type: "bio", payload: e.target.value }) }}></textarea>
                    <input type="button" name="previous" className="previous action-button" value="Previous" onClick={prevBtn} />
                    <button className="action-button" >submit</button>
                </fieldset>

            </form>
        </div>
    )
}

export default Register