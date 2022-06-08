import React, { useReducer } from 'react';
import { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../../Public/css/post.css'
import FormData from 'form-data';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useNavigate } from 'react-router-dom';
import Loading from '../loading';
import useGetUser from '../../Hooks/useGetUser';
const initialState={
  title: '',
  description: '',
  techStack: '',
  images: ''
}

const reducer=(state, action) => {
  let field=action.type;
  // console.log(state);
  switch (field) {
    case "title":
      {
        return {
          ...state,
          title: action.payload,
        }
      }
    case "description":
      {
        return {
          ...state,
          description: action.payload,

        }
      }
    case 'techStack':
      {
        return {
          ...state,
          techStack: action.payload,

        }
      }
    case 'images':
      {
        return {
          ...state,
          images: action.payload,
        }
      }
  }
}

function Post() {
  const navigate=useNavigate();

  const notify=(message, type) => toast(`${message}`, { type: type });

  const [state, dispatch]=useReducer(reducer, initialState);
  const [loading, setLoading]=useState(true);

  const [curUser, setUser]=useGetUser({});

  useEffect(() => {
    // console.log("User: ", curUser.displayname);
    if (curUser!=undefined&&curUser.displayname!=undefined) {
      setLoading(false);
    }
  }, [curUser])

  const submitHandler=async (e) => {
    e.preventDefault();

    let postData=new FormData();

    for (let keys of Object.keys(state.images)) {
      postData.append("images", state.images[keys]);
    }
    postData.append("title", state.title);
    postData.append("description", state.description);
    postData.append("techStack", state.techStack);
    // console.log(state.images[0]);
    console.log("postdata:  ", postData);
    setLoading(true);
    axios.post('http://localhost:4000/posts/new', postData, {
      withCredentials: true
    })
      .then((response) => {
        let { success, error, post }=response.data;
        if (error) {
          notify(error.message, 'error');
          console.log(error);
          setLoading(false);
          navigate('/createPost');
          return;
        }
        if (post!=undefined) {
          setLoading(false);
          console.log(post);
          navigate(`/posts/${post._id}`);
        }
      })
      .catch((err) => {
        notify(err.message, 'error');
        navigate('/createPost');
        setLoading(true);
      })

  }

  if (loading==true) {
    return (
      <Loading />
    )
  }
  return (
    <div>
      <div className="PostBackground">
        <div className="Postcontainer">
          <div className="Postscreen">
            {/* <div className="screen-header">
        <div className="screen-header-left">
          <div className="screen-header-button close"></div>
          <div className="screen-header-button maximize"></div>
          <div className="screen-header-button minimize"></div>
        </div>
        <div className="screen-header-right">
          <div className="screen-header-ellipsis"></div>
          <div className="screen-header-ellipsis"></div>
          <div className="screen-header-ellipsis"></div>
        </div>
      </div> */}
            <div className="Postscreen-body">
              <div className="Postscreen-body-item left">
                <div className="Postapp-title">
                  <span>CREATE</span>
                  <span>POST</span>
                </div>

                <br />
                <div className="Postgif" style={{ paddingTop: "2rem" }}>
                  <img src="https://i.pinimg.com/originals/e4/d3/95/e4d395849317f98f2a418c0e10182b0d.gif" alt=""
                    style={{ width: "230px" }} />
                </div>
              </div>
              <div className="Postscreen-body-item">
                <form className="Postapp-form" onSubmit={submitHandler}>
                  {/* <div className="app-form-group">
                    <input className="app-form-control" placeholder="NAME" value="Parthiv Sarkar" />
                  </div> */}
                  <div className="Postapp-form-group">
                    <input className="Postapp-form-control" placeholder="Post-Name" value={state.title} onChange={(e) => { dispatch({ type: "title", payload: e.target.value }) }} required />
                  </div>
                  <div className="Postapp-form-group message">
                    <textarea className="Postapp-form-control" placeholder="Post-Description" value={state.description} onChange={(e) => { dispatch({ type: "description", payload: e.target.value }) }} />
                  </div>
                  <div className="Postapp-form-group ">
                    <input className="Postapp-form-control" placeholder="Tech-Stack" value={state.techStack} onChange={(e) => { dispatch({ type: "techStack", payload: e.target.value }) }} />
                  </div>
                  <div className="Postapp-form-group">
                    <input className='Postapp-form-control' type="file" multiple onChange={(e) => { dispatch({ type: "images", payload: e.target.files }) }} />
                  </div>
                  <div className="Postapp-form-group buttons">
                    <button className="Postapp-form-button" id="canBtn">CANCEL</button>
                    <button className="Postapp-form-button" type='submit'>SEND</button>
                  </div>
                </form>
              </div>
            </div>
          </div>

        </div>
      </div>

    </div>
  );
}

export default Post;
