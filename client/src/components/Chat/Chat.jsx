import { useState, useEffect } from "react";
import queryString from "query-string";
import io from "socket.io-client";
import "./Chat.css";
import ChatHeader from "../ChatHeader/ChatHeader";

let socket;
const ENDPOINT = "http://localhost:5000/";

const Chat = () => {
  const [name, setName] = useState("");
  const [room, setRoom] = useState("");
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
  }, [ENDPOINT, window.location.href]);

  useEffect(() => {
    socket.on("message", (newMessage) => {
      console.log(newMessage);
      updateMessages((messages) => [...messages, newMessage]);
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
        <form className="form">
          <input
            className="input"
            type="text"
            placeholder="Type a message..."
            value={message}
            onChange={({ target: { value } }) => setMessage(value)}
            onKeyPress={(event) =>
              event.key === "Enter" ? sendMessage(event) : null
            }
          />
          <button className="sendButton" onClick={(e) => sendMessage(e)}>
            Send
          </button>
        </form>
        {/* <input
          type="text"
          value={message}
          onChange={(event) => {
            setMessage(event.target.value);
          }}
          onKeyPress={(event) => {
            event.key === "Enter" && sendMessage(event);
          }}
        />  */}
      </div>
    </div>
  );
};

export default Chat;
