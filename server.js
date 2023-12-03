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

app.get('/getSystemInfo', async (req, res) => {
  try {
    const osInfo = await si.osInfo();
    const cpu = await si.cpu();
    const mem = await si.mem();
    const diskLayout = await si.diskLayout();

    const systemInfo = {
      deviceName: osInfo.hostname,
      osType: osInfo.distro,
      cpuType: cpu.manufacturer + ' ' + cpu.brand,
      ram: mem.total,
      rom: diskLayout[0].size,
    };

    res.json(systemInfo);
  } catch (error) {
    res.status(500).json({ error: 'Error retrieving system information' });
  }
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
