const Message = require('../models/message');
const {encryptMessage, decryptMessage } = require('../utils/encryption');
const multer = require('multer');
const path = require('path');
const fs = require('fs');

// Setup multer for image uploads
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    const uploadDir = path.join(__dirname, '..', 'uploads');
    // Check if the directory exists
    if (!fs.existsSync(uploadDir)) {
      // If it doesn't exist, create it
      fs.mkdirSync(uploadDir);
    }
    cb(null, uploadDir);
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + path.extname(file.originalname));
  }
});

const upload = multer({ storage: storage });

exports.upload = upload.single('image');

exports.sendMessage = async (req, res) => {
  try {
    const { roomId, textContent, userId } = req.body;

    if (!roomId || (!textContent && !req.file) || !userId) {
      return res.status(400).json({ message: 'Missing required fields' });
    }

    // Handle image upload (if any)
    let imageURL = null;
    if (req.file) {
      const imagePath = `uploads/${req.file.filename}`; // Assuming uploads folder stores images
      // imageURL = `${process.env.BASE_URL}${imagePath}/`; // Construct the image URL based on your server configuration
      imageURL  = req.file.path
      // You can also save the image path to a database field if needed
    }

    const newMessage = new Message({
      roomId,
      sender: userId,
      textContent: encryptMessage(textContent),
      imageContent: imageURL,
    });
    await newMessage.save();

    res.status(201).json({ message: 'Message sent successfully', newMessage });
  } catch (error) {
    console.error('Error sending message', error);
    res.status(500).json({ message: 'Error sending message', error });
  }
};


exports.getMessages = async (req, res) => {
  try {
    const { roomId } = req.params;
    const messages = await Message.find({ roomId }).populate('sender', 'username').sort({ timestamp: 1 });
    console.log(messages);
    const decryptedMessages = messages.map((msg) => ({
      id: msg._id,
      textContent: decryptMessage(msg.textContent), // Ensure correct decryption
      imageContent: msg.imageContent,
      sender: msg.sender.username,
      timestamp: msg.timestamp
    }));

    res.status(200).json(decryptedMessages);
  } catch (error) {
    console.error('Error retrieving messages', error);
    res.status(500).json({ message: 'Error retrieving messages', error });
  }
};
