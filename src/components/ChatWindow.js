import React, { useState } from 'react';
import ChatInput from './ChatInput';
import ChatBubble from './ChatBubble';

function ChatWindow() {
  const [messages, setMessages] = useState([]);

  // Function to handle new messages
  const handleNewMessage = (msg) => {
    setMessages([...messages, { text: msg, sender: 'user' }]);
    // Call API and add response to messages
  };

  return (
    <div className="flex-1 p-4">
      {messages.map((message, index) => (
        <ChatBubble key={index} message={message.text} sender={message.sender} />
      ))}
      <ChatInput onSendMessage={handleNewMessage} />
    </div>
  );
}

export default ChatWindow;
