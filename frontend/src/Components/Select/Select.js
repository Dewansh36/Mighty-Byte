import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useEffect, useState } from 'react';
import { Container, Row, Col } from 'react-bootstrap'
import Styles from '../../Public/css/SelectPage.module.css'
import SelectPageImage from '../../Public/image/SelectPageImage.png'
import Loading from '../loading';
import Navbar from '../navbar/navbar';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useNavigate } from 'react-router-dom';

function Select() {

    const [loading, setLoading]=useState(true);
    const [curUser, setUser]=useState({});

    const navigate=useNavigate();

    const notify=(message, type) => toast(`${message}`, { type: type });

    useEffect(() => {
        axios.get('https://bit-dev22.herokuapp.com/getUser', { withCredentials: true })
            .then((response) => {
                const { error, success, user }=response.data;
                console.log(response.data);
                if (!user) {
                    notify(error, "error");
                    navigate('/login');
                }
                else if (error!=undefined) {
                    notify(error, "error");
                    setLoading(false);
                }
                else {
                    notify("Welcome!", "success");
                    setUser(user);
                    setLoading(false);
                }
            })

    }, [])
    if (loading==true) {
        return (
            <Loading />
        )
    }
    return (
        <div>
            <Navbar user={curUser} />
            <ToastContainer position='top-center' />
            <div className={Styles.main}>
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
            </div>
        </div>
    )
}

export default Select