import { useRef } from "react";
import { useHistory } from "react-router-dom";
import "./Join.css";

const Join = () => {
  const history = useHistory();

  const nameRef = useRef();
  const roomRef = useRef();
  var name, room;

  const onJoinClicked = () => {
    name = nameRef.current.value.trim();
    room = roomRef.current.value.trim();
    console.log(name, room);
    if (name !== "" && room !== "") {
      history.replace(`/chat?name=${name}&room=${room}`);
    } else {
      alert("Field cannot be empty");
    }
  };

  return (
    <div className="main">
      <div className="wrapper">
        <div className="title">Chat Ly</div>
        <form>
          <div className="field">
            <input type="text" required ref={nameRef} />
            <label>Username</label>
          </div>
          <div className="field">
            <input type="text" required ref={roomRef} />
            <label>Room Name</label>
          </div>
          <div className="field">
            <input type="submit" value="Join" onClick={onJoinClicked} />
          </div>
        </form>
      </div>
    </div>
  );
};

export default Join;
