import { ToastContainer, toast } from 'react-toastify';
import axios from 'axios';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';


function useGetUser(intialState, id=undefined) {
    const [curUser, setUser]=useState(intialState);
    const navigate=useNavigate();

    const notify=(message, type) => toast(`${message}`, { type: type });

    useEffect(async () => {
        if (id==undefined) {
            let response=(await axios.get(`/api/getUser`, { withCredentials: true })).data;
            const { error, user }=response;
            if (!user) {
                notify(error, "error");
                navigate('/login');
            }
            else if (error!=undefined) {
                notify(error, "error");
            }
            else {
                console.log('User Fetched!');

                console.log(user);
                setUser(user);
            }
        }
        else {
            let response=(await axios.get(`/api/user/${id}`, { withCredentials: true })).data;
            const { error, user }=response;
            if (!user) {
                notify(error, "error");
                navigate('/login');
            }
            else if (error!=undefined) {
                notify(error, "error");
            }
            else {
                console.log('User Fetched!');
                setUser(user);
            }
        }
    }, [])
    return [curUser];
}

export default useGetUser;
