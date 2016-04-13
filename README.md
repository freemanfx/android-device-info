# android-device-info

Simple Androi ADB device monitoring

Consists of two components
* Server with REST API running in NodeJS
* Angular frontend


Installation
============
Requires: NodeJS > 10.3


#####Server
```bash
    npm install
```

#####Frontend
```bash
    npm install -g grunt
    npm install -g grunt-cli
    bower install
```
edit scripts/config.js with the server url and refresh interval

Running
=================
#####Server
```bash
node deviceInfo.js
```
or
```bash
nodemon deviceInfo.js ( running in daemon mode monitors changes and restarts automatically)
```

#####Frontend
```bash
grunt serve
```
or
deploy it to a static web server such as Apache
