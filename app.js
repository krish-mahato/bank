const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const bodyParser = require('body-parser');

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(bodyParser.json()); // Parse incoming requests as JSON

// Connect to MongoDB
mongoose.connect('mongodb://localhost:27017/data_set', { 
    useNewUrlParser: true, 
    useUnifiedTopology: true 
})
.then(() => console.log('MongoDB connected'))
.catch(err => console.error('MongoDB connection error:', err));

// Define a Mongoose schema for your data (e.g., expenses)
const DashboardSchema = new mongoose.Schema({
    description: String,
    amount: Number,
    date: { type: Date, default: Date.now }
});

const Dashboard = mongoose.model('Dashboard', DashboardSchema);

// **CRUD Routes**

// Create a new entry
app.post('/api/dashboard', async (req, res) => {
    const { description, amount, date } = req.body;

    const newEntry = new Dashboard({ description, amount, date });

    try {
        await newEntry.save();
        res.status(201).json(newEntry);
    } catch (error) {
        res.status(400).json({ error: 'Error creating entry' });
    }
});

// Read all entries
app.get('/api/dashboard', async (req, res) => {
    try {
        const entries = await Dashboard.find();
        res.status(200).json(entries);
    } catch (error) {
        res.status(400).json({ error: 'Error fetching entries' });
    }
});

// Update an entry by ID
app.put('/api/dashboard/:id', async (req, res) => {
    const { id } = req.params;
    const { description, amount, date } = req.body;

    try {
        const updatedEntry = await Dashboard.findByIdAndUpdate(id, { description, amount, date }, { new: true });
        if (!updatedEntry) {
            return res.status(404).json({ error: 'Entry not found' });
        }
        res.status(200).json(updatedEntry);
    } catch (error) {
        res.status(400).json({ error: 'Error updating entry' });
    }
});

// Delete an entry by ID
app.delete('/api/dashboard/:id', async (req, res) => {
    const { id } = req.params;

    try {
        const deletedEntry = await Dashboard.findByIdAndDelete(id);
        if (!deletedEntry) {
            return res.status(404).json({ error: 'Entry not found' });
        }
        res.status(200).json({ message: 'Entry deleted successfully' });
    } catch (error) {
        res.status(400).json({ error: 'Error deleting entry' });
    }
});

// Root Route
app.get('/', (req, res) => {
    res.send('Welcome to the Dashboard API');
});

// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
