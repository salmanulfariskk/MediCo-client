import React, { useState, useEffect, useRef } from "react";

import PropTypes from "prop-types";
import InputEmoji from "react-input-emoji";
import Conversation from "./Conversation";
import axios from "axios";

function ChatBox({ chat, currentDoctor, setMessages, messages, socket }) {
  const [userDataa, setUserDataa] = useState(null);
  const [newMessage, setNewMessage] = useState("");

  const scroll = useRef();

  useEffect(() => {
    scroll.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const handleChange = (newMessage) => {
    setNewMessage(newMessage);
  };

  //storing messages in database
  const handleSend = async (e) => {
    e.preventDefault();
    if (!newMessage.trim()) {
      return;
    }
    let newOne;
    const message = {
      senderId: currentDoctor,
      text: newMessage,
      chatId: chat._id,
    };
    try {
      const { data } = await axios.post(
        "https://medico-server-b7s5.onrender.com/message/addMsg",
        message
      );
      newOne = data;
      setMessages([...messages, data]);
      setNewMessage("");
    } catch (error) {
      console.log(error.message);
    }
    console.log(newOne);
    socket.emit("send_message", newOne);
  };

  //getting dr details to display
  useEffect(() => {
    const userId = chat?.members?.find((id) => id !== currentDoctor);
    const getUserData = async () => {
      try {
        const { data } = await axios.get(
          `https://medico-server-b7s5.onrender.com/chat/userData/${userId}`
        );

        setUserDataa(data);
      } catch (error) {
        console.log(error.message);
      }
    };
    if (chat !== null) getUserData();
  }, [chat, currentDoctor]);

  useEffect(() => {
    const fetchMessages = async () => {
      try {
        const data = await axios.get(
          `https://medico-server-b7s5.onrender.com/message/getMsg/${chat._id}`
        );
        setMessages(data?.data);
      } catch (error) {
        console.log(error.message);
      }
    };
    if (chat !== null) fetchMessages();
  }, [chat]);
  return (
    <>
      {chat ? (
        <>
          <div
            className="flex-1 p-2 sm:p-6 justify-center flex flex-col"
            style={{ maxHeight: "80vh" }}
          >
            <div className="flex sm:items-center justify-between ">
              <div className="relative flex items-center space-x-4">
                <div className="relative">
                  <span className="absolute text-green-500 right-0 bottom-0">
                    <svg width="20" height="20">
                      <circle cx="8" cy="8" r="8" fill="currentColor"></circle>
                    </svg>
                  </span>
                  <img
                    src={userDataa?.photo}
                    alt="user"
                    className="w-10 sm:w-16 h-10 sm:h-16 rounded-full object-cover"
                  />
                </div>
                <div className="flex flex-col leading-tight">
                  <div className="text-2xl mt-1 flex items-center">
                    <span className="text-gray-700 mr-3">
                      {userDataa?.name}
                    </span>
                  </div>
                </div>
              </div>
            </div>
            <div>
              <hr className="m-5 border" />
            </div>

            <div
              id="messages"
              className="flex flex-col space-y-4 p-3 overflow-y-auto scrollbar-thumb-blue scrollbar-thumb-rounded scrollbar-track-blue-lighter scrollbar-w-1 h-screen scrolling-touch"
            >
              {messages.map((message) => (
                <div ref={scroll} key={message._id}>
                  <Conversation
                    message={message}
                    currentDoctor={currentDoctor}
                  />
                </div>
              ))}
            </div>
            <div>
              <hr className="m-5 border" />
            </div>
            <div className="  px-4 pt-4 mb-2 sm:mb-0">
              <div className="relative flex">
                <span className="absolute inset-y-0 flex items-center">
                  {/* Add your content here */}
                </span>
                <InputEmoji value={newMessage} onChange={handleChange} />

                <button
                  type="button"
                  onClick={handleSend}
                  className="inline-flex items-center justify-center rounded-lg px-4 py-3 transition duration-500 ease-in-out text-white bg-blue-500 hover:bg-blue-400 focus:outline-none"
                >
                  <span className="font-bold">Send</span>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                    className="h-6 w-6 ml-2 transform rotate-90"
                  >
                    <path d="M10.894 2.553a1 1 0 00-1.788 0l-7 14a1 1 0 001.169 1.409l5-1.429A1 1 0 009 15.571V11a1 1 0 112 0v4.571a1 1 0 00.725.962l5 1.428a1 1 0 001.17-1.408l-7-14z"></path>
                  </svg>
                </button>
              </div>
            </div>
          </div>
        </>
      ) : (
        <div
          className="flex-1 p-2 sm:p-6 justify-center flex items-center text-green-500"
          style={{ maxHeight: "90vh", fontSize: "30px" }}
        >
          Open a chat to start a conversation
        </div>
      )}
    </>
  );
}

ChatBox.propTypes = {
  chat: PropTypes.object,
  messages: PropTypes.array.isRequired,
  setMessages: PropTypes.func.isRequired,
  socket: PropTypes.object.isRequired,
  currentUser: PropTypes.string.isRequired,
};

export default ChatBox;
