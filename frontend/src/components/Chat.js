import React, { useState, useEffect, useRef } from 'react';
import io from 'socket.io-client';
import axios from 'axios';
import { useHistory } from 'react-router-dom';
import '../styles/Chat.css';

const Chat = () => {
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState('');
  const [file, setFile] = useState(null);
  const [user, setUser] = useState({});
  const socket = useRef(null);
  const messagesEndRef = useRef(null);
  const history = useHistory();

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) {
      history.push('/login');
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

    socket.current.emit('joinRoom', 'room1');

    const fetchMessages = async () => {
      const res = await axios.get(`http://localhost:5000/api/chat/messages/room1`, {
        headers: {
          'Authorization': `Bearer ${token}`,
        }
      });
      setMessages(res.data);
      scrollToBottom();
    };

    fetchMessages();

    return () => {
      socket.current.disconnect();
    };
  }, [newMessage]);

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const handleSendMessage = async (e) => {
    e.preventDefault();
    if (newMessage.trim() === '' && !file) {
      return;
    }

    const token = localStorage.getItem('token');
    if (file) {
      const formData = new FormData();
      formData.append('image', file);
      formData.append('roomId', 'room1');
      formData.append('userId', user._id);
      formData.append('textContent', newMessage);

      try {
        await axios.post(`http://localhost:5000/api/chat/message`, formData, {
          headers: {
            'Content-Type': 'multipart/form-data',
            'Authorization': `Bearer ${token}`,
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
        userId: user._id,
      };
      try {
        await axios.post(`http://localhost:5000/api/chat/message`, messageData, {
          headers: {
            'Authorization': `Bearer ${token}`,
          }
        });
      } catch (error) {
        console.error('Error sending message', error);
      }
    }
    setNewMessage('');
  };

  const handleLogoutClick = async () => {
    try {
      localStorage.removeItem('token');
      localStorage.removeItem('user')
      history.push('/login');
    } catch (error) {
      console.error('Logout error:', error);
    }
  };

  return (
    <div className="chat-container">
      <h2>Chat Room</h2>
      <button onClick={handleLogoutClick}>Logout</button>
      <div className="messages-container">
        {messages.map((message, index) => (
          <div key={index} className={`message-box ${message.sender === user.username ? 'right' : 'left'}`}>
            <div className="message-content">
              {message.imageContent ? (
                <img src={`${process.env.REACT_APP_API_URL}${message.imageContent}`} alt="Sent" style={{ width: '200px' }} />
              ) : (
                <p>{message.textContent}</p>
              )}
            </div>
            <div className="message-meta">
              <span className="username">{message.sender}</span>
              <span>&nbsp;</span>
              <span className="timestamp">{new Date(message.timestamp).toLocaleString()}</span>
            </div>
          </div>
        ))}
        <div ref={messagesEndRef} />
      </div>
      <form onSubmit={handleSendMessage} className="message-form">
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
