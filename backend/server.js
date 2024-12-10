const express = require('express');
const axios = require('axios');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3000;

app.get('/get-images', async (req, res) => {
  const query = req.query.q; // Get query from the request
  const apiKey = process.env.GOOGLE_API_KEY; // API key from .env
  const cx = process.env.GOOGLE_CX; // Custom search engine ID from .env

  try {
    const response = await axios.get(
      `https://www.googleapis.com/customsearch/v1`,
      {
        params: {
          q: `${query} inspo`,
          searchType: 'image',
          key: apiKey,
          cx: cx,
          num: 5, // Limit to 5 images
        },
      }
    );
    const images = response.data.items.map((item) => item.link);
    res.json({ images }); // Return image URLs to the client
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to fetch images' });
  }
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
