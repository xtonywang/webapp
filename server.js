'use strict';

const express = require('express');
const msCtl = require('./msController');
const k8sClient = require('./k8sClient');
const path = require('path');

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

app.get('/pod/create', (req, res)=>{
  let parentPath = path.dirname(__dirname);
  let podFile = path.resolve(parentPath, 'webservice/webservice-pod-hostpath-vol.yaml');
  k8sClient.createPod(podFile);
  res.send('creating new pod...\n');
});

app.get('/pod/list', (req, res)=>{
  k8sClient.listPods('default');
});

app.listen(PORT, HOST);
console.log(`Running on http://${HOST}:${PORT}`);
