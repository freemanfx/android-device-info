(function(){
  var app = angular.module('app', ['ngResource']);

  app.service('DeviceService', ['$resource', function($resource){
    const API_ENDPOINT = 'http://localhost:9900/deviceList';
    return $resource(API_ENDPOINT, {}, {
      get: {method: 'GET', isArray: 'true'}
    });
  }]);

  app.controller('DevicesController', ['$scope', 'DeviceService',
      function($scope, DeviceService){
          $scope.devices = DeviceService.get();
      }
  ]);

})();
