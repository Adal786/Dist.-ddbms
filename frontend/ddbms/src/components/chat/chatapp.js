import React, { useState } from 'react';
import queryservices from "../services/queryservices";
import { useNavigate } from 'react-router-dom'

const ChatApp = ({ setState, setDate }) => {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');
  const [isSending, setIsSending] = useState(false);
  const naviagate = useNavigate()

  const removeBoldMarkers = (text) => {
    // Regular expression to remove '**' markers
    return text.replace(/\*\*(.*?)\*\*/g, '$1');
  };

  const sendMessage = async (messageType, message = input) => {
    console.log('message', message)
    console.log('input', input)
    if (!message.trim()) return;

    setIsSending(true);

    const newMessage = { text: input || message, type: 'sent' };
    setMessages([newMessage]);

    try {
      let responseText = '';
      const user = JSON.parse(localStorage.getItem('user'));
      const userId = user ? user._id : null;

      if (messageType === 'nlp') {
        setState(true);
        const result = await queryservices.query({ query: message }, userId);
        // Extract modelResponse key if present
        responseText = result.modelResponse ? removeBoldMarkers(result.modelResponse) : (typeof result === 'string' ? removeBoldMarkers(result) : JSON.stringify(result, null, 2));
        setDate(result.response);
        console.log(result.response);
        setState(false);
      } else if (messageType === 'raw') {
        setState(true);
        const result = await queryservices.rawQuery({ query: message }, userId);
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

  const openGuide = () => {
    naviagate('/data')
  }

  const _messages = [
    { message: 'Bring me the record with data id 7' },
    { message: 'Bring me all the records with point value should be between one and six except four?' },
    { message: 'Give me all that have the coordinate Y value less than 100 and the coordinate X value less than -150' },
    { message: 'Show me some of these records that have been updated! It should not include those who are updated anytime.' },
    { message: 'Show me hundred records that have some value in the column "Bike ID".' },
    { message: 'Bring me all the records that have website address in them' },
    { message: 'Bring me the fifty records where the train is being used for transportation purposes.' },
    { message: 'Bring me the fifty records where the train is being used for transportation purposes and the records are not updated anytime.' },
    { message: 'Bring me the fifty records where the bike is being used for transportation purposes.' },
  ]

  const hitRequest = async (message, index) => {
    setInput(message)
    if (index == 0) {
      message = 'SELECT * FROM `data` WHERE `id` = 7;'
    }
    else if (index == 1) {
      message = 'SELECT * FROM `data` WHERE `POINT_ID` BETWEEN 1 AND 6 AND `POINT_ID` != 4;'
    }
    else if (index == 2) {
      message = 'SELECT * FROM `data` WHERE `Y` < 100 AND `X` < -150;'
    }
    else if (index == 3) {
      message = 'SELECT * FROM `data` WHERE `DATE_UPDTE` IS NOT NULL LIMIT 10;'
    }
    else if (index == 4) {
      message = 'SELECT * FROM `data` WHERE `BIKE_ID` IS NOT NULL LIMIT 100;'
    }
    else if (index == 5) {
      message = 'SELECT * FROM `data` WHERE `WEBSITE` IS NOT NULL;'
    }
    else if (index == 6) {
      message = 'SELECT * FROM `data` WHERE `MODE_RAIL` IS TRUE;'
    }
    else if (index == 7) {
      message = 'SELECT * FROM `data` WHERE `MODE_RAIL` IS TRUE AND `DATE_UPDTE` IS NULL;'
    }
    else if (index == 8) {
      message = 'SELECT * FROM `data` WHERE `MODE_BIKE` = TRUE;'
    }
    await sendMessage('raw', message)
  }

  return (
    <div className="flex flex-col h-[82vh] w-full bg-gray-100 p-4 rounded-lg shadow-lg">
      <div className="flex-grow overflow-y-auto mb-4">
        {Array.isArray(messages) && messages.length == 0 &&
          <>
            <h1><b>Ask anything about the data</b></h1>
            {_messages.map((mes, index) => (
              <h2 className='my-5' key={index}><span className='rounded-full bg-gray-200 shadow p-2'
                style={{ cursor: 'pointer' }}
                onClick={() => hitRequest(mes.message, index)}>{mes.message}</span></h2>
            ))}
            <h2 className='my-3 ps-4'><span className='rounded-full bg-gray-500 shadow p-2'
              style={{ cursor: 'pointer' }}
              onClick={openGuide}>
              Read more...</span></h2>
          </>
        }
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
