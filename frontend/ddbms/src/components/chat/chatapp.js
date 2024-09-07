import React, { useState } from 'react';
import queryservices from "../services/queryservices";

const ChatApp = ({ setState, setDate }) => {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');
  const [isSending, setIsSending] = useState(false);

  const removeBoldMarkers = (text) => {
    // Regular expression to remove '**' markers
    return text.replace(/\*\*(.*?)\*\*/g, '$1');
  };

  const sendMessage = async (messageType) => {
    if (!input.trim()) return;

    setIsSending(true);

    const newMessage = { text: input, type: 'sent' };
    setMessages([newMessage]);

    try {
      let responseText = '';
      const user = JSON.parse(localStorage.getItem('user'));
      const userId = user ? user._id : null;

      if (messageType === 'nlp') {
        setState(true);
        const result = await queryservices.query({ query: input }, userId);
        // Extract modelResponse key if present
        responseText = result.modelResponse ? removeBoldMarkers(result.modelResponse) : (typeof result === 'string' ? removeBoldMarkers(result) : JSON.stringify(result, null, 2));
        setDate(result.response);
        console.log(result.response);
        setState(false);
      } else if (messageType === 'raw') {
        setState(true);
        const result = await queryservices.rawQuery({ query: input }, userId);
        // Extract modelResponse key if present
        responseText = result.modelResponse ? removeBoldMarkers(result.modelResponse) : (typeof result === 'string' ? removeBoldMarkers(result) : JSON.stringify(result, null, 2));
        setDate(result.response);
        console.log(responseText);
        setState(false);
      }

      const receivedMessage = { text: responseText, type: 'received' };
      setMessages([receivedMessage]);

    } catch (error) {
      console.error('Error sending message:', error);
      const errorMessage = { text: 'An error occurred while processing the request.', type: 'received' };
      setMessages([errorMessage]);
    }

    setInput('');
    setIsSending(false);
  };

  return (
    <div className="flex flex-col h-[82vh] w-full bg-gray-100 p-4 rounded-lg shadow-lg">
      <div className="flex-grow overflow-y-auto mb-4">
        {messages.map((msg, index) => (
          <div key={index} className={`flex ${msg.type === 'sent' ? 'justify-start' : 'justify-end'} mb-2`}>
            <div className={`w-[90%] max-w-full rounded-lg px-4 py-2 ${msg.type === 'sent' ? 'bg-blue-500 text-white' : 'bg-gray-300 text-gray-900'}`}>
              <p className="whitespace-pre-wrap break-words">
                {msg.text}
              </p>
            </div>
          </div>
        ))}
      </div>
      <div className="flex">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          className="flex-grow border rounded-lg p-2 mr-2 focus:outline-none focus:border-blue-500"
          placeholder="Type a message..."
          disabled={isSending}
        />
        <button
          onClick={() => sendMessage('nlp')}
          className="bg-blue-500 text-white rounded-lg px-4 py-2 disabled:opacity-50"
          disabled={isSending}
        >
          NLP
        </button>
        <button
          onClick={() => sendMessage('raw')}
          className="bg-blue-500 text-white rounded-lg px-4 py-2 disabled:opacity-50 mx-1"
          disabled={isSending}
        >
          Raw Query
        </button>
      </div>
    </div>
  );
};

export default ChatApp;
