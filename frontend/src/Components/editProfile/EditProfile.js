import React, { useReducer } from 'react';
import { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import axios from 'axios';
import '../../Public/css/registration.css'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Loading from '../loading'
import { useNavigate, useParams} from 'react-router-dom';

import useGetUser from '../../Hooks/useGetUser';

const initialState={
    displayname: '',
    collegename: '',
    cfhandle: '',
    cchandle: '',
}

const reducer=(state, action) => {
    let field=action.type;
    // console.log(state);
    switch (field) {
        case "displayname":
            {
                return {
                    ...state,
                    displayname: action.payload,
                }
            }
        case "collegename":
            {
                return {
                    ...state,
                    collegename: action.payload,

                }
            }
        case 'cfhandle':
            {
                return {
                    ...state,
                    cfhandle: action.payload,

                }
            }
        case 'cchandle':
            {
                // console.log(action.payload);
                return {
                    ...state,
                    cchandle: action.payload,
                }
            }
    }
}

const EditProfile = () => {

    const { id }=useParams();
    const [loading, setLoading]=useState(false);
    const curUser=useGetUser({});
    const [state, dispatch]=useReducer(reducer, initialState);
    const navigate=useNavigate();

    const notify=(message, type) => toast(`${message}`, { type: type });

    useEffect(()=>{
        if(curUser.displayname!=undefined){
            dispatch({ type: 'displayname', payload: curUser.displayname });
            dispatch({ type: 'collegename', payload: curUser.collegename });
            dispatch({ type: 'cfhandle', payload: curUser.cfhandle });
            dispatch({ type: 'cchandle', payload: curUser.cchandle });
            // console.log("Post:  ", post);
        }
    },[curUser])

    const submitHandler=(e) => {
        e.preventDefault();
        setLoading(true);
        console.log(state)
        // console.log(state.images[0]);
        // setLoading(true);
        axios.put(`http://localhost:4000/user/${id}`, state, {
            withCredentials: true
        })
            .then((response) => {
                let { success, error, user }=response.data;
                if (error) {
                    notify(error.message, 'error');
                    console.log(error);
                    setLoading(false);
                    navigate(`/users/${id}/edit`);
                    return;
                }
                if (user!=undefined) {
                    setLoading(false);
                    console.log(user);
                    notify(success,'success')
                    navigate(`/users/${user._id}`);
                }
            })
            .catch((err) => {
                notify(err.message, 'error');
                navigate(`/users/${id}/edit`);
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
        <form id="msform" onSubmit={submitHandler}>
        <fieldset className="page">
            <h2 className="fs-title">Edit your profile</h2>
            <h3 className="fs-subtitle">Enter your credentials</h3>
            <input type="text" name="displayname" placeholder="Display name" value={state.displayname} onChange={(e) => { dispatch({ type: "displayname", payload: e.target.value }) }} />
            <input type="text" name="college" placeholder="College" value={state.collegename} onChange={(e) => { dispatch({ type: "collegename", payload: e.target.value }) }} />
            <input type="text" name="cfhandle" placeholder="Codeforces handle" value={state.cfhandle} onChange={(e) => { dispatch({ type: "cfhandle", payload: e.target.value }) }} />
            <input type="text" name="cchandle" placeholder="Codechef handle" value={state.cchandle} onChange={(e) => { dispatch({ type: "cchandle", payload: e.target.value }) }} />
            <input type="submit" name="submit" className="submit action-button" value="Submit" />
        </fieldset>
        </form>
    </div>
  )
}

export default EditProfile