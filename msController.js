'use strict';

const Docker  = require('dockerode');
const fs      = require('fs');

let socket = process.env.DOCKER_SOCKET || '/var/run/docker.sock';
let stats  = fs.statSync(socket);

if (!stats.isSocket()) {
  throw new Error('Are you sure the docker is running?');
}

let docker = new Docker({socketPath: '/var/run/docker.sock'});

let createBackend = function() {
  docker.createContainer({ Image: 'tonywang/webservice', HostConfig:{
    PortBindings:{
      '8090/tcp':[
        {HostPort: '8090'}
      ]
    }
  } }, function (err, container) {
    container.start(function (err, data) {
      console.log('starting container...');
      /*container.top({ps_args: 'aux'}, function(err, data) {
        console.log(data);
      });*/
    });
  });
};

module.exports = {createBackend};
