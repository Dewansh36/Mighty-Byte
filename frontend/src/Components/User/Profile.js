import React, { Fragment, useEffect, useState } from "react";
import Navbar from '../navbar/navbar'
import { useParams } from "react-router-dom";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import "./Profile.css";
import useGetUser from '../../Hooks/useGetUser';
import { Image } from "react-bootstrap";
import Loading from '../loading'
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Pagination from "react-js-pagination";
import CalendarHeatmap from 'react-calendar-heatmap'
import 'react-calendar-heatmap/dist/styles.css';
import GodBtn from "../GodBtn";


const Profile=() => {
  const { id }=useParams();
  const [curUser]=useGetUser({});
  const [currentPage, setCurrentPage]=useState(1);
  const [reqUser]=useGetUser({}, id);
  const [likes, setLikes]=useState(0);
  const [loading, setLoading]=useState(true);
  const [isFriend, setFriend]=useState(false);
  const [resultPerPage, setResultPerPage]=useState(6);
  const [toogleState, setToogleState]=useState(1);
  let startDate=new Date()

  const months=["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
  const [date, setDate]=useState("Jan 2012")
  const navigate=useNavigate();
  const notify=(message, type) => toast(`${message}`, { type: type });
  startDate.setFullYear(startDate.getFullYear()-1)
  console.log(startDate)
  const indexOfLastPost=currentPage*resultPerPage;
  const indexOfFirstPost=indexOfLastPost-resultPerPage;
  let posts=reqUser.posts;
  let friends=reqUser.friends
  if (posts!=undefined) {
    posts=posts.slice(indexOfFirstPost, indexOfLastPost)
    friends=friends.slice(indexOfFirstPost, indexOfLastPost)
  }

  const setCurrentPageNo=(e) => {
    setCurrentPage(e);
  }

  const myStyle={
    color: "#6c301f",
    textDecoration: "none"
  }
  const toogleTab=(index) => {
    setToogleState(index);
  };
  const addFriend=async () => {
    setLoading(true);
    await axios.get(`/api/user/${id}/addfriend`, {
      withCredentials: true
    })
      .then((response) => {
        let { success, user }=response.data;
        console.log(user);
        window.location.reload(false);
        setLoading(false);
        notify(success, 'success');
      })
      .catch((err) => {
        setLoading(false);
        notify(err.message, 'error');
      });
  }
  const removeFriend=async () => {
    setLoading(true);
    await axios.get(`/api/user/${id}/removefriend`, {
      withCredentials: true
    })
      .then((response) => {
        let { success, user }=response.data;
        console.log(user);
        window.location.reload(false);
        setLoading(false);
        notify(success, 'success');
      })
      .catch((err) => {
        setLoading(false);
        notify(err.message, 'error');
      });
  }
  let friendFunc=() => {
    if (curUser.displayname!=undefined&&reqUser.displayname!=undefined) {
      let flag=false;
      for (let friend of curUser.friends) {
        if (friend._id==reqUser._id) {
          flag=true;
          break;
        }
      }
      if (flag==true) {
        return (
          <a onClick={removeFriend}>
            <button className="btn btn-danger edit-profile">
              <i className="fa fa-pencil-square fa-lg"></i> Unfriend
            </button>
          </a>)
      }
      else {
        return (
          <a onClick={addFriend}>
              <button className="edit-profile god-btn">
                <span><i className="fa fa-pencil-square fa-lg"></i>&nbsp;&nbsp;Add friend</span>
              </button>
            </a>)
      }
    }
  }
  useEffect(() => {
    let friendFunc=() => {
      if (curUser.email!=undefined && reqUser.email!=undefined) {
        console.log(curUser.friends);
        console.log(reqUser.friends)
        if (curUser.friends.include(reqUser._id)==true) {
          setFriend(true);
          return (
            <a onClick={removeFriend}>
              <button className="btn btn-danger edit-profile">
                <i className="fa fa-pencil-square fa-lg"></i> Unfriend
              </button>
            </a>)
        }
        else {
          setFriend(false);
          return (
            <a onClick={addFriend}>
              <button className="edit-profile god-btn">
                <span><i className="fa fa-pencil-square fa-lg"></i>&nbsp;&nbsp;Add friend</span>
              </button>
            </a>)
        }
      }
    }
  }, [reqUser.friends])
  useEffect(() => {
    if (curUser.displayname!=undefined&&reqUser.displayname!=undefined) {
      setLoading(false);
      console.log(curUser)
      console.log(reqUser)
      for (let i=0; i<reqUser.friends.length; i++) {
        if((reqUser.friends[i]._id)==curUser._id){
          setFriend(true);
          break;
        }
      }
      let like=0;
      for (let i=0; i<reqUser.posts.length; i++) {
        like+=(reqUser.posts[i].likes.length);
      }
      let date=reqUser.createdAt;
      if (date) {
        let month=months[Number(date.slice(5, 7))-1];
        let year=date.slice(0, 4);
        date=month+" "+year;
        setDate(date);
      }
      setLikes(like);
    }
    console.log(reqUser);
    console.log(curUser);
  }, [curUser, reqUser])
  if (loading==true) {
    return (
      <Loading />
    )
  }
  return (
    <Fragment>
      <Navbar user={curUser} />
      <ToastContainer></ToastContainer>
      <div className="m-3 profileFix">
        <div className="row" id="user-profile">
          <div className="col-lg-3 col-md-4 col-sm-4">
            <div className="main-box">
              <h2 className="profile-h2">{reqUser.displayname}</h2>
              <div className="profile-status">
                <i className="fa fa-check-circle"></i> Online
              </div>
              <img
                src={reqUser.avatar}
                alt=""
                className="profile-img img-fluid center-block"
              />
              <div className="profile-since">Member since: {date}</div>

              <div className="profile-details">
                <ul className="fa-ul">
                  <li>
                    <i className="faelectPage-li fa fa-tasks"></i>Posts: {" "}
                    <span>{reqUser.posts.length}</span>
                  </li>
                  <li>
                    <i className="fa-li fa fa-thumbs-up"></i>Likes:{" "}
                    <span>{likes}</span>
                  </li>
                  <li>
                    <i className="fa-li fa fa-comment"></i>Comments:{" "}
                    <span>{reqUser.comments.length}</span>
                  </li>
                </ul>
              </div>

              {
                (isFriend)? (
                  <div className="profile-message-btn center-block text-center">
                    <a href="/messenger"><button className="btn btn-success">
                      <i className="fa fa-envelope"></i> Send message
                    </button></a>
                  </div>
                ):(<></>)

              }
            </div>
          </div>

          <div className="col-lg-9 col-md-8">
            <div className="main-box">
              <div className="profile-header">
                <h3 className="profile-h3">
                  <span style={{ color: "black" }}>User info</span>
                </h3>
                {
                  (reqUser._id==curUser._id)? (
                    <a href={`/users/${reqUser._id}/edit`}>
                      <button className="edit-profile god-btn">
                      <span><i className="fa fa-pencil-square fa-lg ml-2"></i>&nbsp;&nbsp;Edit Profile</span>
                      </button>
                    </a>):(friendFunc())
                }
              </div>

              <div className="profile-user-info" id="userInfo">
                <div id="userInfo1">
                  <div className="profile-user-details">
                    <div className="profile-user-details-label">Username&nbsp;<i class="fas fa-user"></i></div>
                    <div className="profile-user-details-value">
                      {reqUser.username}
                    </div>
                  </div>
                  <div className="profile-user-details">
                    <div className="profile-user-details-label">Email&nbsp;<i class="fas fa-envelope"></i></div>
                    <div className="profile-user-details-value">
                      {reqUser.email}
                    </div>
                  </div>
                  <div className="profile-user-details">
                    <div className="profile-user-details-label">College&nbsp;<i class="fas fa-university"></i></div>
                    <div className="profile-user-details-value">
                      {reqUser.collegename}
                    </div>
                  </div>
                  <div className="profile-user-details">
                    <div className="profile-user-details-label">
                      Codeforces&nbsp;<span class="iconify" data-icon="simple-icons:codeforces"></span>
                    </div>
                    <div className="profile-user-details-value">
                      {reqUser.cfhandle}
                    </div>
                  </div>
                  {/* <br></br> */}
                  <div className="profile-user-details">
                    <div className="profile-user-details-label">
                      Codechef&nbsp;<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor"
                        class="bi bi-badge-cc-fill" viewBox="0 0 16 16">
                        <path
                          d="M2 2a2 2 0 0 0-2 2v8a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V4a2 2 0 0 0-2-2H2zm3.027 4.002c-.83 0-1.319.642-1.319 1.753v.743c0 1.107.48 1.727 1.319 1.727.69 0 1.138-.435 1.186-1.05H7.36v.114c-.057 1.147-1.028 1.938-2.342 1.938-1.613 0-2.518-1.028-2.518-2.729v-.747C2.5 6.051 3.414 5 5.018 5c1.318 0 2.29.813 2.342 2v.11H6.213c-.048-.638-.505-1.108-1.186-1.108zm6.14 0c-.831 0-1.319.642-1.319 1.753v.743c0 1.107.48 1.727 1.318 1.727.69 0 1.139-.435 1.187-1.05H13.5v.114c-.057 1.147-1.028 1.938-2.342 1.938-1.613 0-2.518-1.028-2.518-2.729v-.747c0-1.7.914-2.751 2.518-2.751 1.318 0 2.29.813 2.342 2v.11h-1.147c-.048-.638-.505-1.108-1.187-1.108z" />
                      </svg>
                    </div>
                    <div className="profile-user-details-value">{reqUser.cchandle}</div>
                  </div>
                </div>
              </div>

              <div className="tabs-wrapper profile-tabs">
                <ul className="nav nav-tabs">
                  <li
                    className={
                      toogleState===1? "tabs tabs-active me-1":"tabs me-1"
                    }
                    onClick={() => toogleTab(1)}
                  >
                    <a className="profile-a" data-toggle="tab">Posts</a>
                  </li>
                  <li
                    className={
                      toogleState===2? "tabs tabs-active ms-1":"tabs ms-1"
                    }
                    onClick={() => toogleTab(2)}
                  >
                    <a className="profile-a" data-toggle="tab">Friends</a>
                  </li>
                </ul>
                <hr></hr>
                <div
                  className={
                    toogleState===1? "content active-content":"content"
                  }
                >
                  {
                    posts.map((post) => {
                      return (
                        <div className="card1 my-3">
                          <div className="image-data">
                            <a href={"/posts/"+post._id} style={{ textDecorationStyle: "none" }}><Image className="background-image" src={post.images.length? (post.images[0].url):"https://ebsedu.org/wp-content/uploads/2020/06/AI-CAREER.jpg"} /></a>
                            <div className="user-details">
                              <a href="#" className="author">
                                <i className="fas fa-user"></i>{reqUser.displayname}
                              </a>
                              <span className="profile-date">
                                <i className="fas fa-calendar-day"></i>Jan 18,2021
                              </span>
                            </div>
                          </div>
                          <div className="post-data">
                            <h3 className="profile-h3 profile-title"><a href={"/posts/"+post._id} style={myStyle}>{post.title}</a></h3 >
                            <p className="description">
                              {post.description}
                            </p>
                            <div className="profile-cta">
                              <a href={"/posts/"+post._id}>Read more</a>
                            </div>
                          </div>
                        </div>
                      )
                    })
                  }
                  {
                    (resultPerPage<reqUser.posts.length)? (<div className="paginationBox">
                      <Pagination
                        activePage={currentPage}
                        itemsCountPerPage={resultPerPage}
                        totalItemsCount={reqUser.posts.length}
                        onChange={setCurrentPageNo}
                        nextPageText="Next"
                        prevPageText="Prev"
                        firstPageText="1st"
                        lastPageText="last"
                        itemClass="page-item"
                        linkClass="page-link"
                        activeClass="pageItemActive"
                        activeLinkClass="pageLinkActive"
                        pageRangeDisplayed={3}
                      ></Pagination>
                    </div>):(<></>)
                  }
                </div>
                <div
                  className={
                    toogleState===2? "content active-content":"content"
                  }
                >
                  <ul className="widget-users row m-3">
                    {
                      reqUser.friends.map((friend) => {
                        return (
                          <li className="col-md-6">
                            <div className="img">
                              <img
                                src={friend.avatar}
                                className="img-fluid"
                                alt=""
                              />
                            </div>
                            <div className="details">
                              <div className="name">
                                <a className="profile-a" href={`/users/${friend._id}`}>{friend.displayname} </a>
                              </div>
                              <div className="time">
                                <i class="fas fa-university mx-2"></i>
                                {friend.collegename}
                              </div>
                            </div>
                          </li>
                        )
                      })
                    }
                  </ul>
                  <br />
                  {
                    (resultPerPage<reqUser.friends.length)? (<div className="paginationBox">
                      <Pagination
                        activePage={currentPage}
                        itemsCountPerPage={resultPerPage}
                        totalItemsCount={reqUser.posts.length}
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
            </div>
          </div>
        </div>
      </div>
    </Fragment>
  );
};

export default Profile;
