import { useState, useEffect } from "react";
import queryString from "query-string";
import io from "socket.io-client";
import "./Chat.css";
import ChatHeader from "../ChatHeader/ChatHeader";
import Messages from "../Messages/Messages";
import TextContainer from "../TextContainer/TextContainer";

let socket;
// const ENDPOINT = "http://localhost:5000/";
const ENDPOINT = "https://chat-ly.herokuapp.com/";

const Chat = () => {
  const [name, setName] = useState("");
  const [room, setRoom] = useState("");
  const [users, setUsers] = useState("");
  const [messages, updateMessages] = useState([]);
  const [message, setMessage] = useState("");

  useEffect(() => {
    const nameRoomData = window.location.href.split("?")[1];
    const data = queryString.parse(nameRoomData);
    const newname = data.name;
    const newRoom = data.room;
    setName(data.name);
    setRoom(data.room);

    socket = io(ENDPOINT);

    socket.emit("join", { name: newname, room: newRoom }, (error) => {
      if (error) {
        alert(error);
      }
    });
  }, []);

  useEffect(() => {
    socket.on("message", (newMessage) => {
      console.log(newMessage);
      updateMessages((messages) => [...messages, newMessage]);
    });

    socket.on("roomData", ({ users }) => {
      setUsers(users);
    });
  }, []);

  const sendMessage = (event) => {
    event.preventDefault();

    if (message) {
      socket.emit("sendMessage", message, () => setMessage(""));
    }
  };

  // console.log(messages);

  return (
    <div className="outerContainer">
      <div className="container">
        <ChatHeader room={room} />
        <Messages messages={messages} name={name} />
        <form className="form">
          <input
            className="input"
            type="text"
            placeholder="Type a message..."
            value={message}
            onChange={(event) => {
              setMessage(event.target.value);
            }}
            onKeyPress={(event) => {
              event.key === "Enter" && sendMessage(event);
            }}
          />
          <button
            className="sendButton"
            onClick={(event) => {
              sendMessage(event);
            }}
          >
            Send
          </button>
        </form>
      </div>
      <TextContainer users={users} />
    </div>
  );
};

export default Chat;
