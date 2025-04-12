const express = require('express');
const router = express.Router();
const User = require('../models/User');

// Get or create user
router.post('/sync', async (req, res) => {
  try {
    const { clerkId, email, fullName, imageUrl } = req.body;
    
    let user = await User.findOne({ clerkId });
    
    if (!user) {
      user = new User({
        clerkId,
        email,
        fullName,
        imageUrl
      });
      await user.save();
    }
    
    res.json(user);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Get chat history
router.get('/:clerkId/history', async (req, res) => {
  try {
    const user = await User.findOne({ clerkId: req.params.clerkId });
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }
    res.json(user.chatHistory);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Save chat history
router.post('/:clerkId/history', async (req, res) => {
  try {
    const { conversation } = req.body;
    const user = await User.findOne({ clerkId: req.params.clerkId });
    
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }
    
    // Add new conversation to the beginning of the array
    user.chatHistory.unshift(conversation);
    
    // Keep only the last 10 conversations
    if (user.chatHistory.length > 10) {
      user.chatHistory = user.chatHistory.slice(0, 10);
    }
    
    await user.save();
    res.json(user.chatHistory);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Update conversation viewed status
router.patch('/:clerkId/history/:conversationId', async (req, res) => {
  try {
    const { viewed } = req.body;
    const user = await User.findOne({ clerkId: req.params.clerkId });
    
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }
    
    const conversation = user.chatHistory.id(req.params.conversationId);
    if (!conversation) {
      return res.status(404).json({ error: 'Conversation not found' });
    }
    
    conversation.viewed = viewed;
    await user.save();
    
    res.json(conversation);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router; 