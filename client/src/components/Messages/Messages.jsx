import ScrollToBottom from "react-scroll-to-bottom";
import "./Messages.css";
import Message from "./Message";

const Messages = ({ messages, name }) => {
  return (
    <ScrollToBottom className="messages">
      {messages.map((m) => {
        return <Message key={`${m.text}+${m.user}`} message={m} name={name} />;
      })}
    </ScrollToBottom>
  );
};

export default Messages;
