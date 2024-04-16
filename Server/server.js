const http = require('http');
const fs = require('fs');
const path = require('path');

// Create HTTP server
const server = http.createServer((req, res) => {
  // Set MIME type for .js files
  const setMimeType = (req, res, next) => {
    const ext = path.extname(req.url);
    if (ext === '.js') {
      res.setHeader('Content-Type', 'application/javascript');
    }
    next();
  };

  // Serve static files from the 'src' directory
  const serveStaticFile = (req, res, next) => {
    const filePath = path.join(__dirname, 'src', req.url);
    fs.readFile(filePath, (err, data) => {
      if (err) {
        // Pass control to the next middleware if file not found
        next();
      } else {
        res.writeHead(200);
        res.end(data);
      }
    });
  };

  // Use middleware to set MIME type for .js files
  setMimeType(req, res, () => {
    // Serve static files from 'src' directory
    serveStaticFile(req, res, () => {
      // If no file is found, send 404 response
      res.writeHead(404, { 'Content-Type': 'text/plain' });
      res.end('File not found');
    });
  });
});

// Start the server
const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});