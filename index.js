const express = require('express');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;

// Serve static files from the public directory
app.use(express.static(path.join(__dirname, 'public')));

// Default route to serve the main HTML file
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

const { MongoClient } = require('mongodb');

const uri = process.env.MONGODB_URI; // Get connection string from environment variable
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });

async function connectToDatabase() {
    try {
        await client.connect();
        console.log('Connected to MongoDB');
        const database = client.db('<dbname>'); // Specify your database name
        return database;
    } catch (error) {
        console.error('Error connecting to MongoDB:', error);
    }
}

async function saveTotal(name, date, total) {
    const database = await connectToDatabase();
    const collection = database.collection('totals'); // Specify your collection name

    const record = {
        name: name,
        date: date,
        total: total,
    };

    const result = await collection.insertOne(record);
    console.log(`New record created with the following id: ${result.insertedId}`);
}

// Call the saveTotal function where needed in your application
