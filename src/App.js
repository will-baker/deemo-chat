import React from 'react';
import Header from './components/Header';
import ChatSidebar from './components/ChatSidebar.js';
import ChatWindow from './components/ChatWindow';
import './index.css'; // Import TailwindCSS

function App() {
  return (
    <div className="App bg-gray-100 min-h-screen">
      <Header />
      <div className="flex">
        <ChatSidebar />
        <ChatWindow />
      </div>
    </div>
  );
}

export default App;
