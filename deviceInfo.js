var http = require('http');
var adb = require('adbkit');
var client = adb.createClient();
var express = require('express');
var app = express();
var cors = require('cors');

const HTTP_PORT = '9900';
var deviceLog = [];

client.trackDevices()
        .then(function(tracker){
          tracker.on('add', function(device){
            log('add', device);
          });

          tracker.on('remove', function(device){
            log('remove', device);
          })
        });

function log(eventType, device){
    deviceLog.push({eventType: eventType, device: device});  
}

function getDeviceInfo(device){
  return client.getProperties(device.id);
}

function getDevicesList(req, res){
  client.listDevices()
        .map(function(device){
          return getDeviceInfo(device);
        })
        .then(function(devicesList){
          res.json(devicesList);
          res.end();
        });
}

function getDeviceLog(req, res){
  res.json(deviceLog);
  res.end();
}

app.use(cors());
app.get('/deviceList', getDevicesList);
app.get('/deviceLog', getDeviceLog);

app.listen(HTTP_PORT);
