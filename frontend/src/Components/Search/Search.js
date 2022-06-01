import React, { useEffect } from 'react'
import '../Search/Search.css'
import Loading from '../loading';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useNavigate, useParams, useLocation } from 'react-router-dom';
import useGetUser from '../../Hooks/useGetUser';
import { useState } from "react";
import axios from "axios";
import Navbar from '../navbar/navbar'

function Search(props) {
    const [loading, setLoading]=useState(true);
    const [curUser]=useGetUser({});
    const [result, setresult]=useState([]);
    const search=useLocation().search;
    const query=new URLSearchParams(search).get('search');
    const type=new URLSearchParams(search).get('type');
    const notify=(message, type) => toast(`${message}`, { type: type });
    useEffect(() => {
        if (curUser!=undefined) {
            axios.post(`http://localhost:4000/search`, { query: query, type: type }, { withCredentials: true })
                .then((res) => {
                    let { success, finalResult, error }=res.data;
                    if (error) {
                        notify(error.message, 'error');
                        setLoading(false);
                    }
                    else {
                        notify(success, 'success');
                        setresult(finalResult);
                        console.log(result);
                        setLoading(false);
                    }
                })
                .catch((error) => {
                    notify(error.message, 'error');
                    setLoading(false);
                })
        }
    }, [])
    if (loading==true) {
        return <Loading />
    }
    else if (type=='posts') {
        return (
            <>
                <Navbar user={curUser} />
                <ToastContainer />
                <div class="container mt-3">
                    <h2>Search Results</h2>
                    <div class="row">
                        <div class="col-lg-10 mx-auto">
                            <div class="career-search mb-60">
                                <div class="filter-result">
                                    {
                                        result.map((ele) => {
                                            return (
                                                <div class="job-box d-md-flex align-items-center justify-content-between mb-30">
                                                    <div class="job-left my-4 d-md-flex align-items-center flex-wrap">
                                                        <div class="img-holder mr-md-4 mb-md-0 mb-4 mx-auto mx-md-0 d-md-none d-lg-flex">
                                                            FD
                                                        </div>
                                                        <div class="job-content">
                                                            <h5 class="text-center text-md-left">{ele.title}</h5>
                                                            <ul class="d-md-flex flex-wrap text-capitalize ff-open-sans">
                                                                <li class="mr-md-4 mx-1">
                                                                    <i class="fa-solid fa-calendar-lines-pen"></i>{ele.date}
                                                                </li>
                                                                <li class="mr-md-4 mx-1">
                                                                    <i class="fa-solid fa-layer-group"></i>{ele.techStack}
                                                                </li>
                                                                <li class="mr-md-4 mx-1">
                                                                    <i class="fa-solid fa-user-tie"></i>  {ele.author.displayname}
                                                                </li>
                                                            </ul>
                                                        </div>
                                                    </div>
                                                    <div class="job-right my-4 flex-shrink-0">
                                                        <a href={`/posts/${ele._id}`} class="btn d-block w-100 d-sm-inline-block btn-light">View Post</a>
                                                    </div>
                                                </div>
                                            )
                                        })
                                    }
                                </div>
                            </div>

                            {/* <nav aria-label="Page navigation">
                            <ul class="pagination pagination-reset justify-content-center">
                                <li class="page-item disabled">
                                    <a class="page-link" href="#" tabindex="-1" aria-disabled="true">
                                        <i class="zmdi zmdi-long-arrow-left"></i>
                                    </a>
                                </li>
                                <li class="page-item"><a class="page-link" href="#">1</a></li>
                                <li class="page-item d-none d-md-inline-block"><a class="page-link" href="#">2</a></li>
                                <li class="page-item d-none d-md-inline-block"><a class="page-link" href="#">3</a></li>
                                <li class="page-item"><a class="page-link" href="#">...</a></li>
                                <li class="page-item"><a class="page-link" href="#">8</a></li>
                                <li class="page-item">
                                    <a class="page-link" href="#">
                                        <i class="zmdi zmdi-long-arrow-right"></i>
                                    </a>
                                </li>
                            </ul>
                        </nav> */}
                        </div>
                    </div>
                </div>
            </>
        )
    }
    else {
        return (
            <>
                <Navbar user={curUser} />
                <ToastContainer />
                <div class="container mt-3">
                    <h2>Search Results</h2>
                    <div class="row">
                        <div class="col-lg-10 mx-auto">
                            <div class="career-search mb-60">
                                <div class="filter-result">
                                    {
                                        result.map((ele) => {
                                            return (
                                                <div class="job-box d-md-flex align-items-center justify-content-between mb-30">
                                                    <div class="job-left my-4 d-md-flex align-items-center flex-wrap">
                                                        <div class="img-holder mr-md-4 mb-md-0 mb-4 mx-auto mx-md-0 d-md-none d-lg-flex">
                                                            FD
                                                        </div>
                                                        <div class="job-content">
                                                            <h5 class="text-center text-md-left">{ele.displayname}</h5>
                                                            <ul class="d-md-flex flex-wrap text-capitalize ff-open-sans">
                                                                <li class="mr-md-4 mx-1">
                                                                    <i class="fa-solid fa-building-columns"></i>{ele.collegename}
                                                                </li>
                                                                <li class="mr-md-4 mx-1">
                                                                    <i class="fa-solid fa-megaphone"></i>{ele.description}
                                                                </li>
                                                            </ul>
                                                        </div>
                                                    </div>
                                                    <div class="job-right my-4 flex-shrink-0">
                                                        <a href={`/users/${ele._id}`} class="btn d-block w-100 d-sm-inline-block btn-light">View Profile</a>
                                                    </div>
                                                </div>
                                            )
                                        })
                                    }
                                </div>
                            </div>

                            {/* <nav aria-label="Page navigation">
                        <ul class="pagination pagination-reset justify-content-center">
                            <li class="page-item disabled">
                                <a class="page-link" href="#" tabindex="-1" aria-disabled="true">
                                    <i class="zmdi zmdi-long-arrow-left"></i>
                                </a>
                            </li>
                            <li class="page-item"><a class="page-link" href="#">1</a></li>
                            <li class="page-item d-none d-md-inline-block"><a class="page-link" href="#">2</a></li>
                            <li class="page-item d-none d-md-inline-block"><a class="page-link" href="#">3</a></li>
                            <li class="page-item"><a class="page-link" href="#">...</a></li>
                            <li class="page-item"><a class="page-link" href="#">8</a></li>
                            <li class="page-item">
                                <a class="page-link" href="#">
                                    <i class="zmdi zmdi-long-arrow-right"></i>
                                </a>
                            </li>
                        </ul>
                    </nav> */}
                        </div>
                    </div>
                </div>
            </>
        )
    }
}

export default Search