import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.min.js'
import logo from '../../Public/image/Picture1.png'
import '../../Public/css/navbar.css'
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import GodBtn from '../GodBtn';


const Navbar=(props) => {
    const navigate=useNavigate();
    const { user }=props;
    const profileLink="/users/"+user._id;
    // console.log(profileLink);
    const logoutHandler=() => {
        console.log("clicked")
        axios.get(`/api/logout`, { withCredentials: true })
            .then((response) => {
                let { error }=response.data;
                if (error==undefined) {
                    navigate('/');
                }
            })
            .catch((err) => {
                console.log(err);
            })
    }
    return (
        <>
            <nav className="navbar navbar-expand-lg navbar-light bg-white text-black Navbarboxshadow">
                <div className="container-fluid">
                    <a href='/selectPage'>
                        <div>
                            <img src={"https://res.cloudinary.com/dewansh/image/upload/v1655988645/BitDev/d1-removebg-preview_qnsbll.png"} className="Navbartoplogo" />
                        </div>
                    </a>
                    <a className="navbar-brand fw-bold text-black" id="Navbartlogo" href="#">BitDev</a>
                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse" id="navbarSupportedContent">
                        <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                            <li className="nav-item">
                                <a className="topic-btn mx-3" aria-current="page" href="/posts">
                                    <i class="fa-brands fa-dev"></i>
                                    <span className='enlarge ms-3'>Project</span>
                                </a>
                            </li>
                            <li className="nav-item">
                                <a className="topic-btn mx-3" href="/cp"><span class="iconify" data-icon="simple-icons:codeforces"></span>
                                    <span className='enlarge ms-3'>CP</span>
                                </a>
                            </li>
                            <li className="nav-item">
                                <a className="topic-btn mx-3" href="/news"><i class="fa-solid fa-newspaper"></i><span className='enlarge ms-3'>Dev Flash</span></a>
                            </li>
                        </ul>
                        <form action="/search" className="ms-auto nav-search-bar">
                            <select className="form-control type-select" name='type' required>
                                <option value="posts">Posts</option>
                                <option value="users">Users</option>
                            </select>
                            <input type="search" name="search" pattern=".*\S.*" required />
                            <button className="nav-search-btn" type="submit">
                                <span>Search</span>
                            </button>
                        </form>
                        <ul className="aboutus navbar-nav ms-md-3">
                            <a className='nav-link' href={"/users/"+user._id}>
                                <li className='nav-item'>
                                    <img src={user.avatar} className='avatarimage' />
                                </li>
                            </a>
                        </ul>
                        <a className="nav-link">
                            <button className='btn' onClick={logoutHandler}>
                                <i class="fa-solid fa-arrow-right-from-bracket fa-2xl"></i>
                            </button>
                        </a>
                        {/* <form className="d-flex" action={profileLink}>
                            <button type="submit" className="btn btn-success text-black rounded-circle mx-1">AA
                            </button>
                        </form> */}
                    </div>
                </div>
            </nav>
        </>
    )
}


export default Navbar