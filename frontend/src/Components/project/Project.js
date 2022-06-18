import React, { Fragment, useEffect } from "react";
import './Project.css'
import Loading from '../loading';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useNavigate } from 'react-router-dom';
import useGetUser from '../../Hooks/useGetUser';
import { useState } from "react";
import axios from "axios";
import Navbar from '../navbar/navbar'
import { Carousel, Dropdown, Button, ButtonGroup } from "react-bootstrap";
import Pagination from "react-js-pagination";

const Project=() => {
  const [loading, setLoading]=useState(true);
  const [curUser]=useGetUser({});
  const [currentPage, setCurrentPage]=useState(1);
  const [posts, setPosts]=useState([]);
  const [suggestions, setSuggestions]=useState([])
  const [resultPerPage, setResultPerPage]=useState(6);
  const notify=(message, type) => toast(`${message}`, { type: type });

  const indexOfLastPost=currentPage*resultPerPage;
  const indexOfFirstPost=indexOfLastPost-resultPerPage;
  let friendPosts=posts;
  if (friendPosts!=undefined) {
    friendPosts=friendPosts.slice(indexOfFirstPost, indexOfLastPost)
  }

  const setCurrentPageNo=(e) => {
    setCurrentPage(e);
  }

  useEffect(async () => {
    if (curUser!=undefined) {
      await axios.get("http://localhost:4000/user", {
        withCredentials: true
      })
        .then((response) => {
          let { success, user }=response.data;
          // notify(success, 'success');
          setSuggestions(user);
          console.log(suggestions)
          // setLoading(false);
        })
        .catch((err) => {
          // notify('error', err.message);
          // setLoading(false);
        })
    }
  }, [curUser.friends])
  useEffect(() => {
    if (curUser!=undefined) {
      axios.get('http://localhost:4000/posts', {
        withCredentials: true
      })
        .then((response) => {
          let { success, error, data }=response.data;
          if (error) {
            notify('error', error.message);
            setLoading(false);
          }
          else {
            notify(success, 'success');
            setPosts(data);
            console.log(posts);
            setLoading(false);
          }
        })
        .catch((err) => {
          notify('error', err.message);
          setLoading(false);
        })
    }
  }, []);
  const navigate=useNavigate();
  if (loading==true) {
    return (
      <Loading />
    )
  }
  else {
    return (

      <Fragment>
        <Navbar user={curUser} />
        <div className="container-fluid project-container-fluid">
          <div className="row">
            <div className="col-md-3 col-sm-12 mt-5">
              <button class="col-md-8 col-sm-6 continue-application my-3">
                <div>
                  <div class="pencil"></div>
                  <div class="folder">
                    <div class="top">
                      <svg viewBox="0 0 24 27">
                        <path d="M1,0 L23,0 C23.5522847,-1.01453063e-16 24,0.44771525 24,1 L24,8.17157288 C24,8.70200585 23.7892863,9.21071368 23.4142136,9.58578644 L20.5857864,12.4142136 C20.2107137,12.7892863 20,13.2979941 20,13.8284271 L20,26 C20,26.5522847 19.5522847,27 19,27 L1,27 C0.44771525,27 6.76353751e-17,26.5522847 0,26 L0,1 C-6.76353751e-17,0.44771525 0.44771525,1.01453063e-16 1,0 Z"></path>
                      </svg>
                    </div>
                    <div class="paper"></div>
                  </div>
                </div>
                <span>Create Post</span>
              </button>
              <a href="/suggestions">
                <button className="col-sm-6 btn btn-outline-dark sugg my-3">
                  View Suggestions
                </button>
              </a>
            </div>
            <div className="col-md-8 col-sm-12 bgcolour rounded-3">
              <div className="container-fluid project-container-fluid">
                <div className="row" style={{ height: "100vh" }}>
                  <div
                    className="col-xxl-8 col-lg-8 col-sm-8 col-md-8 overflow-auto hiddenscroll post"
                    style={{ height: "100%" }}
                  >
                    {
                      friendPosts.map((post) => {
                        return (
                          <div class="container-fluid post-container">
                            <div className="row">
                              <div className="col-md-10 col-sm-12 my-">
                                <Carousel>
                                  {
                                    post.images.map((image) => {
                                      return (
                                        <Carousel.Item className="carousel-item">
                                          <a href={`/posts/${post._id}`}><img
                                            className="pImg"
                                            src={image.url}
                                            alt="First slide"
                                          /></a>
                                        </Carousel.Item>
                                      )
                                    })
                                  }
                                </Carousel>
                              </div>
                              <div className="col-md-2 col-sm-12">
                                <div class="post-container__text">
                                  <h1>{post.title}</h1>
                                  <a href={"/users/"+post.author._id}>
                                    <div className="d-flex my-2">
                                      <img src={post.author.avatar} className="post-avatar" />
                                      {post.author.displayname}
                                    </div>
                                  </a>
                                  <p className="post-description mb-5">
                                    {post.description}
                                  </p>
                                  <div class="post-container__text__timing ">
                                    <div class="post-container__text__timing_time sugg-lg">
                                      <h2>Likes</h2>
                                      <p>{post.likes.length}</p>
                                    </div>
                                    <div class="post-container__text__timing_time sugg-lg">
                                      <h2>Comments</h2>
                                      <p>{post.comments.length}</p>
                                    </div>
                                  </div>
                                </div>
                              </div>
                              <div className="container-fluid">
                                <a href={"/posts/"+post._id}><button class="view-btn"><span>View Post</span><i class="fa fa-arrow-right"></i></button></a>
                              </div>
                            </div>
                          </div>
                        )
                      })
                    }
                    {
                      (resultPerPage<posts.length)? (<div className="paginationBox">
                        <Pagination
                          activePage={currentPage}
                          itemsCountPerPage={resultPerPage}
                          totalItemsCount={posts.length}
                          onChange={setCurrentPageNo}
                          nextPageText="Next"
                          prevPageText="Prev"
                          firstPageText="1st"
                          lastPageText="last"
                          itemClass="page-item"
                          pageRangeDisplayed={3}
                          linkClass="page-link"
                          activeClass="pageItemActive"
                          activeLinkClass="pageLinkActive"
                        ></Pagination>
                      </div>):(<></>)
                    }
                  </div>
                  <div className="col-xxl-4 my-3 bordered sugg-lg" style={{ height: "fit-content" }}>
                    <p className="fw-bold fw-light mb-4">Suggestions for you... </p>
                    <div className="post-container-fluid project-post-container-fluid">
                      {
                        suggestions.map((user) => {
                          return (
                            <div className="row">
                              <div className="col-3">
                                <img src={user.avatar} className="post-avatar" />
                              </div>
                              <div className="col-7 fs-6 mb-1">
                                <a href={`/users/${user._id}`}><div className="row fw-bold">{user.displayname}</div></a>
                                <a href={`/users/${user._id}`}><div className="row mb-2 fs-6 fw-light">{user.username}</div></a>
                              </div>
                              {/* <div className="col-2 text-primary" style={{ cursor: "pointer" }}>Follow</div> */}

                            </div>
                          )
                        })
                      }
                    </div>
                  </div>
                </div>
              </div>
            </div>
            {/* <div className="col-2 d-none d-sm-block"></div> */}
          </div>
        </div>
        <ToastContainer />
      </Fragment>
    );
  }
};

