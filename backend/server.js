const express = require('express');
const cors = require('cors');
const siteRoutes = require('./routes/siteRoutes');
const simulationRoutes = require('./routes/simulationRoutes');

const app = express();
const PORT = process.env.PORT || 8080;

app.use(cors());
app.use(express.json());

app.use('/api/sites', siteRoutes);
app.use('/api/simulations', simulationRoutes);

app.get('/health', (req, res) => {
  res.json({ status: 'UP', timestamp: new Date().toISOString() });
});

app.listen(PORT, () => {
  console.log(`Node.js + Express backend running on http://localhost:${PORT}`);
});
