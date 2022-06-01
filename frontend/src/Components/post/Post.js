import React from 'react';
import { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../../Public/css/post.css'

function Post() {
  return <div>
  <div className="PostBody">
  <div className="PostBackground">
    <div className="Postcontainer">
      <div className="Postscreen">
        <div className="Postscreen-body">
          <div className="Postleft Postscreen-body-item">
            <div className="Postapp-title">
              <span>CREATE</span>
              <span>POST</span>
            </div>
            
            <br />
            <div className="Postgif" style={{paddingTop: "2rem"}}>
                <img src="https://i.pinimg.com/originals/e4/d3/95/e4d395849317f98f2a418c0e10182b0d.gif" alt="" 
                style={{width: "230px"}} />
            </div>
          </div>
          <div className="Postscreen-body-item">
            <form className="Postapp-form">
              <div className="Postapp-form-group">
                <input className="PostInput Postapp-form-control" placeholder="NAME" value="Parthiv Sarkar" />
              </div>
              <div className="Postapp-form-group">
                <input className="PostInput app-form-control" placeholder="Post-Name" required/>
              </div>
              <div className="Postmessage Postapp-form-group">
                <textarea className="Postapp-form-control" placeholder="Post-Description"/>
              </div>
              <div className="Postapp-form-group">
                <input className="PostInput Postapp-form-control" placeholder="Tech-Stack"/>
              </div>
              <div className="Postapp-form-group">
                  <input className="PostInput Postapp-form-control" type="file" multiple />
              </div>
              <div className="Postbuttons Postapp=form-group">
                <button className="PostButton Postapp-form-button">CANCEL</button>
                <button className="PostButton Postapp-form-button">SEND</button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  </div>
  </div> 
  </div>;
}

export default Post;

