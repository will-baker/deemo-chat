import React, { useState, useEffect } from "react";
import ChatInput from "./ChatInput";
import ChatBubble from "./ChatBubble";
import { getCompletion } from "../api/OpenAICompletions";
import {
  createThread,
  addMessageToThread,
  runAssistant,
  getAssistantResponse,
} from "../api/OpenAIAssistants";

// Define available assistants and their corresponding IDs
// 'GPT-4o-mini' uses the ChatCompletions API, so it doesn't have an assistant ID
const assistants = {
  "GPT-4o-mini": null, // This uses the ChatCompletions API, so no assistant ID
  "Personal Finance Assistant": "asst_FsEo46Hh2qtD0t6tN42aJmZ1",
  //'Writing Assistant': 'asst_writing_assistant_id_here',
  //'Code Helper': 'asst_code_helper_id_here',
};

function ChatWindow({ selectedThreadId }) {
  // State to store chat messages
  const [messages, setMessages] = useState([]);
  // State to keep track of the currently selected assistant
  const [selectedAssistant, setSelectedAssistant] = useState("GPT-4o-mini");
  // State to store the thread ID for the Assistants API
  //const [threadId, setThreadId] = useState(null);

  // Effect hook to create a new thread when the component mounts
  /* useEffect(() => {
    const initThread = async () => {
      const newThreadId = await createThread();
      setThreadId(newThreadId);
      console.log(newThreadId);
    };
    initThread();
  }, []); */

  // Effect hook to get list of messaged from the selectedThreadID, and update the chat messages
  useEffect(() => {
    const getMessages = async () => {
      if (selectedThreadId) {
        // Clear the current chat
        setMessages([]);

        // Get the message history from the selected thread
        const messages = await getAssistantResponse(selectedThreadId, "latest");
        setMessages(messages);
      }
    };
    getMessages();
  }, [selectedThreadId]);

  // Function to handle new messages
  const handleNewMessage = async (msg) => {
    setMessages((prevMessages) => [
      ...prevMessages,
      { text: msg, sender: "user" },
    ]);

    let aiMessage;

    if (selectedAssistant === "GPT-4o-mini") {
      // Use the ChatCompletions API for the GPT-4o-mini assistant
      const completion = await getCompletion(msg);
      aiMessage = completion.choices[0].message.content;
    } else {
      // Use the Assistants API for other assistants
      await addMessageToThread(selectedThreadId, msg);
      const runId = await runAssistant(
        selectedThreadId,
        assistants[selectedAssistant]
      );
      aiMessage = await getAssistantResponse(selectedThreadId, runId);
    }

    // Update the chat messages with the AI response
    setMessages((prevMessages) => [
      ...prevMessages,
      { text: aiMessage, sender: selectedAssistant },
    ]);
  };

  // Function to handle assistant selection
  const handleAssistantSelection = (assistant) => {
    setSelectedAssistant(assistant);
  };

  return (
    <div className="flex-1 p-4">
      <div className="dropdown dropdown-bottom dropdown-end justify-end">
        <div tabIndex={0} role="button" className="btn m-1">
          {selectedAssistant}
        </div>
        <ul
          tabIndex={0}
          className="dropdown-content menu bg-base-100 rounded-box z-[1] w-52 p-2 shadow"
        >
          <li>
            <a onClick={() => handleAssistantSelection("GPT-4o-mini")}>
              GPT-4o-mini
            </a>
          </li>
          <li>
            <a
              onClick={() =>
                handleAssistantSelection("Personal Finance Assistant")
              }
            >
              Personal Finance Assistant
            </a>
          </li>
        </ul>
      </div>

      {messages.map((message, index) => (
        <ChatBubble
          key={index}
          message={message.text}
          sender={message.sender}
        />
      ))}
      <ChatInput onSendMessage={handleNewMessage} />
    </div>
  );
}

export default ChatWindow;
