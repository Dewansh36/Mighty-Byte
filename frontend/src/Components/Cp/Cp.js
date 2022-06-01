import React, { useState, useEffect } from 'react'
import Loading from '../loading'
import ccImage from '../../Public/image/cc.png'
import cfImage from '../../Public/image/cf.jpg'
import 'bootstrap/dist/css/bootstrap.min.css';
import Styles from '../../Public/css/CP.module.css'
import { Col, Container, Row } from 'react-bootstrap';
import axios from 'axios';
import Navbar from '../navbar/navbar'
import useGetUser from '../../Hooks/useGetUser';

function secondsToDhms(seconds) {
    seconds=Number(seconds);
    var d=Math.floor(seconds/(3600*24));
    var h=Math.floor(seconds%(3600*24)/3600);
    var m=Math.floor(seconds%3600/60);
    var s=Math.floor(seconds%60);

    var dDisplay=d>0? d+("d-"):"";
    var hDisplay=h>0? h+("h-"):"";
    var mDisplay=m>0? m+("m-"):"";
    var sDisplay=s>0? s+("s"):"";
    return dDisplay+hDisplay+mDisplay+sDisplay;
}
const callApi=async (url) => {
    const response=await axios.get(url);
    return response.data;
}

function Cp() {
    let rpRating=-1;
    const [curUser]=useGetUser({});
    const [cfdata, setcfData]=useState({});
    // const [ccdata, setccData]=useState({});
    const [Upcomingdata, setUpcomingData]=useState({});
    const [Problemdata, setProblemData]=useState({});
    const [loading, setLoading]=useState(true);
    const [error, setError]=useState('');
    let flag=false;
    // const ccname="dewansh_36";
    let cfname="Dewansh05";
    // const ccurl="https://competitive-programming-score.herokuapp.com/api/codechef/"+ccname;
    let cfurl="https://competitive-programming-score.herokuapp.com/api/codeforces/"+cfname;
    let cn1, cn2, cn3, cl1, cl2, cl3, ct1, ct2, ct3;
    let pn1, pn2, pn3, pl1, pl2, pl3;
    useEffect(() => {
        if (curUser!=undefined) {
            cfname=curUser.cfhandle;
            cfurl="https://competitive-programming-score.herokuapp.com/api/codeforces/"+cfname;
            flag=true;
        }
    }, [curUser]);
    // useEffect(async () => {
    //     const response=await axios.get(cfurl);
    //     setcfData(response.data);
    //     rpRating=cfdata.rating;
    //     console.log(response.data);
    // }, [])
    // console.log(rpRating);

    // useEffect(async () => {
    //     const response=await axios.get('https://competitive-programming-score.herokuapp.com/api/codechef/dewansh_36');
    //     setccData(response.data);
    //     console.log(response.data);
    // }, [])
    // useEffect(async () => {
    //     const response=await axios.get('https://codeforces.com/api/contest.list?gym=false');
    //     setUpcomingData(response.data);
    //     console.log(response.data);
    // }, [])

    useEffect(async () => {
        Promise.all([
            callApi(cfurl),
            // callApi(ccurl),
            callApi('https://codeforces.com/api/contest.list?gym=false'),
            callApi('https://codeforces.com/api/problemset.problems'),
        ]).then((values) => {
            console.log(values);
            setcfData(values[0]);
            // setccData(values[1]);
            setProblemData(values[2]);
            setUpcomingData(values[1]);
            rpRating=cfdata.rating;
            setLoading(false);
            console.log(rpRating);
        })
            .catch((err) => {
                console.log(err);
                setError('Something Went Wrong!');
                setLoading(false);
            })
    }, [curUser]);
    useEffect(() => {
        if (Upcomingdata.result!=undefined&&rpRating!=-1) {
            console.log(Upcomingdata);
            let x=0;
            while (Upcomingdata.result[x].phase=="BEFORE")
                x++;
            console.log(x);
            x--;
            cn1=Upcomingdata.result[x].name;
            cl1="https://codeforces.com/contests/"+Upcomingdata.result[x].id;
            let s=-1*(Upcomingdata.result[x].relativeTimeSeconds);
            ct1="(starts in "+secondsToDhms(s)+")";
            x--;
            if (x>=0) {
                cn2=Upcomingdata.result[x].name;
                cl2="https://codeforces.com/contests/"+Upcomingdata.result[x].id;
                s=-1*(Upcomingdata.result[x].relativeTimeSeconds);
                ct2="(starts in "+secondsToDhms(s)+")";
                x--;
            }
            else {
                cn2="";
                cl2="";
                ct2="";
            }
            if (x>=0) {
                cn3=Upcomingdata.result[x].name;
                cl3="https://codeforces.com/contests/"+Upcomingdata.result[x].id;
                s=-1*(Upcomingdata.result[x].relativeTimeSeconds);
                ct3="(starts in "+secondsToDhms(s)+")";
                x--;
            }
            else {
                cn3="";
                cl3="";
                ct3="";
            }
            if (Problemdata!={}) {
                if (rpRating<=800)
                    rpRating=800;
                else if (rpRating>800&&rpRating<=1000)
                    rpRating=1000;
                else if (rpRating>1000&&rpRating<=1200)
                    rpRating=1200;
                else if (rpRating>1200&&rpRating<=1400)
                    rpRating=1400;
                else if (rpRating>1400&&rpRating<=1600)
                    rpRating=1600;
                else if (rpRating>1600&&rpRating<=1800)
                    rpRating=1800;
                else if (rpRating>1800&&rpRating<=2000)
                    rpRating=2000;
                else if (rpRating>2000&&rpRating<=2200)
                    rpRating=2200;
                else if (rpRating>2200&&rpRating<=2400)
                    rpRating=2400;
                else if (rpRating>2400&&rpRating<=2600)
                    rpRating=2600;
                else if (rpRating>2600&&rpRating<=2800)
                    rpRating=2800;
                else if (rpRating>2800&&rpRating<=3000)
                    rpRating=3000;
                else if (rpRating>3000&&rpRating<=3200)
                    rpRating=3200;
                else
                    rpRating=3400;
                let y=0;
                console.log(rpRating);
                for (let problem of Problemdata.result.problems) {
                    if (problem&&problem.rating&&problem.rating==rpRating) {
                        let u="https://codeforces.com/problemset/problem/"+problem.contestId+"/"+problem.index;
                        if (y==0) {
                            pn1=problem.name;
                            pl1=u;
                        }
                        else if (y==1) {
                            pn2=problem.name;
                            pl2=u;
                        }
                        else {
                            pn3=problem.name;
                            pl3=u;
                        }
                        y++;
                    }
                    if (y==3)
                        break;
                }
            }
        }
    }, [curUser, flag, rpRating])

    // const [Problemdata, setProblemData]=useState({});
    // useEffect(async () => {
    //     const response=await axios.get('https://codeforces.com/api/problemset.problems');
    //     setProblemData(response.data);
    //     console.log(response.data);
    // }, [])

    if (loading==true) {
        return (
            <Loading />

        )
    }
    else if (error=='') {
        return (
            <div className={Styles.CPbody}>
                <Navbar user={curUser} />
                <section id={Styles.stats}>
                    <Container>
                        <Row>
                            <Col lg={6} md={12} className={Styles.stats}>
                                <h1 className={Styles.heading}>CP Stats</h1>
                                <div className={Styles.cf}>
                                    <img className={Styles.logo_pic} src={cfImage} alt="codeforces" />
                                    <p>
                                        <h2>Codeforces</h2>
                                        <h3 className={Styles.resFix}> {cfname} <span id="cfhandle"></span></h3>
                                        <h3 className={Styles.resFix}>Current rating - {cfdata.rating} <span id="cfrating"></span> </h3>
                                        <h3 className={Styles.resFix}>Current rank -{cfdata.rank} <span id="cfcrank"></span></h3>
                                        <h3 className={Styles.resFix}>Max rating - {cfdata["max rating"]} <span id="cfmrating"></span></h3>
                                    </p>
                                </div>
                                {/* <img className={Styles.logo_pic} src={ccImage} alt="codechef" />
                                <p>
                                    <h2>Codechef</h2>
                                    <h3 className={Styles.resFix}> {ccname} <span id="cchandle"></span></h3>
                                    <h3 className={Styles.resFix}>Current rating - {ccdata.rating} <span id="ccrating"></span></h3>
                                    <h3 className={Styles.resFix}>Current rank - {ccdata.stars} <span id="cccrank"></span></h3>
                                    <h3 className={Styles.resFix}>Max rating - {ccdata.highest_rating} <span id="ccmrating"></span></h3>
                                </p> */}
                            </Col>
                            <Col lg={6} md={12} className={Styles.leftBorder}>
                                <div className={Styles.bottomBorder}>
                                    <h1 className={Styles.heading2}>Upcoming Contests</h1>
                                    <a href={cl1} id="ac1" target="_blank"><h3 id="c1">{cn1}</h3></a>
                                    <h4 id="Time1" className={Styles.time}>{ct1}</h4>
                                    <a href={cl2} id="ac2" target="_blank"><h3 id="c2">{cn2}</h3></a>
                                    <h4 id="Time2" className={Styles.time}>{ct2}</h4>
                                    <a href={cl3} id="ac3" target="_blank"><h3 id="c3">{cn3}</h3></a>
                                    <h4 id="Time3" className={Styles.time}>{ct3}</h4>
                                </div>
                                <h1 className={Styles.heading3}>Recommended Problems</h1>
                                <a href={pl1} id="ap1" target="_blank"><h3 id="p1">{pn1}</h3></a>
                                <a href={pl2} id="ap2" target="_blank"><h3 id="p2">{pn2}</h3></a>
                                <a href={pl3} id="ap3" target="_blank"><h3 id="p3">{pn3}</h3></a>
                            </Col>
                        </Row>
                    </Container>
                </section>
            </div>
        )
    }
    else {
        return (
            <div>
                {error}
            </div>
        )
    }
}

export default Cp

