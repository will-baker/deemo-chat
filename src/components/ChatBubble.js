import React from 'react';
import 'daisyui/dist/full.css';

const ChatBubble = ({ message, sender }) => {
    return (
        <div className={`chat ${sender === 'user' ? 'chat-end' : 'chat-start'}`}>
            <div className={`chat-bubble  ${sender === 'user' ? 'chat-bubble-primary' : ''}`}>
                Cat {message}
            </div>
        </div>
        
    );
};

export default ChatBubble;