export default Project;

/*
<div className="m-3 bg-light viewPost">
                            <a href={`/users/${post.author._id}`}>
                              <img src={post.author.avatar} className="avatarimage" />
                              <h6 className="d-inline">{post.author.displayname}</h6>
                            </a>
                            <div className="d-inline float-end m-1">
                              <Dropdown as={ButtonGroup}>
                                {/* <Button variant="success"></Button> 

                                <Dropdown.Toggle split variant="success" id="dropdown-split-basic" />

                                <Dropdown.Menu>
                                  <Dropdown.Item href={`users/${post.author._id}`}>View Profile</Dropdown.Item>
                                  <Dropdown.Item href="#/action-2">Unfriend</Dropdown.Item>
                                  <Dropdown.Item href="#/action-3">Message</Dropdown.Item>
                                </Dropdown.Menu>
                              </Dropdown>
                            </div>
  <Carousel>
    {
      post.images.map((image) => {
        return (
          <Carousel.Item className="carousel-item">
            <a href={`/posts/${post._id}`}><img
              className="d-block w-100 pImg"
              src={image.url}
              alt="First slide"
            /></a>
            {/* <Carousel.Caption>
                                      <h3>First slide label</h3>
                                      <p>Nulla vitae elit libero, a pharetra augue mollis interdum.</p>
                                    </Carousel.Caption> 
          </Carousel.Item>
        )
      })
    }
  </Carousel>
                          </div>
*/