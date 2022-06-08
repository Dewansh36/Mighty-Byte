import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.min.js'
import logo from '../../Public/image/Picture1.png'
import '../../Public/css/navbar.css'
import axios from 'axios';
import { useNavigate } from 'react-router-dom';


const Navbar=(props) => {
    const navigate=useNavigate();
    const { user }=props;
    const profileLink="/users/"+user._id;
    console.log(profileLink);
    const logoutHandler=() => {
        axios.get('http://localhost:4000/logout', { withCredentials: true })
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
                            <img src={logo} className="Navbartoplogo" />
                        </div>
                    </a>
                    <a className="navbar-brand fw-bold text-black" id="Navbartlogo" href="#">BitDev</a>
                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse" id="navbarSupportedContent">
                        <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                            <li className="nav-item">
                                <a className="nav-link" aria-current="page" href="/posts">Project</a>
                            </li>
                            <li className="nav-item">
                                <a className="nav-link" href="/cp">Competitive Programming</a>
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
                            <a className="nav-link">
                                <li className="nav-item">
                                    <button className='btn' onClick={logoutHandler}>
                                        Logout <i class="fa-solid fa-door-open fa-xl"></i>
                                    </button>
                                </li>
                            </a>
                        </ul>
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