var exec = require('child_process').exec;
var http = require('http');
var adb = require('adbkit');
var client = adb.createClient();

const HTTP_PORT = '9000';
var deviceListingCmd = 'adb devices -l';


function handleRequest(req, res){
  // exec(deviceListingCmd, function(error, stdout, stderr){
  //   response.end(stdout);
  // });
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
            res.end();
        });
}

var server = http.createServer(handleRequest);
server.listen(HTTP_PORT);

function getDeviceInfo(device){
  return client.getProperties(device.id);
}
