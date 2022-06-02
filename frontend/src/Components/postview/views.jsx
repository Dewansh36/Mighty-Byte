import React from "react";
import '../../Public/css/view.css';
import Loading from '../loading';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useNavigate, useParams } from 'react-router-dom';
import useGetUser from '../../Hooks/useGetUser';
import { useState, useEffect } from "react";
import axios from "axios";
import Navbar from '../navbar/navbar'

function Views() {
    const { id }=useParams();
    const [loading, setLoading]=useState(true);
    const [curUser]=useGetUser({});
    const [post, setPost]=useState({});
    const navigate=useNavigate();
    const [commentText, setComment]=useState('');
    let likeElement=() => {
        if (post.likes!=undefined) {
            let flag=false;
            for (let likers of post.likes) {
                if (likers==curUser._id||likers._id==curUser._id) {
                    flag=true;
                    break;
                }
            }
            if (flag==true) {
                return (
                    <a onClick={dislikefunc} className="btn btn--with-icon px-3">
                        <i class="fas fa-thumbs-down"></i>
                    </a>
                )
            }
            else {
                return (
                    <a onClick={likefunc} className="btn btn--with-icon px-3">
                        <i class="fas fa-thumbs-up"></i>
                    </a>
                )

            }
        }
    }
    useEffect(() => {
        likeElement=() => {
            let flag=false;
            for (let likers of post.likes) {
                if (likers==curUser._id||likers._id==curUser._id) {
                    flag=true;
                    break;
                }
            }
            if (flag==true) {
                if (post.likes.includes(curUser._id)==true) {
                    return (
                        <a onClick={dislikefunc} className="btn btn--with-icon px-3">
                            <i class="fas fa-thumbs-down"></i>
                        </a>
                    )
                }
                else {
                    return (
                        <a onClick={likefunc} className="btn btn--with-icon px-3">
                            <i class="fas fa-thumbs-up"></i>
                        </a>
                    )

                }
            }
        }
    }, [post]);

    const likefunc=() => {
        setLoading(true);
        axios.get(`http://localhost:4000/posts/${id}/like`, {
            withCredentials: true
        })
            .then((response) => {
                let { success, error, post }=response.data;
                if (error) {
                    setLoading(false);
                    notify(error.message, 'error');
                }
                else {
                    setPost(post);
                    console.log("Like:  ", post.likes)
                    setLoading(false);
                    notify(success, 'success');
                }
            })
            .catch((err) => {
                setLoading(false);
                notify(err.message, 'error');
            });
    }
    const dislikefunc=() => {
        setLoading(true);
        axios.get(`http://localhost:4000/posts/${id}/dislike`, {
            withCredentials: true
        })
            .then((response) => {
                let { success, error, post }=response.data;
                if (error) {
                    setLoading(false);
                    notify(error.message, 'error');
                }
                else {
                    setPost(post);
                    console.log("Like:  ", post.likes)
                    setLoading(false);
                    notify(success, 'info');
                }
            })
            .catch((err) => {
                setLoading(false);
                notify(err.message, 'error');
            });
    }
    const commentDeletor=(comment) => {
        setLoading(true);
        axios.delete(`http://localhost:4000/posts/${id}/comments/${comment._id}`, {
            withCredentials: true
        })
            .then((respsonse) => {
                let { success, error, post }=respsonse.data;
                if (error) {
                    setLoading(false);
                    notify(error.message, 'error');
                }
                else {
                    setLoading(false);
                    setPost(post);
                    notify(success, 'info');
                }
            })
            .catch((error) => {
                setLoading(false);
                notify(error.message, 'error');
            })
    }
    const commentCreator=(e) => {
        e.preventDefault();
        setLoading(true);
        axios.post(`http://localhost:4000/posts/${id}/comments/new`, {
            text: commentText
        }, {
            withCredentials: true
        })
            .then((respsonse) => {
                let { success, error, post }=respsonse.data;
                if (error) {
                    setLoading(false);
                    notify(error.message, 'error');
                }
                else {
                    setLoading(false);
                    setPost(post);
                    setComment('');
                    notify(success, 'success');
                }
            })
            .catch((error) => {
                setLoading(false);
                notify(error.message, 'error');
            })
    }
    const notify=(message, type) => toast(`${message}`, { type: type });
    useEffect(() => {
        if (curUser!=undefined) {
            console.log(id);
            axios.get(`http://localhost:4000/posts/${id}`, {
                withCredentials: true
            })
                .then((response) => {
                    let { success, error, post }=response.data;
                    if (error) {
                        notify('error', error.message);
                        setLoading(false);
                    }
                    else {
                        notify(success, 'success');
                        setPost(post);
                        console.log("Post:  ", post);
                        setLoading(false);
                    }
                })
                .catch((err) => {
                    notify('error', err.message);
                    setLoading(false);
                })
        }
    }, []);
    if (loading==true) {
        return (
            <Loading />
        )
    }
    console.log("Post:  ", post);
    return (
        <>
            <Navbar user={curUser} />
            <ToastContainer />
            <div className="container mt-5 viewBorder">
                <div className="row">
                    <div className="col-12">
                        <article className="blog-card">
                            <div className="blog-card__background">
                                <div className="card__background--wrapper">
                                    {/* <div className="card__background--main">

                                        <div className="card__background--layer"></div>
                                    </div> */}
                                    <div id="carouselExampleIndicators" className="carousel slide" data-bs-ride="carousel">
                                        <div className="carousel-inner">
                                            {
                                                post.images.map((image) => {
                                                    return (
                                                        <div className="carousel-item active">
                                                            <img src={image.url} className="d-block w-100 viewPostImage" alt="..." />
                                                        </div>
                                                    )
                                                })
                                            }
                                        </div>
                                        <button className="carousel-control-prev" type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide="prev">
                                            <span className="carousel-control-prev-icon" aria-hidden="true"></span>
                                            <span className="visually-hidden">Previous</span>
                                        </button>
                                        <button className="carousel-control-next" type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide="next">
                                            <span className="carousel-control-next-icon" aria-hidden="true"></span>
                                            <span className="visually-hidden">Next</span>
                                        </button>
                                    </div>
                                </div>
                            </div>
                            <div className="blog-card__head">
                                <span className="date__box">
                                    <span className="date__day">{post.datePosted}</span>
                                </span>
                            </div>
                            <div className="blog-card__info">
                                <h5>{post.title}</h5>
                                <p>
                                    <a href={`/users/${post.author._id}`} className="icon-link mr-3"><i className="fa fa-pencil-square-o"></i> {post.author.displayname}</a>
                                    <a href="#" className="icon-link mr-3 ms-2 bi bi-heart-fill"><svg className="ms-2" xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
                                        <path fill-rule="evenodd" d="M8 1.314C12.438-3.248 23.534 4.735 8 15-7.534 4.736 3.562-3.248 8 1.314z" />
                                    </svg> {post.likes.length}</a>
                                    <a href="#" className="icon-link"><i className="fa fa-comments-o ms-2"></i> {post.comments.length}</a>
                                </p>
                                <p>{post.description}</p>
                                {
                                    likeElement()
                                }
                            </div>
                        </article>
                    </div>
                </div>
            </div>

            <section className="detail-page">
                <div className="container mt-5">

                </div>
            </section>
            {/* comments  */}
            <div className="container mt-5 mb-5">
                <div className="d-flex justify-content-center row">
                    <div className="d-flex flex-column col-md-12">
                        <div className="coment-bottom bg-white p-2 px-4">
                            <form onSubmit={commentCreator}>
                                <div className="d-flex flex-row add-comment-section mt-4 mb-4">
                                    <img className="img-fluid img-responsive rounded-circle mx-3" src={curUser.avatar} width="50" />
                                    <input name="text" type="text" className="form-control mr-3" placeholder="Add comment" value={commentText} onChange={(e) => { setComment(e.target.value) }} />
                                    <button className="btn btn-primary px-3 pe-5 ms-2" type="submit">Comment</button>
                                </div>
                            </form>
                            {
                                post.comments.map((comment) => {
                                    if (comment.author._id==curUser._id) {
                                        return (
                                            <div className="commented-section mt-2">
                                                <div className="d-flex flex-row align-items-center commented-user">
                                                    <img className="img-fluid img-responsive rounded-circle mx-3" src={comment.author.avatar} width="50" />
                                                    <h5 className="mr-2">{comment.author.displayname}</h5><span className="dot mb-1 mx-3"></span><span className="mb-1 ml-2 mx-3">{comment.date}</span>
                                                </div>
                                                <div className="comment-text-sm"><span>{comment.text}</span></div>
                                                <btn onClick={() => {
                                                    commentDeletor(comment);
                                                }} className="btn btn-warning">Delete Comment</btn>
                                            </div>
                                        )
                                    }
                                    else {
                                        return (
                                            <div className="commented-section mt-2">
                                                <div className="d-flex flex-row align-items-center commented-user">
                                                    <img className="img-fluid img-responsive rounded-circle mx-3" src={comment.author.avatar} width="50" />
                                                    <h5 className="mr-2">{comment.author.displayname}</h5><span className="dot mb-1 mx-3"></span><span className="mb-1 ml-2 mx-3">{comment.date}</span>
                                                </div>
                                                <div className="comment-text-sm"><span>{comment.text}</span></div>
                                            </div>
                                        )
                                    }
                                })
                            }
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Views


