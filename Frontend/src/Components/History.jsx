import { useEffect, useState } from "react";
import axios from "axios";
import user from "./images/user.jpg";
import chatgpt from "./images/chatgpt.jpg";
import { useSelector } from "react-redux";

const History = () => {
    const [messages, setMessages] = useState([]);
    const myState = useSelector((state) => state.UserReducer);
    useEffect(() => {
        const fetchMessages = async () => {
            try {
                // console.log(myState);
                const response = await axios.get("http://localhost:5000/GetMessage", {
                    params: {
                        username: myState.username
                    }
                });
                // console.log(response.data[0].messages);
                setMessages(response.data[0].messages); // Update to access messages array correctly
            } catch (error) {
                console.log(error);
            }
        };

        fetchMessages();
    }, []);

    return (
        <div className="flex-1 p-4 overflow-y-auto bg-[#212121]">
            {messages.map((message, index) => (
                <div
                    key={index}
                    className={`mb-4 flex items-center ${message.sender === 'user' ? 'justify-end text-right' : 'justify-start text-left'
                        }`}
                >
                    {message.sender === 'user' ? (
                        <>
                            <div
                                className={`px-4 py-2 bg-gray-500 text-white rounded-lg inline-block max-w-[50%]`}
                            >
                                {message.text}
                                <div className="text-xs text-gray-400">{message.timestamp}</div>
                            </div>
                            <img src={user} className='rounded-full w-10 ml-2' alt="User"></img>
                        </>
                    ) : (
                        <>
                            <img src={chatgpt} className='rounded-full w-10 mr-2' alt="ChatGPT"></img>
                            <div
                                className={`px-4 py-2 bg-gray-300 rounded-lg inline-block max-w-[50%]`}
                            >
                                {message.text}
                                <div className="text-xs text-gray-600">{message.timestamp}</div>
                            </div>
                        </>
                    )}
                </div>
            ))}
        </div>
    );
}

export default History;
