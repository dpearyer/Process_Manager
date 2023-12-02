const express = require('express');
const path = require('path');
const si = require('systeminformation');

const app = express();
const port = 3000;

app.use(express.static(path.join(__dirname, 'public')));

app.get('/getProcesses', async (req, res) => {
  try {
    const processes = await si.processes();
    res.json(processes.list);
  } catch (error) {
    res.status(500).json({ error: 'Error retrieving processes' });
  }
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});