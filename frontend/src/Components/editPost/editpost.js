import React, { useReducer } from 'react';
import { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import axios from 'axios';
import '../../Public/css/registration.css'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Loading from '../loading'
import { useNavigate, useParams } from 'react-router-dom';
import useGetUser from '../../Hooks/useGetUser';

const initialState={
    title: '',
    description: '',
    techStack: '',
    images: [],
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
                // console.log(action.payload);
                return {
                    ...state,
                    images: action.payload,
                }
            }
    }
}

const Register=() => {
    const [pos, setPos]=useState(0);
    const { id }=useParams();
    const [loading, setLoading]=useState(true);
    const [curUser]=useGetUser({});
    const [state, dispatch]=useReducer(reducer, initialState);
    const [remImage, setremImage]=useState([]);
    const [extraimg, setextraimg]=useState([]);
    const navigate=useNavigate();

    const notify=(message, type) => toast(`${message}`, { type: type });

    useEffect(() => {
        if (curUser.posts!=undefined) {
            let flag=false;
            for (let temp of curUser.posts) {
                if (temp._id==id) {
                    flag=true;
                    break;
                }
            }
            if (flag==false) {
                notify('Not Autherized', 'error');
                navigate(`/posts/${id}`);
                return;
            }
            axios.get(`/api/posts/${id}`, {
                withCredentials: true
            })
                .then((response) => {
                    let { success, error, post }=response.data;
                    if (error) {
                        notify('error', error.message);
                        setLoading(false);
                    }
                    else {
                        dispatch({ type: 'title', payload: post.title });
                        dispatch({ type: 'images', payload: post.images });
                        dispatch({ type: 'techStack', payload: post.techStack });
                        dispatch({ type: 'description', payload: post.description });
                        console.log("Post:  ", post);
                        setLoading(false);
                    }
                })
                .catch((err) => {
                    notify('error', err.message);
                    setLoading(false);
                })
        }
    }, [curUser]);
    const nextBtn=() => {
        console.log('Console!');
        const pages=document.querySelectorAll('.page');
        const bar=document.querySelectorAll('.prog');
        if (pos<pages.length-1) {
            pages[pos].classList.add('hide');
            pages[pos+1].classList.remove('hide');
            bar[pos+1].classList.add('active');
            setPos(pos+1);

        }

    }
    const prevBtn=() => {
        const pages=document.querySelectorAll('.page');
        const bar=document.querySelectorAll('.prog');
        console.log(bar);
        if (pos>0) {
            pages[pos].classList.add('hide');
            pages[pos-1].classList.remove('hide');
            bar[pos].classList.remove('active');
            setPos(pos-1);
        }
    }
    const submitHandler=(e) => {
        e.preventDefault();
        setLoading(true);
        console.log(state, extraimg, remImage);
        let postData=new FormData();
        for (let keys of Object.keys(extraimg)) {
            postData.append("images", extraimg[keys]);
        }
        postData.append("title", state.title);
        postData.append("description", state.description);
        postData.append("techStack", state.techStack);
        postData.append("remove", []);
        for (let rem of remImage) {
            postData.append("remove", rem);
        }
        // console.log(state.images[0]);
        console.log("postdata:  ", postData);
        // setLoading(true);
        axios.put(`/api/posts/${id}`, postData, {
            withCredentials: true
        })
            .then((response) => {
                let { success, error, post }=response.data;
                if (error) {
                    notify(error.message, 'error');
                    console.log(error);
                    setLoading(false);
                    navigate(`/posts/${id}/edit`);
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
                navigate(`/posts/${id}/edit`);
                setLoading(false);
            })
    }
    const imagemod=(e) => {
        let curid=e.target.value;
        if (remImage.includes(curid)==true) {
            let temp=remImage;
            temp=temp.filter((id) => {
                return (id!=curid);
            })
            // console.log("removed: ", temp);
            setremImage(temp);
        }
        else {
            let temp=remImage;
            temp.push(curid);
            setremImage(temp);
        }
    }
    if (loading==true) {
        return (
            <Loading />
        )
    }
    return (
        <div>
            <ToastContainer position='top-center' />
            <form action="/register" id="msform" method="post" onSubmit={submitHandler}>
                <ul className='m-3' id="progressbar">
                    <li className="prog active">Edit Post Info</li>
                    <li className="prog">Edit Images</li>
                </ul>
                <fieldset className="page">
                    <div>
                        <label>Post Title:</label>
                        <input placeholder="Post-Name" value={state.title} onChange={(e) => { dispatch({ type: "title", payload: e.target.value }) }} required />
                    </div>
                    <div className="Postapp-form-group message">
                        <label>Post Description:</label>
                        <textarea placeholder="Post-Description" value={state.description} onChange={(e) => { dispatch({ type: "description", payload: e.target.value }) }} />
                    </div>
                    <div className="Postapp-form-group ">
                        <label>Post Tech Stack:</label>
                        <input placeholder="Tech-Stack" value={state.techStack} onChange={(e) => { dispatch({ type: "techStack", payload: e.target.value }) }} />
                    </div>
                    <div>
                        <label>Upload more Images:</label>
                        <input type="file" multiple onChange={(e) => { setextraimg(e.target.files) }} />
                    </div>
                    <input type="button" name="next" className="next action-button" value="Next" onClick={nextBtn} />
                </fieldset>
                <fieldset className="page hide">
                    <div className='row'>
                        {

                            state.images.map((image) => {
                                return (
                                    <div className="col-4">
                                        <div className="form-check-inline">
                                            <label for={"image-"+image._id} >Delete?</label>
                                            <input type="checkbox" id={"image-"+image._id} name="deleteImages[]" value={image._id} onChange={imagemod} />
                                        </div>
                                        <img src={image.url}
                                            alt="<%= product.images[index].public_id %>"
                                            className="img-thumbnail" />
                                    </div>
                                )
                            })
                        }
                    </div>
                    <input type="button" name="previous" className="previous action-button" value="Previous" onClick={prevBtn} />
                    <input type="submit" name="submit" className="submit action-button" value="Submit" />
                </fieldset>

            </form>
        </div>
    )
}

export default Register