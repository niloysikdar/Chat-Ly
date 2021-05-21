import { useState, useEffect } from "react";
import queryString from "query-string";
import io from "socket.io-client";

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
  }, []);

  useEffect(() => {
    socket.on("message", (message) => {
      console.log(message);
      updateMessages(messages.splice(3, 0, message));
    });
  });

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
        {messages.map((m) => {
          return <h1>{m.text}</h1>;
        })}

        {/* <h2>{name}</h2>
        <h2>{room}</h2> */}
        <input
          type="text"
          value={message}
          onChange={(event) => {
            setMessage(event.target.value);
          }}
          onKeyPress={(event) => {
            event.key === "Enter" && sendMessage(event);
          }}
        />
      </div>
    </div>
  );
};

export default Chat;
