import React from 'react';
import 'daisyui/dist/full.css';

const ChatBubble = ({ message, sender }) => {
    return (
        <div className={`chat-bubble chat-bubble-primary ${sender === 'user' ? 'user' : 'bot'}`}>
            {message}
        </div>
    );
};

export default ChatBubble;