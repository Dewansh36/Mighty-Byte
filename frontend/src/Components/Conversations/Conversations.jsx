import axios from "axios";
import { Fragment, useEffect, useState } from "react";
import "../../Public/css/conversations.css";
import Loading from "../loading";
import SelectPageImage from "../../Public/image/SelectPageImage.png"

export default function Conversation({ conversation, currentUser }) {
  const [user, setUser]=useState(null);
  const [loading, setloading]=useState(true);
  const PF=process.env.REACT_APP_PUBLIC_FOLDER;

  useEffect(() => {
    let friendId=conversation.members.find((m) => m!==currentUser._id);

    const getUser=async () => {
      try {
        const res=await axios(`https://bit-dev22.herokuapp.com/user?userId=${friendId}`);
        console.log(res);
        setUser(res.data);
        setloading(false);
      } catch (err) {
        console.log(err);
      }
    };
    getUser();
  }, [currentUser, conversation]);
  if (loading==true) {
    return (
      <Loading />
    )
  }
  return (
    <Fragment>
      <Fragment>
        <div className="conversation">
          <img
            className="conversationImg"
            src={user?.avatar? user.avatar:SelectPageImage}
            alt=""
          />
          <span className="conversationName">{user?.displayname}</span>
        </div>
      </Fragment>
    </Fragment>
  );
}