import React from "react";

function ChatSidebar({ threads, selectedThreadId, onNewChat, onSelectThread }) {
  return (
    <div className="menu bg-base-200 rounded-box w-56 lg:min-w-max">
      <div className="menu-title flex justify-between items-center">
        <span>Chat History</span>
        <button onClick={onNewChat} className="btn btn-sm btn-primary">
          New Chat
        </button>
      </div>
      <ul>
        {threads.map((thread) => (
          <li key={thread.id}>
            <a
              onClick={() => onSelectThread(thread.id)}
              className={thread.id === selectedThreadId ? "active" : ""}
            >
              {thread.id}
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default ChatSidebar;
