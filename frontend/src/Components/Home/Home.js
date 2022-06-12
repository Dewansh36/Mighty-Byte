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
    <div className='homebody'>
      <div className='d-flex'>
        <a href='/login' className='ms-auto m-3'><button type="button" class="btn btn-outline-dark">Login</button></a>
        <a href='/register' className='m-3'><button type="button" class="btn btn-outline-dark">Register</button></a>
      </div>
      <div className="full-screen">
        {/* <Header /> */}
        <div>
          <h1 className='homeh1'>Landing Page</h1>
          <br />
          {/* <a className="button-line" href="#!">More</a> */}
        </div>
      </div>
    </div>
  );
}

export default App;
