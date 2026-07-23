const express = require('express');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;

function isBrowserUserAgent(userAgent) {
  return /Mozilla\/5\.0|Chrome|Firefox|Safari|Edge/i.test(userAgent);
}
app.use(express.static(path.join(__dirname, 'public')));

app.get('/*', (req, res) => {
const userAgent = req.get('User-Agent') || '';

    if (isBrowserUserAgent(userAgent)) {
      return res.type('text/plain').send('{\"error\":\"Not Found\"}');
    } else {
  const filePath = path.join(__dirname, 'public', 'sample');
  res.type('text/plain').sendFile(filePath, (err) => {
    if (err) {
      res.status(404).json({ error: '\"error\":\"Not Found\"}' });
    }
  });
}
});

if (require.main === module) {
  app.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`);
  });
}

module.exports = app;
