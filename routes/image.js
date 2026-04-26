const express = require('express');
const router = express.Router();
const axios = require('axios');

router.post('/generate', async (req, res) => {
    const { prompt, key } = req.body;
    if (key !== "EMPIRE_ADMIN") return res.status(401).json({ error: "Invalid Key" });

    try {
        const response = await axios.post('https://api.openai.com/v1/images/generations', {
            model: "dall-e-3",
            prompt: prompt,
            n: 1,
            size: "1024x1024"
        }, {
            headers: { 'Authorization': `Bearer ${process.env.OPENAI_API_KEY}` }
        });

        const imageUrl = response.data.data[0].url;
        res.json({ 
            status: 200, 
            creator: "Empire", 
            result: imageUrl 
        });
    } catch (error) {
        res.status(500).json({ error: "Empire Image Engine failed." });
    }
});

module.exports = router;
      
