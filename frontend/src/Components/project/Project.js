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
import { Carousel,Dropdown,Button,ButtonGroup } from "react-bootstrap";

const Project=() => {
  const [loading, setLoading]=useState(true);
  const [curUser]=useGetUser({});
  const [posts, setPosts]=useState([]);
  const notify=(message, type) => toast(`${message}`, { type: type });
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
            <div className="col-2 d-none d-sm-block"></div>
            <div className="col-md-8 col-sm-12 bgcolour rounded-3">
              <div className="container-fluid project-container-fluid">
                <div className="row" style={{ height: "100vh" }}>
                  <div
                    className="col-xxl-8 col-lg-12 col-sm-12 col-md-12 overflow-auto hiddenscroll post"
                    style={{ height: "100%" }}
                  >
                    {
                      posts.map((post) => {
                        return (
                          <div className="m-3 bg-light viewPost">
                            <a href={`/users/${post.author._id}`}>
                              {/* <button className="btn rounded-circle btn-success d-inline my-3 text-center mx-2 fs-6 fw-normal text-black pColor">
                                AA
                              </button> */}
                              <h6 className="d-inline">{post.author.displayname}</h6>
                            </a>
                            <div className="d-inline float-end m-3">
                              <Dropdown as={ButtonGroup}>
                                {/* <Button variant="success"></Button> */}

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
                                post.images.map((image)=>{
                                  return (
                                    <Carousel.Item className="carousel-item">
                                    <img
                                      className="d-block w-100 pImg"
                                      src={image.url}
                                      alt="First slide"
                                    />
                                    {/* <Carousel.Caption>
                                      <h3>First slide label</h3>
                                      <p>Nulla vitae elit libero, a pharetra augue mollis interdum.</p>
                                    </Carousel.Caption> */}
                                  </Carousel.Item>
                                  )
                                })
                              }
                            </Carousel>
                            <div className="project-icon">
                              <i class="far fa-thumbs-up ms-2 p-2"></i>
                              <i class="far fa-comments p-2"></i>
                              <h5 className="postTitle">{post.title}</h5>
                            </div>
                            <div>
                              <p className="px-3 my-0 fw-light">{post.likes.length} Likes</p>
                              <p className="px-3 text-bold my-0">{post.description}</p>
                              <p className="px-3 fw-light my-0"> {new Date(post.datePosted).toDateString()} </p>
                            </div>
                            <div className="row m-0 ">
                              <form>
                                <input
                                  type="text"
                                  className="col-8 border-0 col-form-label form-control mb-3"
                                  placeholder="Comment..."
                                />
                              </form>
                            </div>
                          </div>
                        )
                      })
                    }
                    <div className="m-3 rounded-3 bg-light bordered">
                      <button className="btn rounded-circle btn-success d-inline my-3 text-center mx-2 fs-6 fw-normal text-black pColor">
                        AA
                      </button>
                      <h6 className="d-inline">Aman Agrawal</h6>
                      <div className="d-inline float-end m-3">
                        <Dropdown as={ButtonGroup}>
                          {/* <Button variant="success"></Button> */}

                          <Dropdown.Toggle split variant="success" id="dropdown-split-basic" />

                          <Dropdown.Menu>
                            <Dropdown.Item href="#/action-1">View Profile</Dropdown.Item>
                            <Dropdown.Item href="#/action-2">Add friend</Dropdown.Item>
                            <Dropdown.Item href="#/action-3">Message</Dropdown.Item>
                          </Dropdown.Menu>
                        </Dropdown>
                      </div>
                      <Carousel>
                        <Carousel.Item>
                          <img
                            className="d-block w-100"
                            src="https://ebsedu.org/wp-content/uploads/2020/06/AI-CAREER.jpg"
                            alt="First slide"
                          />
                          <Carousel.Caption>
                            <h3>First slide label</h3>
                            <p>Nulla vitae elit libero, a pharetra augue mollis interdum.</p>
                          </Carousel.Caption>
                        </Carousel.Item>
                        <Carousel.Item>
                          <img
                            className="d-block w-100"
                            src="https://ebsedu.org/wp-content/uploads/2020/06/AI-CAREER.jpg"
                            alt="Second slide"
                          />

                          <Carousel.Caption>
                            <h3>Second slide label</h3>
                            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
                          </Carousel.Caption>
                        </Carousel.Item>
                        <Carousel.Item>
                          <img
                            className="d-block w-100"
                            src="https://ebsedu.org/wp-content/uploads/2020/06/AI-CAREER.jpg"
                            alt="Third slide"
                          />

                          <Carousel.Caption>
                            <h3>Third slide label</h3>
                            <p>Praesent commodo cursus magna, vel scelerisque nisl consectetur.</p>
                          </Carousel.Caption>
                        </Carousel.Item>
                      </Carousel>
                      <div className="project-icon">
                        <i class="far fa-thumbs-up ms-2 p-2"></i>
                        <i class="far fa-comments p-2"></i>
                        <h5 className="postTitle">Project Title</h5>
                      </div>
                      <div>
                        <p className="px-3 my-0 fw-light">100000 likes</p>
                        <p className="px-3 text-bold my-0">Hello my project is about more...</p>
                        <p className="px-3 fw-light my-0">
                          view all 200000 comments
                        </p>
                        <p className="px-3 fw-light my-0"> 5 days ago </p>
                      </div>
                      <div className="row m-0 ">
                        <form>
                          <input
                            type="text"
                            className="col-8 border-0 col-form-label form-control mb-3"
                            placeholder="Comment..."
                          />
                        </form>
                      </div>
                    </div>
                  </div>
                  <div className="col-xxl-4 d-none d-xxl-block my-3 bordered" style={{ height: "fit-content" }}>
                    <p className="fw-bold fw-light mb-4">Suggestions for you... </p>
                    <div className="container-fluid project-container-fluid">
                      <div className="row">
                        <div className="col-3">
                          <button className="btn rounded-circle btn-success fs-6 text-black pColor">
                            aa
                          </button>
                        </div>
                        <div className="col-7 fs-6 mb-1">
                          <div className="row fw-bold">Aman Agarwal</div>
                          <div className="row mb-2 fs-6 fw-light">amanagarwal</div>
                        </div>
                        <div className="col-2 text-primary" style={{ cursor: "pointer" }}>Follow</div>
                      </div>
                    </div>
                    <a href="/suggestions">
                      <div className="fw-light fw-bold text-center mb-2">
                        See all suggestions...
                      </div>
                    </a>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-2 d-none d-sm-block"></div>
          </div>
        </div>
        <ToastContainer />
      </Fragment>
    );
  }
};

export default Project;
