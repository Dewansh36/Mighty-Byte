import axios from "axios"
import { ToastContainer, toast } from 'react-toastify';
import {ALL_POSTS_FAIL,ALL_POSTS_REQUEST,ALL_POSTS_SUCCESS,CLEAR_ERRORS} from '../constants/postConstant'

export const getPost = () => async(dispatch)=>{
    try {
        dispatch({
            type:ALL_POSTS_REQUEST
        })
        const {data} = await axios.get("http://localhost:4000/posts")
        console.log(data);
        dispatch({
            type: ALL_POSTS_SUCCESS,
            payload: data
        })
    } catch (error) {
        dispatch({
            type: ALL_POSTS_FAIL,
            payload:error.response.data.message
        })
    }
}
export function regisPost(postData){
    const notify=(message, type) => toast(`${message}`, { type: type });
    const config = {headers: {"Content-Type":"multipart/form-data"},withCredentials: true}
    return (dispatch)=>{
        return axios.post("http://localhost:4000/posts/new",postData,{withCredentials: true}).then((res)=>{
            console.log(res.data)
            notify('Post successfully created')
        }).catch((err)=>{
            console.log(err)
            notify(err.message);
        })
    }
    
}
export const clearError = () => async(dispatch)=>{
    dispatch({type: CLEAR_ERRORS})
}

