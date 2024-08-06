const express = require('express');
const axios = require('axios');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 3001;

// Middleware
app.use(cors()); // Enable CORS for all origins
app.use(express.json()); // Parse JSON bodies

// POST endpoint for receiving messages from the frontend
app.post('/api/message', async (req, res) => {
  try {
    const { message } = req.body;

    // Send the message to the third-party API
    const response = await axios.post('https://api.example.com/chat', {
      message: message,
    }, {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer YOUR_API_KEY`, // If the API requires authentication
      }
    });

    // Send the response from the third-party API back to the frontend
    res.json(response.data);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'An error occurred while processing the message.' });
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
