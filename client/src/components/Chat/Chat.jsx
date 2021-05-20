import { useState, useEffect } from "react";
import queryString from "query-string";
import io from "socket.io-client";

let socket;

const Chat = () => {
  const [name, setName] = useState("");
  const [room, setRoom] = useState("");
  const ENDPOINT = "http://localhost:5000/";

  const getNameRoom = () => {
    const nameRoomData = window.location.href.split("?")[1];
    const data = queryString.parse(nameRoomData);
    setName(data.name);
    setRoom(data.room);
  };

  useEffect(() => {
    getNameRoom();
    socket = io(ENDPOINT);
    console.log(socket);
  }, []);

  return (
    <div>
      <h1>{name}</h1>
      <h1>{room}</h1>
    </div>
  );
};

export default Chat;
