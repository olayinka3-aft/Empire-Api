const express = require('express');
const cors = require('cors');
const path = require('path');
require('dotenv').config();

const app = express();

// Middleware
app.use(express.json({ limit: '50mb' })); 
app.use(cors());
app.use(express.static('public'));

// 1. Import the Routes
const aiRoutes = require('./routes/ai');
const imageRoutes = require('./routes/image');
const toolRoutes = require('./routes/tools');

// 2. Link the Routes to Endpoints
app.use('/v1/ai', aiRoutes);
app.use('/v1/image', imageRoutes);
app.use('/v1/tools', toolRoutes);

// 3. Serve the Dashboard
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// 4. Start the Empire
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`🚀 Empire API Hub is Live on Port ${PORT}`);
});
