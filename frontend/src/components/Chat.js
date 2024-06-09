import React, { useState, useEffect, useRef } from 'react';
import io from 'socket.io-client';
import axios from 'axios';

const Chat = (props) => {
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState('');
  const [file, setFile] = useState(null);
  const [user, setUser] = useState({});
  const socket = useRef(null);

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) {
      window.location.href = '/login';
      return;
    }

    const storedUser = JSON.parse(localStorage.getItem('user'));
    setUser(storedUser);

    socket.current = io(process.env.REACT_APP_SOCKET_URL, {
      auth: { token }
    });

    socket.current.on('message', (message) => {
      setMessages((prevMessages) => [...prevMessages, message]);
    });

    const fetchMessages = async () => {
      const res = await axios.get(`http://localhost:5000/api/chat/messages/room1`, {headers: {
        'Authorization': `Bearer ${token}`, // Pass the token in the headers
      }});
      setMessages(res.data);
    };

    fetchMessages();

    return () => {
      socket.current.disconnect();
    };
  }, [newMessage]);

  const handleSendMessage = async (e) => {
    e.preventDefault();
    if (newMessage.trim() === '' && !file) {
      return; // Don't send empty messages
    }
  
    const token = localStorage.getItem('token'); // Retrieve the token from localStorage
  
    if (file) {
      const formData = new FormData();
      formData.append('image', file);
      formData.append('roomId', 'room1');
      formData.append('userId', user._id); // Include the userId
      formData.append('textContent', newMessage)
  
      try {
        await axios.post(`http://localhost:5000/api/chat/message`, formData, {
          headers: {
            'Content-Type': 'multipart/form-data',
            'Authorization': `Bearer ${token}`, // Pass the token in the headers
          }
        });
        setFile(null);
      } catch (error) {
        console.error('Error sending message', error);
      }
    } else {
      const messageData = {
        roomId: 'room1',
        textContent: newMessage,
        userId: user._id, // Include the userId
      };
      try {
        await axios.post(`http://localhost:5000/api/chat/message`, messageData, {
          headers: {
            'Authorization': `Bearer ${token}`, // Pass the token in the headers
          }
        });
      } catch (error) {
        console.error('Error sending message', error);
      }
    }
    setNewMessage('');
  };
  

  return (
    <div>
      <h2>Chat Room</h2>
      <div>
        {messages.map((message, index) => (
          <div key={index}>
            {message.imageContent ? (
              <img src={`${process.env.REACT_APP_API_URL}${message.imageContent}`} alt="Sent" style={{ width: '200px' }} />
            ) : (
              <p>{message.textContent}</p>
            )}
          </div>
        ))}
      </div>
      <form onSubmit={handleSendMessage}>
        <input
          type="text"
          placeholder="Type a message"
          value={newMessage}
          onChange={(e) => setNewMessage(e.target.value)}
          required
        />
        <input type="file" onChange={(e) => setFile(e.target.files[0])} />
        <button type="submit">Send</button>
      </form>
    </div>
  );
};

export default Chat;
