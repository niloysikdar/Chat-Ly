import "./ChatHeader.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTimes } from "@fortawesome/free-solid-svg-icons";

const ChatHeader = ({ room }) => {
  return (
    <div className="chatHeader">
      <div className="leftInnerContainer">
        <h3>{room}</h3>
      </div>
      <div className="rightInnerContainer">
        <a href="/">
          <FontAwesomeIcon icon={faTimes} className="close" />
        </a>
      </div>
    </div>
  );
};

export default ChatHeader;
