import Header from "./Header";
import 'bootstrap/dist/css/bootstrap.min.css';
import '../../Public/css/home.css'
import Home1 from '../../Public/image/home1.jpg'
import Home2 from '../../Public/image/home2.png'
import Home3 from '../../Public/image/home3.jpg'
import { Grid, Row, Col, Container } from "react-bootstrap"
import ParticleBackground from "./Particlebackground";
function App() {
  return (
    <div className="homebody">
      <ParticleBackground></ParticleBackground>
      <div className='d-flex h-heading'>
        {/* <img className="homelogo" src="https://res.cloudinary.com/dewansh/image/upload/v1655988645/BitDev/d2-removebg-preview_erqroa.png"></img> */}
        <a href='/login' className='ms-auto m-3'><button type="button" class="btn btn-outline-dark">Login</button></a>
        <a href='/register' className='m-3'><button type="button" class="btn btn-outline-dark">Register</button></a>
      </div>
      <div className="full-screen">
        <div>
          <h1 className='homeh1'>Mighty Byte</h1>
          <br />
        </div>
      </div>

    </div>

  );
}

export default App;
