const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const app = express();
app.use(cors());
app.use(express.json());

// MongoDB හා සම්බන්ධ වීම
mongoose.connect(process.env.MONGO_URI)
    .then(() => console.log('MongoDB Connected'))
    .catch(err => console.log(err));

// Database Models සෑදීම
const ContentSchema = new mongoose.Schema({
    type: String, 
    value: String 
});
const Content = mongoose.model('Content', ContentSchema);

// මුල් පිටුව සඳහා (Cannot GET / දෝෂය මඟහරවා ගැනීමට)
app.get('/', (req, res) => {
    res.send('Casmura Backend is running successfully!');
});

// දත්ත ලබා ගැනීමේ API (GET)
app.get('/api/content', async (req, res) => {
    try {
        const data = await Content.find();
        res.json(data);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// දත්ත අලුතින් ඇතුළත් කිරීමේ නිවැරදි API එක (POST)
app.post('/api/content', async (req, res) => {
    try {
        const newContent = new Content(req.body);
        await newContent.save();
        res.json({ message: "Content Saved Successfully" });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// දත්ත ලබා ගැනීමේ API (GET)
app.get('/api/content', async (req, res) => {
    console.log("API /api/content was hit!"); // මෙය එකතු කර බලන්න
    try {
        const data = await Content.find();
        res.json(data);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
