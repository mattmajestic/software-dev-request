const express = require('express');
const fs = require('fs').promises;
const path = require('path');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 3001;

app.use(cors());

app.use(express.json());

app.post('/save-data', async (req, res) => {
  try {
    const dataFilePath = path.join(__dirname, 'data.json');
    const currentData = await readDataFromFile(dataFilePath);

    const newData = req.body;
    currentData.push(newData);

    await saveDataToFile(dataFilePath, currentData);

    res.status(200).json({ message: 'Data saved successfully' });
  } catch (error) {
    console.error('Error saving data:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

async function readDataFromFile(filePath) {
  try {
    const data = await fs.readFile(filePath, 'utf-8');
    return JSON.parse(data);
  } catch (error) {
    if (error.code === 'ENOENT') {
      return [];
    }
    throw error;
  }
}

async function saveDataToFile(filePath, data) {
  await fs.writeFile(filePath, JSON.stringify(data, null, 2));
}
  

// Route to retrieve data from the JSON file
app.get('/get-data', async (req, res) => {
  try {
    const dataFilePath = path.join(__dirname, 'data.json');
    const data = await fs.readFile(dataFilePath, 'utf-8');
    const jsonData = JSON.parse(data);
    res.json(jsonData);
  } catch (error) {
    console.error('Error reading data:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

async function readData() {
  try {
    const dataFilePath = path.join(__dirname, 'data.json');
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
  const dataFilePath = path.join(__dirname, 'data.json');
  await fs.writeFile(dataFilePath, JSON.stringify(data, null, 2));
}

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
