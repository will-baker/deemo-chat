import OpenAI from "openai";

const openai = new OpenAI({
  apiKey: process.env.REACT_APP_OPENAI_SECRET_KEY,
  dangerouslyAllowBrowser: true,
});
//const ASSISTANT_ID="asst_N3VvNPJJgK55KrOiJNnYuTsO";

export const createThread = async () => {
  const thread = await openai.beta.threads.create();
  return thread.id;
};

export const addMessageToThread = async (threadId, message) => {
  await openai.beta.threads.messages.create(threadId, {
    role: "user",
    content: message,
  });
};

export const runAssistant = async (threadId, assistantId) => {
  const run = await openai.beta.threads.runs.createAndPoll(threadId, {
    assistant_id: assistantId,
    //additional_instructions: "Please address the user as Will. The user has a premium account."
  });
  return run.id;
};

export const getAssistantResponse = async (threadId, runId) => {
  let run;
  do {
    run = await openai.beta.threads.runs.retrieve(threadId, runId);
    if (run.status === "completed") {
      const messages = await openai.beta.threads.messages.list(threadId);
      return messages.data[0].content[0].text.value;
    }
    await new Promise((resolve) => setTimeout(resolve, 1000));
  } while (run.status !== "completed");
};

// Retrieve messages from an existing thread
export const getMessages = async (threadId) => {
  const messages = await openai.beta.threads.messages.list(threadId);
  return messages.data;
};
