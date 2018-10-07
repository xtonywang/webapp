'use strict';

const express = require('express');
const msCtl = require('./msController');

// Constants
const PORT = 8080;
const HOST = '0.0.0.0';

// App
const app = express();
app.get('/', (req, res) => {
  res.send('Hello world\n');
});

app.get('/ws', (req, res)=>{
  msCtl.createBackend();
  res.send('web service is started...\n');
});

app.listen(PORT, HOST);
console.log(`Running on http://${HOST}:${PORT}`);
