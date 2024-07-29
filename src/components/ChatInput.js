import React, { useState } from 'react';

function ChatInput({ onSendMessage }) {
  const [input, setInput] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    onSendMessage(input);
    setInput('');
  };

  return (
    <form onSubmit={handleSubmit} className="flex items-center">
      <input
        type="text"
        value={input}
        onChange={(e) => setInput(e.target.value)}
        className="flex-1 rounded-l-full p-2 border-2 border-r-0 border-blue-500"
        placeholder="Type a message..."
      />
      <button type="submit" className="bg-blue-500 text-white p-2 rounded-r-full">
        Send
      </button>
    </form>
  );
}

export default ChatInput;
