var http = require('http');
var adb = require('adbkit');
var client = adb.createClient();
var express = require('express');
var app = express();

const HTTP_PORT = '9900';
var deviceLog = [];

function displayLog(res){
  res.write('Devices log: </br>')
  deviceLog.forEach(function(entry){
    res.write(entry + '</br>');
  })
}

function handleRequest(req, res){
  res.writeHead(200, {
    'Content-Type': 'text/html',
    'Expires': new Date().toUTCString()
  });
  res.write('List of devices:</br>')
  client.listDevices()
        .map(function(device){
          return getDeviceInfo(device);
        })
        .then(function(devicesList){
            devicesList.forEach(function(deviceInfo){
              res.write('Name: ' + deviceInfo['ro.product.model'] + ' | ');
              res.write('Android Version: ' + deviceInfo['ro.build.version.release'] + ' | ');
              res.write('</br>');
            })
        })
        .then(function(){
          res.end();
        });

  client.trackDevices()
        .then(function(tracker){
          tracker.on('add', function(device){
            deviceLog.push('Device added: '+ device.id);
          });

          tracker.on('remove', function(device){
            deviceLog.push('Device removed: '+ device.id);
          })
        });
}

function getDeviceInfo(device){
  return client.getProperties(device.id);
}

app.get('/', handleRequest);

app.listen(HTTP_PORT);
