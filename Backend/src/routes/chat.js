const express = require('express');
const router = express.Router();
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

// Save chat history
router.post('/save', async (req, res) => {
  try {
    const { userId, messages } = req.body;

    // Save chat history
    const chatHistory = await prisma.chatHistory.create({
      data: {
        userId,
        messages: JSON.stringify(messages),
      },
    });

    res.json({ success: true, chatHistory });
  } catch (error) {
    console.error('Error saving chat history:', error);
    res.status(500).json({ error: 'Failed to save chat history' });
  }
});

// Get chat history
router.get('/history/:userId', async (req, res) => {
  try {
    const { userId } = req.params;

    // Get chat history
    const chatHistory = await prisma.chatHistory.findMany({
      where: {
        userId,
      },
      orderBy: {
        createdAt: 'desc',
      },
    });

    // Parse messages from JSON string
    const parsedHistory = chatHistory.map(history => ({
      ...history,
      messages: JSON.parse(history.messages),
    }));

    res.json(parsedHistory);
  } catch (error) {
    console.error('Error fetching chat history:', error);
    res.status(500).json({ error: 'Failed to fetch chat history' });
  }
});

module.exports = router; 