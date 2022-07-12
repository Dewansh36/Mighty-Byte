import { ToastContainer, toast } from 'react-toastify';
import axios from 'axios';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';


function useGetUser(intialState, id=undefined) {
    const [curUser, setUser]=useState(intialState);
    const navigate=useNavigate();

    const notify=(message, type) => toast(`${message}`, { type: type });

    useEffect(() => {
        if (id==undefined) {
            axios.get(`${process.env.REACT_APP_Backend_url}/getUser`, { withCredentials: true })
                .then((response) => {
                    // console.log("Getuser: ", response);
                    const { error, user }=response.data;
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
                })
        }
        else {
            axios.get(`${process.env.REACT_APP_Backend_url}/user/${id}`, { withCredentials: true })
                .then((response) => {
                    const { error, user }=response.data;
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
                })
        }

    }, [])
    return [curUser];
}

export default useGetUser;
