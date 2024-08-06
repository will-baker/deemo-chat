import OpenAI from 'openai';

const openai = new OpenAI({apiKey: process.env.REACT_APP_OPENAI_SECRET_KEY, dangerouslyAllowBrowser: true});

export const getCompletion = async (msg) => {
    const completion = await openai.chat.completions.create({
      model: 'gpt-4o-mini',
      messages: [
        { 'role': 'system', 'content': 'You are a helpful assistant.' },
        { 'role': 'user', 'content': msg },
      ],
    });
  
    return completion;
  };