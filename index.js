const express = require('express');
const fetch = require('node-fetch');
const cors = require('cors');

const app = express();
app.use(express.json());

// Enable CORS for all routes
app.use(cors());

// POST endpoint to receive the payload and send it to the webhook
app.post('/api/send-webhook', async (req, res) => {
  try {
    const payload = req.body;

    // Send the POST request to the webhook URL
    const response = await fetch('https://discord.com/api/webhooks/1118980055041839224/ASI4Q3J_J5Xe5IpI6T9r-YmWgqCWT0IdmPoZrEzaB7MysUjwx-mm8xBiv3RDMC6V3wEP', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(payload)
    });

    if (response.ok) {
      console.log('Message sent successfully!');
      res.sendStatus(200);
    } else {
      console.error('Failed to send message:', response.status, response.statusText);
      res.sendStatus(500);
    }
  } catch (error) {
    console.error('Error:', error);
    res.sendStatus(500);
  }
});

// Start the server
const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`API server is running on port ${port}`);
});
