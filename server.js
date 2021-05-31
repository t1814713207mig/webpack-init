const express = require('express');

const app = express();

app.get('/api/info', (req, res) => {
  res.json({ name: 'tianmingming', operation: 'share' });
});

app.listen('8082');
