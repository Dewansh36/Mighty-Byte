import React from 'react'
import '../../css/vpost.css'
import image from "../../../src/calendar-solid.svg"
import image1 from "../../../src/thumbs-up-solid.svg"
import image2 from "../../../src/comments-solid.svg"
const Vpost = () => {

    var datetime = (e)=>{
        const month=["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"];
        var sdate=e;
        var date=new Date(sdate);
        var mon= month[date.getMonth()];
        var dt= date.getDate();
        var time= date.getHours()+":"+date.getMinutes();
        return dt+" "+mon+" "+time;
    }
  return (
    
    <div>
        <div className="c-card">
        <div className="carousel-wrapper p-3">
            
            <div className="carousel-container">
                
                <div className="carousel">
                    <div >
                        <img src="https://cdn.pixabay.com/photo/2015/04/23/22/00/tree-736885__480.jpg" alt="" width={"500px"}/>
                    </div>
                    <div >
                        <img src="https://www.industrialempathy.com/img/remote/ZiClJf-1920w.jpg" alt="" width={"500px"}/>
                    </div>
                    <div >
                        <img src="https://images.unsplash.com/photo-1525278070609-779c7adb7b71?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=60" alt=""width={"500px"} />
                    </div>
                </div>
            </div>
            <div >
                
                <div class="card-body">
                    <h5 className="card-title">Title</h5>
                    <p className="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
                </div>
                <ul class="list-group list-group-flush">
                    <li className="list-group-item">Author:</li>
                    <li className="list-group-item">Tech-Stack:</li>
                </ul>
                <div class="card-body d-flex justify-content-around">
                    <a href="#" className="card-link">
                        <img src={image} alt=""  width={"30em"}/>    
                    </a>
                    <input type="checkbox" id="cb1" />
                    <label for="cb1">Toggle me</label>
                </div>
            </div>
        </div>
        
        </div>
    </div>
  )
}

export default Vpost