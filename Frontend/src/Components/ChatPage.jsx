/* eslint-disable no-unused-vars */
import { useState } from 'react';
import axios from 'axios';
import user from "./images/user.jpg";
import chatgpt from "./images/chatgpt.jpg";
import { useSelector } from 'react-redux';

const ChatPage = () => {
    const [messages, setMessages] = useState([]);
    const [newMessage, setNewMessage] = useState('');
    const mystate = useSelector((state) => state.UserReducer);

    const handleSendMessage = async () => {
        if (newMessage.trim() !== '') {
            // Get current timestamp
            const timestamp = new Date().toLocaleString();

            // Save user message with timestamp
            setMessages(prevMessages => [...prevMessages, { text: newMessage, sender: 'user', timestamp: timestamp }]);

            // Simulate ChatGPT response
            try {
                const updateuser = await axios.put('http://localhost:5000/PostMessage', { username: mystate.username, messages: { text: newMessage, sender: 'user', timestamp: timestamp } });
                // console.log(updateuser);

                const response = await axios.get('http://localhost:5000/GetChatResponse', {
                    params: {
                        question: newMessage
                    }
                });

                const update = await axios.put('http://localhost:5000/PostMessage', { username: mystate.username, messages: { text: response.data.message.content, sender: 'chatgpt', timestamp: timestamp } });
                // console.log(update);

                // console.log(response.data);
                const data = response.data.message.content;

                setTimeout(() => {
                    setMessages(prevMessages => [...prevMessages, { text: data, sender: 'chatgpt', timestamp: timestamp }]);
                }, 500);
                setNewMessage('');
            } catch (error) {
                console.log(error);
            }
        }
    };

    return (
        <div className="flex flex-col h-[85%]">
            {/* {alert(`welcome ${mystate.username}`)} */}
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
                                <img src={user} className='rounded-full w-10 ml-2'></img>
                            </>
                        ) : (
                            <>
                                <img src={chatgpt} className='rounded-full w-10 mr-2'></img>
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
            <div className="p-4 border-t border-gray-200 flex">
                <input
                    type="text"
                    className="w-full border rounded-lg px-4 py-2 focus:outline-none bg-black text-white"
                    placeholder="Ask me anything..."
                    value={newMessage}
                    onChange={(e) => setNewMessage(e.target.value)}
                    onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                />
                <button
                    className="bg-black text-white  hover:bg-gray-700 hover:text-black px-4 py-2 ml-2 rounded-lg"
                    onClick={handleSendMessage}
                >
                    Send
                </button>
            </div>
        </div>
    );
}

export default ChatPage;