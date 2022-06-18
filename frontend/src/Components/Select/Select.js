import axios from 'axios';
// import 'bootstrap/dist/css/bootstrap.min.css';
import { useEffect, useState } from 'react';
// import { Container, Row, Col } from 'react-bootstrap'
import  '../../Public/css/SelectPage.css'
import SelectPageImage from '../../Public/image/SelectPageImage.png'
import Loading from '../loading';
import Navbar from '../navbar/navbar';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useNavigate } from 'react-router-dom';
import useGetUser from '../../Hooks/useGetUser';
import image from '../Select/img2.gif'
import GodBtn from '../GodBtn';

function Select() {
    const[flip,setFlip]= useState(false);
    const[flip1,setFlip1]=useState(false);
    const[flip2,setFlip2]=useState(false);

    const cardflip=()=>{
        setFlip(flip=>!flip)

    }
    const cardflip1=()=>{
        setFlip1(flip1=>!flip1)
    }
    const cardflip2=()=>{
        setFlip2(flip2=>!flip2)

    }
    const [loading, setLoading]=useState(true);
    const [curUser, setUser]=useGetUser({});
    const navigate=useNavigate();

    const notify=(message, type) => toast(`${message}`, { type: type });

    useEffect(() => {
        // console.log("User: ", curUser.displayname);
        if (curUser!=undefined&&curUser.displayname!=undefined) {
            setLoading(false);
        }
    }, [curUser])


    if (loading==true) {
        return (
            <Loading />
        )
    }
    return (
        <div >
            <Navbar user={curUser} />
            <ToastContainer position='top-center' />
           
            <div className='s-title-head'>
                <h1 className='s-heading'>Today is a great day to ....Explore</h1>
            </div>
            <div className='container'>
            <div className='s-c1 row justify-content-around align-items-center' >

                <div className={flip ? 's-element-card open col-2':'s-element-card col-2'} onClick={cardflip}>
                    <div className="front-facing">
                        <h1 className="abr">CP</h1>
                        <p className="title">Enthusiast</p>
                        <span className="upper">C++</span>
                        <span className="below">Java</span>
                    </div>
                    <div className="back-facing">
                        <p className='s-text'>Get all the data about CP and get recommended problems based on your rating .</p>
                        <p><a href="/cp" ><GodBtn text="Explore" pd="3rem"></GodBtn></a></p>
                    </div>
                </div>
                <div className={flip1 ? 's-element-card open col-2':'s-element-card col-2'} onClick={cardflip1}>
                    <div className="front-facing">
                        <h1 className="abr">For</h1>
                        <p className="title">Developers</p>
                        <span className="upper">JavaScript</span>
                        <span className="below">Python</span>
                    </div>
                    <div className="back-facing">
                        <p className='s-text'>Upload projects and check out others projects, make friends working in same domain.</p>
                        <p><a href="/posts" ><GodBtn text="Explore" pd="3rem"></GodBtn></a></p>
                    </div>
                </div>
                
                <div className={flip2 ? 's-element-card open col-2':'s-element-card col-2'} onClick={cardflip2}>
                    <div className="front-facing">
                        <h1 className="abr">Dev</h1>
                        <p className="title">Flash</p>
                        <span className="upper">Google</span>
                        <span className="below">Apple</span>
                    </div>
                    <div className="back-facing">
                        <p className='s-text'>Whether it is the invention of new Gadget or updation of old , you can know everything.</p>
                        <p><a href="/news" ><GodBtn text="Explore" pd="3rem"></GodBtn></a></p>
                    </div>
                </div>
                <div className='s-image col-2'>
                    <img src={image} alt=""  width={"400px"}/>
                </div>
                </div>
            </div>
            
        </div>
    )
}

export default Select