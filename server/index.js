const express = require('express');
const fs = require('fs').promises;
const path = require('path');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 3001;
const dataFilePath = path.join(__dirname, 'data.json');

app.use(cors());

app.use(express.json());

app.post('/save-data', (req, res) => {
    try {
      const dataFilePath = path.join(__dirname, 'data.json');
      const currentData = JSON.parse(fs.readFileSync(dataFilePath, 'utf-8'));
  
      const newData = req.body;
      currentData.push(newData);
  
      fs.writeFileSync(dataFilePath, JSON.stringify(currentData, null, 2));
      
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
    const data = fs.readFileSync(dataFilePath, 'utf-8');
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
