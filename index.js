const express = require('express');
const cors = require('cors');
const path = require('path');
require('dotenv').config();

const app = express();

// Middleware
app.use(express.json());
app.use(cors());
app.use(express.static('public')); // This links your UI folder

// Basic "Empire is Alive" route
app.get('/status', (req, res) => {
    res.json({ 
        status: "Online", 
        owner: "Empire", 
        message: "Empire API Gateway is running smoothly." 
    });
});

// --- ROUTES WILL BE LINKED HERE LATER ---

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Empire Hub is live on port ${PORT}`);
});
