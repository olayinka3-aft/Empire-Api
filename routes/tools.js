const express = require('express');
const router = express.Router();
const axios = require('axios');

// The Universal Empire Tool (Handles 30+ tasks)
router.post('/execute', async (req, res) => {
    const { task, data, key } = req.body;

    if (key !== "EMPIRE_ADMIN") return res.status(401).json({ error: "Invalid Key" });

    // This prompt tells GPT to act as a specific tool
    const toolPrompt = `You are the Empire Multipurpose Tool. 
    Current Task: ${task}
    Input Data: ${data}
    Provide a concise, professional response. If it's a calculation, show the result. If it's a translation, provide the text.`;

    try {
        const response = await axios.post('https://api.openai.com/v1/chat/completions', {
            model: "gpt-4o",
            messages: [{ role: "user", content: toolPrompt }]
        }, {
            headers: { 'Authorization': `Bearer ${process.env.OPENAI_API_KEY}` }
        });

        res.json({ 
            status: 200, 
            creator: "Empire", 
            task: task,
            result: response.data.choices[0].message.content 
        });
    } catch (error) {
        res.status(500).json({ error: "Empire Tool Error" });
    }
});

module.exports = router;
              
