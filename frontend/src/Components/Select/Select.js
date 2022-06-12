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

function Select() {
    const[flip,setFlip]= useState(false);
    const[flip1,setFlip1]=useState(false);
    const cardflip=()=>{
        setFlip(flip=>!flip)

    }
    const cardflip1=()=>{
        setFlip1(flip1=>!flip1)
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
        <div>
            <Navbar user={curUser} />
            <ToastContainer position='top-center' />
            {/* <div className={Styles.main}>
                <Container>
                    <Row>
                        <Col lg={6} md={12} className={Styles.separate}>
                            <h1 className={`${Styles.fix} ${Styles.SelectH1}`}>Today is a great day to CODE.</h1>
                            <div className={`${Styles.maincontainer} ${Styles.card1}`}>
                                <div className={Styles.thecard}>
                                    <div className={Styles.thefront}><div className={`${Styles.cardH1} ${Styles.SelectH1}`}>For Developers</div>
                                    </div>
                                    <div className={Styles.theback}><p className={Styles.SelectP}>Upload projects and check out others projects, make friends working in same domain.</p>
                                        <span className={Styles.SelectButton}><a href="#"></a></span>
                                    </div>
                                </div>
                            </div>
                            <div className={`${Styles.maincontainer} ${Styles.card2}`}>
                                <div className={Styles.thecard}>
                                    <div className={Styles.thefront}><div className={`${Styles.cardH1} ${Styles.SelectH1}`}>CP Enthusiasts</div>
                                    </div>
                                    <div className={Styles.theback}><p className={Styles.SelectP}>Get all the data about CP and get recommended problems based on your rating .</p>
                                        <span className={Styles.SelectButton}><a href="#"></a></span>
                                    </div>
                                </div>
                            </div>
                        </Col>
                        <Col lg={6} md={12}>
                            <img src={SelectPageImage} alt="iphone-mockup" className={Styles["title-img"]} />
                        </Col>
                    </Row>
                </Container>
            </div> */}
            <div >
                <h1 className='s-heading'>Today is a great day to ....Explore</h1>
            </div>
            <div className='s-c1'>

                <div className={flip ? 's-element-card open':'s-element-card'} onClick={cardflip}>
                    <div className="front-facing">
                        <h1 className="abr">CP</h1>
                        <p className="title">Enthusiast</p>
                        <span className="upper">C++</span>
                        <span className="below">Java</span>
                    </div>
                    <div className="back-facing">
                        <p className='s-text'>Get all the data about CP and get recommended problems based on your rating .</p>
                        <p><a className="btn" href="" target="_blank">Explore</a></p>
                    </div>
                </div>
                <div className={flip1 ? 's-element-card open':'s-element-card'} onClick={cardflip1}>
                    <div className="front-facing">
                        <h1 className="abr">For</h1>
                        <p className="title">Developers</p>
                        <span className="upper">JavaScript</span>
                        <span className="below">Python</span>
                    </div>
                    <div className="back-facing">
                        <p className='s-text'>Upload projects and check out others projects, make friends working in same domain.</p>
                        <p><a className="btn" href="" target="_blank">Explore</a></p>
                    </div>
                </div>
            </div>
            <div className='s-image'>
                <img src={image} alt="" />
            </div>
        </div>
    )
}

export default Select