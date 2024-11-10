const express = require('express');
const path = require('path')
const app = express();

const port = 3000; // Change port number to something above 1024

// Serve static files from the 'public_html' directory
app.use(express.static(path.join(__dirname, 'public_html')));


app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public_html','car-shop-index.html'));
});
app.get('/:file', (req, res) => {
  file = req.params.file

  res.sendFile(path.join(__dirname, 'public_html',file));
});
  
app.listen(port, '0.0.0.0', () => {
  console.log(`Server running at http://0.0.0.0:${port}/`);
});
