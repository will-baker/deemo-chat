import React, { useState } from 'react';
import ChatInput from './ChatInput';
import ChatBubble from './ChatBubble';
import OpenAI from 'openai';
//require('dotenv').config();

const openai = new OpenAI({apiKey: process.env.REACT_APP_OPENAI_SECRET_KEY, dangerouslyAllowBrowser: true});

//openai.apiKey = process.env.REACT_APP_OPENAI_SECRET_KEY;

function ChatWindow() {
  const [messages, setMessages] = useState([]);

  // Function to handle new messages
  const handleNewMessage = async (msg) => {
    setMessages((prevMessages) => [...prevMessages, { text: msg, sender: 'user' }]);
  
    const completion = await openai.chat.completions.create({
      model: 'gpt-4o-mini',
      messages: [
        { 'role': 'system', 'content': 'You are a helpful assistant.' },
        { 'role': 'user', 'content': msg },
      ],
    });
  
    const aiMessage = completion.choices[0].message.content;
    console.log(aiMessage);
  
    setMessages((prevMessages) => [...prevMessages, { text: aiMessage, sender: completion.model }]);
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
