import React from 'react';

function ChatSidebar() {
  return (
<ul className="menu bg-base-200 rounded-box w-56 lg:min-w-max">
  <li className="menu-title">Chat History</li>
  <li><a className="active">Item 1</a></li>
  <li><a>Item 2</a></li>
  <li><a>Item 3</a></li>
</ul>
  );
}

export default ChatSidebar;
