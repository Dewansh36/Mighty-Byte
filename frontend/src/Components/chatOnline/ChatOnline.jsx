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
      const res=await axios.get(`https://bit-dev22.herokuapp.com/user/${currentId}/friends`);
      // console.log(res.data.curuser);
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
      const res=await axios.get(
        `https://bit-dev22.herokuapp.com/api/conversations/find/${currentId}/${user._id}`
      );
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