(function(){
  var app = angular.module('app', ['ngResource']);

  app.service('DeviceService', ['$resource','constants', function($resource, constants){
    const API_ENDPOINT = constants.NODE_SERVER + '/deviceList';
    return $resource(API_ENDPOINT, {}, {
      get: {method: 'GET', isArray: 'true'}
    });
  }]);

  app.service('DeviceLogService', ['$resource', 'constants', function($resource, constants){
    return $resource(constants.NODE_SERVER + '/deviceLog', {}, {
      get: {method: 'GET', isArray: 'true'}
    });
  }]);

  app.controller('DevicesController', ['$scope', 'DeviceService', 'DeviceLogService', 'constants',
      function($scope, DeviceService, DeviceLogService, constants){
          function loadData(){
            $scope.devices = DeviceService.get();
            $scope.deviceLogs = DeviceLogService.get();
          }

          loadData();
          setInterval(loadData, constants.REFRESH_INTERVAL);

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
