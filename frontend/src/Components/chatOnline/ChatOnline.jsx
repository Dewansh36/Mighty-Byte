import axios from "axios";
import { useEffect, useState } from "react";
import "./chatonline.css";
import SelectPageImage from "../../Public/image/SelectPageImage.png"

export default function ChatOnline({ onlineUsers, currentId, setCurrentChat }) {
  const [friends, setFriends]=useState([]);
  const [onlineFriends, setOnlineFriends]=useState([]);
  const PF=process.env.REACT_APP_PUBLIC_FOLDER;

  useEffect(() => {
    const getFriends=async () => {
      console.log("called")
      const res=await axios.get(`http://localhost:4000/user/${currentId}/friends`);
      console.log(res.data.curuser);
      setFriends(res.data.curuser.friends);
    };

    getFriends();
  }, [currentId]);

  useEffect(() => {
    setOnlineFriends(friends.filter((f) => onlineUsers.includes(f._id)));
  }, [friends, onlineUsers]);

  console.log(friends)

  const handleClick=async (user) => {
    try {
      console.log('CLicked!');
      const res=await axios.get(
        `http://localhost:4000/api/conversations/find/${currentId}/${user._id}`
      );
      console.log("Chat user data: ", res.data);
      setCurrentChat(res.data);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="chatOnline">
      {friends.map((o) => (
        <div className="chatOnlineFriend" onClick={() => handleClick(o)}>
          <div className="chatOnlineImgContainer">
            <img
              className="chatOnlineImg"
              src={o?.avatar? o.avatar:SelectPageImage}
              alt=""
            />
            <div className="chatOnlineBadge"></div>
          </div>
          <span className="chatOnlineName">{o?.displayname}</span>
        </div>
      ))}
    </div>
  );
}