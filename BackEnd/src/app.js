const express = require('express');
const aiRoutes = require('./routes/ai.routes');
const cors = require('cors');


const app = express();

app.use(cors()); // Enable CORS for all routes
app.use(express.json());
app.use('/ai', aiRoutes);
 // Middleware to parse JSON bodies
app.get('/', (req, res) => {
  res.send('Hello, World!');    
});


module.exports = app;