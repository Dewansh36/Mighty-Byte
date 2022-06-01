import ParticleBackground from './Particlebackground'
import Header from "./Header";
import 'bootstrap/dist/css/bootstrap.min.css';
import '../../Public/css/home.css'
import Home1 from '../../Public/image/home1.jpg'
import Home2 from '../../Public/image/home2.png'
import Home3 from '../../Public/image/home3.jpg'

import { Grid, Row, Col, Container } from "react-bootstrap"
function App() {
  return (
    <div className="App">

      <Header />

      <h1 className="home-title">BITDEV</h1>
      <ParticleBackground></ParticleBackground>

      <section className="home-text-center">
        <Container>
          <Row>
            <Col lg={4} className="HomeFix">
              <img alt="" className="home-m-b-20" width="150" height="100" src={Home1}></img>
              <h6 className="home-block-title p-b-5">Launch Design<i className="pg-arrow_right"></i></h6>
              <p className="home-m-b-30">Awesome project for sharing website to showoff your coding skills and get to know about
                current project trends</p>
            </Col>

            <Col lg={4} className="HomeFix">
              <img alt="" className="home-m-b-20" width="150" height="100" src={Home2}></img>
              <h6 className="home-block-title p-b-5">Easy Interaction<i className="pg-arrow_right"></i></h6>
              <p className="home-m-b-30">Add your college mates in your friend lists and interact with them easily</p>
            </Col>

            <Col lg={4} className="HomeFix">
              <img alt="" className="home-m-b-20" width="150" height="100" src={Home3}></img>
              <h6 className="home-block-title p-b-5 Homecpfix">Competitive Programming<i className="pg-arrow_right"></i></h6>
              <p className="home-m-b-30">Competitive programming made easier with better interactions and uptodate competition
                updates</p>
            </Col>
          </Row>
        </Container>

      </section>
    </div>
  );
}

export default App;
