const express = require('express');
const cors = require('cors');
const fs = require('fs').promises;

const app = express();
const port = process.env.PORT || 3001;

app.use(express.json());
app.use(cors());

// Store data in-memory for simplicity (replace with a database in production)
let storedData = [];

app.post('/save-data', async (req, res) => {
  const newData = req.body;
  storedData.push(newData);

  // Save data to a JSON file (you can replace this with a database)
  try {
    await fs.writeFile('data.json', JSON.stringify(storedData, null, 2));
    console.log('Data saved successfully');
    res.status(200).json({ message: 'Data saved successfully' });
  } catch (error) {
    console.error('Error saving data:', error);
    res.status(500).json({ error: 'Failed to save data' });
  }
});

app.get('/get-data', async (req, res) => {
  try {
    const data = await fs.readFile('data.json', 'utf-8');
    const parsedData = JSON.parse(data);
    res.status(200).json(parsedData);
  } catch (error) {
    console.error('Error retrieving data:', error);
    res.status(500).json({ error: 'Failed to retrieve data' });
  }
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
