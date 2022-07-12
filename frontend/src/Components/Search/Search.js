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
import Pagination from 'react-js-pagination';

function Search(props) {
    const [loading, setLoading]=useState(true);
    const [curUser]=useGetUser({});
    const [result, setresult]=useState([]);
    const [currentPage, setCurrentPage]=useState(1);
    const [resultPerPage, setResultPerPage]=useState(2);
    const search=useLocation().search;
    const query=new URLSearchParams(search).get('search');
    const type=new URLSearchParams(search).get('type');
    const notify=(message, type) => toast(`${message}`, { type: type });

    const indexOfLastPost=currentPage*resultPerPage;
    const indexOfFirstPost=indexOfLastPost-resultPerPage;
    let searchQuery=result;
    if (searchQuery!=undefined) {
        searchQuery=searchQuery.slice(indexOfFirstPost, indexOfLastPost)
    }

    const setCurrentPageNo=(e) => {
        setCurrentPage(e);
    }

    useEffect(() => {
        if (curUser!=undefined) {
            axios.post(`/api/search`, { query: query, type: type }, { withCredentials: true })
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
    var datetime=(e) => {
        const month=["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
        var sdate=e;
        var date=new Date(sdate);
        var mon=month[date.getMonth()];
        var dt=date.getDate();
        var time=date.getHours()+":"+date.getMinutes();
        return dt+" "+mon;
    }
    if (loading==true) {
        return <Loading />
    }
    if (searchQuery.length==0) {
        return (
            <>
                <Navbar user={curUser} />
                <ToastContainer />
                <div className='container d-flex justify-content-center align-items-center'>
                    <img src='https://res.cloudinary.com/dewansh/image/upload/v1655480631/BitDev/29a69-unscreen_wm5ets.gif' className='img-fluid' />
                </div>
            </>
        )
    }
    else if (type=='posts') {
        return (
            <>
                <Navbar user={curUser} />
                <ToastContainer />
                <div class="container mt-3">
                    <h2 className='mb-4'>Search Results</h2>
                    <div class="row">
                        <div class="col-lg-10 mx-auto">
                            <div class="career-search mb-60">
                                <div class="filter-result">
                                    {
                                        searchQuery.map((ele) => {
                                            return (
                                                <div class="job-box d-md-flex align-items-center justify-content-between mb-30">
                                                    <div class="job-left my-4 d-md-flex align-items-center flex-wrap">
                                                        <img src={ele.images[0].url} className='s-post-img img-fluid ' />
                                                        <div class="job-content">
                                                            <h5 class="text-center text-md-left">{ele.title}</h5>
                                                            <ul class="d-md-flex flex-wrap text-capitalize ff-open-sans">
                                                                <li class="mr-md-4 mx-1">
                                                                    <i class="fa-solid fa-layer-group"></i>{ele.techStack}
                                                                </li>
                                                                <li class="mr-md-4 mx-1">
                                                                    <img src={ele.author.avatar} className="search-ava" />  {ele.author.displayname}
                                                                </li>
                                                            </ul>
                                                        </div>
                                                    </div>
                                                    <div class="d-flex flex-column job-right my-4 flex-shrink-0">
                                                        <div class="mr-md-4 mx-1 text-muted">
                                                            <i class="fa-solid fa-calendar-plus mx-3 my-2"></i>{datetime(ele.datePosted)}
                                                        </div>
                                                        <a href={`/posts/${ele._id}`} class="btn d-block w-100 d-sm-inline-block btn-light"><button className='btn btn-outline-dark '>View Post</button></a>
                                                    </div>
                                                </div>
                                            )
                                        })
                                    }
                                    {
                                        (resultPerPage<result.length)? (<div className="paginationBox">
                                            <Pagination
                                                activePage={currentPage}
                                                itemsCountPerPage={resultPerPage}
                                                totalItemsCount={result.length}
                                                onChange={setCurrentPageNo}
                                                nextPageText="Next"
                                                prevPageText="Prev"
                                                firstPageText="1st"
                                                lastPageText="last"
                                                itemClass="page-item"
                                                linkClass="page-link"
                                                activeClass="pageItemActive"
                                                pageRangeDisplayed={3}
                                                activeLinkClass="pageLinkActive"
                                            ></Pagination>
                                        </div>):(<></>)
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
                                        searchQuery.map((ele) => {
                                            return (
                                                <div class="job-box d-md-flex align-items-center justify-content-between mb-30">
                                                    <div class="job-left my-4 d-md-flex align-items-center flex-wrap">
                                                        <img src={ele.avatar} className='avatarImagebig img-fluid mx-4' />
                                                        <div class="job-content">
                                                            <h5 class="text-center text-md-left">{ele.displayname}</h5>
                                                            <ul class="d-md-flex flex-wrap text-capitalize ff-open-sans">
                                                                <li class="mr-md-4 mx-1">
                                                                    <i class="fa-regular fa-comment"></i>{ele.description}
                                                                </li>
                                                                <li class="mr-md-4 mx-1">
                                                                    <i class="fa-regular fa-building-columns"></i>  {ele.collegename}
                                                                </li>
                                                            </ul>
                                                        </div>
                                                    </div>
                                                    <div class="d-flex flex-column job-right my-4 flex-shrink-0">
                                                        <div class="mr-md-4 mx-1 text-muted">
                                                            <i class="fa-solid fa-calendar-plus mx-3 my-2"></i>{datetime(ele.createdAt)}
                                                        </div>
                                                        <a href={`/users/${ele._id}`} class="btn d-block w-100 d-sm-inline-block btn-light"><button className='btn btn-outline-dark '>View Dev.</button></a>
                                                    </div>
                                                </div>
                                            )
                                        })
                                    }
                                    {
                                        (resultPerPage<result.length)? (<div className="paginationBox">
                                            <Pagination
                                                activePage={currentPage}
                                                itemsCountPerPage={resultPerPage}
                                                totalItemsCount={result.length}
                                                onChange={setCurrentPageNo}
                                                nextPageText="Next"
                                                prevPageText="Prev"
                                                firstPageText="1st"
                                                lastPageText="last"
                                                itemClass="page-item"
                                                linkClass="page-link"
                                                activeClass="pageItemActive"
                                                pageRangeDisplayed={3}
                                                activeLinkClass="pageLinkActive"
                                            ></Pagination>
                                        </div>):(<></>)
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