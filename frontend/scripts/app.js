(function(){
  var app = angular.module('app', ['ngResource']);
  const NODE_SERVER = 'http://localhost:9900';

  app.service('DeviceService', ['$resource', function($resource){
    const API_ENDPOINT = NODE_SERVER + '/deviceList';
    return $resource(API_ENDPOINT, {}, {
      get: {method: 'GET', isArray: 'true'}
    });
  }]);

  app.service('DeviceLogService', ['$resource', function($resource){
    return $resource(NODE_SERVER + '/deviceLog', {}, {
      get: {method: 'GET', isArray: 'true'}
    });
  }]);

  app.controller('DevicesController', ['$scope', 'DeviceService', 'DeviceLogService',
      function($scope, DeviceService, DeviceLogService){
          $scope.devices = DeviceService.get();
          $scope.deviceLogs = DeviceLogService.get();

          $scope.getEvent = function(log){
            switch (log.eventType) {
              case 'add':
                return 'added';
                break;
              case 'remove':
                return 'removed';
                break;
              default:
            }
          }
      }
  ]);

})();
