import React, { useState, useEffect } from "react";
import Header from "./components/Header";
import ChatSidebar from "./components/ChatSidebar.js";
import ChatWindow from "./components/ChatWindow";
import "./index.css"; // Import TailwindCSS
import { createThread } from "./api/OpenAIAssistants.js";

function App() {
  const [threads, setThreads] = useState([]);
  const [selectedThreadId, setSelectedThreadId] = useState(
    "thread_GjKjteJdrS1behaNmF8GFYkx"
  );

  const handleNewChat = async () => {
    const newThreadId = await createThread();
    setThreads([...threads, { id: newThreadId }]);
    setSelectedThreadId(newThreadId);
  };

  const handleSelectThread = (threadID) => {
    setSelectedThreadId(threadID);
  };

  // Initiate a new chat on page load
  useEffect(() => {
    handleNewChat();
  }, []);

  return (
    <div>
      <Header />
      <div className="flex">
        <ChatSidebar
          threads={threads}
          selectedThreadId={selectedThreadId}
          onNewChat={handleNewChat}
          onSelectThread={handleSelectThread}
        />
        <ChatWindow threadId={selectedThreadId} />
      </div>
    </div>
  );
}

export default App;
