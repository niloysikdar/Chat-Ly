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
    <div className="joinOuterContainer">
      <div className="joinInnerContainer">
        <h1 className="heading">Join a Room</h1>
        <div>
          <input
            required
            type="text"
            placeholder="Your Name"
            className="joinInput mt-20"
            ref={nameRef}
          />
        </div>
        <div>
          <input
            required
            type="text"
            placeholder="Room Name"
            className="joinInput mt-20"
            ref={roomRef}
          />
        </div>
        <button className="button mt-20" type="submit" onClick={onJoinClicked}>
          Join
        </button>
      </div>
    </div>
  );
};

export default Join;
