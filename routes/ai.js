const express = require('express');
const router = express.Router();
const axios = require('axios');

// Empire GPT Chat & Tools logic
router.post('/chat', async (req, res) => {
    const { prompt, key } = req.body;
    
    // Security check
    if (key !== "EMPIRE_ADMIN") return res.status(401).json({ error: "Invalid Empire Key" });

    try {
        const response = await axios.post('https://api.openai.com/v1/chat/completions', {
            model: "gpt-4o", // You can use "gpt-3.5-turbo" if you want it cheaper
            messages: [{ role: "user", content: prompt }],
            temperature: 0.7
        }, {
            headers: {
                'Authorization': `Bearer ${process.env.OPENAI_API_KEY}`,
                'Content-Type': 'application/json'
            }
        });

        const reply = response.data.choices[0].message.content;
        res.json({ 
            status: 200, 
            creator: "Empire", 
            result: reply 
        });
    } catch (error) {
        console.error(error.response ? error.response.data : error.message);
        res.status(500).json({ error: "Empire GPT service is currently unavailable." });
    }
});

// Lyrics Finder (Powered by GPT)
router.post('/lyrics', async (req, res) => {
    const { prompt, key } = req.body;
    if (key !== "EMPIRE_ADMIN") return res.status(401).json({ error: "Invalid Key" });

    const lyricsPrompt = `Find the lyrics for this song: ${prompt}. Return ONLY the lyrics, no conversational text.`;

    try {
        const response = await axios.post('https://api.openai.com/v1/chat/completions', {
            model: "gpt-4o",
            messages: [{ role: "user", content: lyricsPrompt }]
        }, {
            headers: { 'Authorization': `Bearer ${process.env.OPENAI_API_KEY}` }
        });

        res.json({ status: 200, creator: "Empire", result: response.data.choices[0].message.content });
    } catch (e) {
        res.status(500).json({ error: "Lyrics not found." });
    }
});

module.exports = router;
