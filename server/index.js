const express = require('express');
const fs = require('fs').promises;
const path = require('path');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 3001;
const dataFilePath = path.join(__dirname, 'data.json');

app.use(cors());

app.use(express.json());

// Route to save data to the JSON file
app.post('/save-data', async (req, res) => {
  try {
    const existingData = await readData();
    const newData = {
      ...existingData,
      data: req.body,
    };

    await saveData(newData);

    res.status(200).json({ message: 'Data saved successfully' });
  } catch (error) {
    console.error('Error saving data:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Route to retrieve data from the JSON file
app.get('/get-data', async (req, res) => {
  try {
    const data = await readData();
    res.status(200).json(data.data || {});
  } catch (error) {
    console.error('Error reading data:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

async function readData() {
  try {
    const data = await fs.readFile(dataFilePath, 'utf-8');
    return JSON.parse(data);
  } catch (error) {
    if (error.code === 'ENOENT') {
      return { data: {} };
    }
    throw error;
  }
}

async function saveData(data) {
  await fs.writeFile(dataFilePath, JSON.stringify(data, null, 2));
}

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
